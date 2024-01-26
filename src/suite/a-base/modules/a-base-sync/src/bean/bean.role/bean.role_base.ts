import { BeanModuleScopeBase } from '@cabloy/core';

import initData15 from '../version.manager/init/initData15.js';

const __atomClassRole = {
  module: moduleInfo.relativeName,
  atomClassName: 'role',
};

export class BeanRoleBase extends BeanModuleScopeBase {
  get model() {
    return this.ctx.model.module(moduleInfo.relativeName).role;
  }

  get modelRoleInc() {
    return this.ctx.model.module(moduleInfo.relativeName).roleInc;
  }

  get modelUserRole() {
    return this.ctx.model.module(moduleInfo.relativeName).userRole;
  }

  get modelRoleRight() {
    return this.ctx.model.module(moduleInfo.relativeName).roleRight;
  }

  get modelRoleRightRef() {
    return this.ctx.model.module(moduleInfo.relativeName).roleRightRef;
  }

  get modelAtom() {
    return this.ctx.model.module(moduleInfo.relativeName).atom;
  }

  async get(where) {
    return await this.model.get(where);
  }

  async getSystemRole({ roleName }) {
    return await this.get({
      roleName,
      system: 1,
    });
  }

  // add role
  //  { module,roleName,...}
  async add(data, user, returnKey) {
    if (!user) {
      user = { id: 0 };
    }
    // write
    const item = { ...data, catalog: 0 };
    if (data.roleName) {
      item.atomName = data.roleName;
    }
    if (data.module && data.roleName) {
      item.atomStaticKey = `${data.module}:role_${data.roleName}`;
    }
    const roleKey = await this.ctx.bean.atom.write({
      key: null,
      atomClass: __atomClassRole,
      item,
      user,
    });
    // // submit
    // await this.ctx.bean.atom.submit({
    //   key: roleKey,
    //   options: { ignoreFlow: true },
    //   user,
    // });
    // ok
    return returnKey ? roleKey : roleKey.itemId;
  }

  async addChild({ roleAtomId, roleId, user }) {
    roleId = await this._forceRoleId({ roleAtomId, roleId });
    const key = await this.add({ roleIdParent: roleId }, user, true);
    const atom = await this.ctx.bean.atom.read({ key, user });
    return { key, atom };
  }

  async move({ roleAtomId, roleId, roleIdParent }) {
    // role
    const role = await this._forceRole({ roleAtomId, roleId });
    // roleIdParentOld
    const roleIdParentOld = role.roleIdParent;
    if (roleIdParentOld === roleIdParent) return;
    // update
    await this.model.update({ id: role.id, roleIdParent });

    // adjust catalog
    await this.adjustCatalog(roleIdParentOld);
    await this.adjustCatalog(roleIdParent);

    // set dirty
    await this.setDirty(true);
  }

  async delete({ roleAtomId, roleId, force = false }) {
    roleAtomId = await this._forceRoleAtomId({ roleAtomId, roleId });
    // delete this
    await this.ctx.bean.atom.delete({ key: { atomId: roleAtomId }, options: { force } });
  }

  async clone({ roleAtomId, roleId, user }) {
    roleAtomId = await this._forceRoleAtomId({ roleAtomId, roleId });
    // clone
    return await this.ctx.bean.atom.clone({ key: { atomId: roleAtomId }, user });
  }

  // for donothing on roleId === 0
  async adjustCatalog(roleId) {
    if (roleId === 0) return;
    const children = await this.children({ roleId, page: false });
    await this.model.update({
      id: roleId,
      catalog: children.length === 0 ? 0 : 1,
    });
  }

  async parseRoleNames({ roleNames, force = false }) {
    const arr = roleNames.split(',');
    const res = [];
    for (const roleName of arr) {
      const role = await this.parseRoleName({ roleName, force });
      res.push(role); // not check if null
    }
    return res;
  }

  // roleA.roleB
  async parseRoleName({ roleName, roleIdParent, force = false }) {
    // parse
    const role = await this._parseRoleName_general({ roleName, roleIdParent, force });
    // special check 'authenticated.builtIn'
    if (!role && roleName === 'authenticated.builtIn') {
      await this._initSystemRoles({
        module: moduleInfo.relativeName,
        rolesData: initData15.roles,
      });
      return await this._parseRoleName_general({ roleName });
    }
    // ok
    return role;
  }

  async _parseRoleName_general({ roleName, roleIdParent, force = false }) {
    if (!roleName) throw new Error('roleName should not be empty');
    const roleNames = roleName.split('.');
    let role;
    for (const _roleName of roleNames) {
      if (roleIdParent === undefined) {
        role = await this.get({ roleName: _roleName });
      } else {
        role = await this.child({
          roleId: roleIdParent,
          roleName: _roleName,
        });
      }
      // next
      if (role) {
        roleIdParent = role.id;
        continue;
      }
      // null
      if (!roleIdParent || !force) return null;
      // create
      const roleId = await this._register({
        roleName: _roleName,
        roleIdParent,
      });
      role = await this.get({ id: roleId });
      // next
      roleIdParent = roleId;
    }
    // ok
    return role;
  }

  async item({ roleAtomId, roleId }) {
    roleAtomId = await this._forceRoleAtomId({ roleAtomId, roleId });
    return await this.ctx.bean.atom.read({ key: { atomId: roleAtomId } });
  }

  // child
  async child({ roleId, roleName }) {
    const list = await this.children({ roleId, roleName, page: false });
    return list[0];
  }

  // childrenTop
  async childrenTop({ roleTypes, page, user }) {
    if (!user) user = { id: 0 };
    // page
    page = this.ctx.bean.util.page(page, false);
    // atomClass
    const atomClass = await this.ctx.bean.atomClass.get(__atomClassRole);
    // roles by auth
    let roleIds = await this._childrenTop_byAuth({ roleTypes, atomClass, user });
    if (roleIds.length === 0) return [];
    // filter
    roleIds = await this._childrenTop_filter({ roleIds });
    if (roleIds.length === 0) return [];
    // select
    const list = await this._childrenTop_select({ roleIds, atomClass, page, user });
    return list;
  }

  async _childrenTop_byAuth({ roleTypes, atomClass, user }) {
    let roleIds;
    if (user.id === 0) {
      const roleRoot = await this.parseRoleName({ roleName: 'root' });
      roleIds = [roleRoot.id];
    } else {
      let sql;
      if (!roleTypes || roleTypes.length === 0) {
        sql = `
            select * from aViewUserRightRefAtomClass a
              where a.iid=? and a.userIdWho=? and a.atomClassId=? and a.action=2
          `;
      } else {
        sql = `
            select * from aViewUserRightRefAtomClass a
              inner join aRole b on a.roleIdWhom=b.id
              where a.iid=? and a.userIdWho=? and a.atomClassId=? and a.action=2
                    and b.roleTypeCode in (${roleTypes.join(',')})
          `;
      }
      const roles = await this.ctx.model.query(sql, [this.ctx.instance.id, user.id, atomClass.id]);
      roleIds = roles.map(item => item.roleIdWhom);
    }
    return roleIds;
  }

  async _childrenTop_filter({ roleIds }) {
    if (roleIds.length <= 1) return roleIds;
    const items = await this.ctx.model.query(
      `
          select * from aRoleRef a 
            where a.iid=? and a.roleId in (${roleIds.join(',')})
        `,
      [this.ctx.instance.id],
    );
    const res = [];
    for (const roleId of roleIds) {
      const exists = items.some(item => {
        return item.roleId === roleId && item.level > 0 && roleIds.includes(item.roleIdParent);
      });
      if (!exists) {
        res.push(roleId);
      }
    }
    return res;
  }

  async _childrenTop_select({ roleIds, atomClass, page, user }) {
    // select
    return await this.ctx.bean.atom.select({
      atomClass,
      options: {
        orders: [['a.id', 'asc']],
        page,
        stage: 'formal',
        where: {
          'f.id': {
            op: 'in',
            val: roleIds,
          },
        },
      },
      user,
      pageForce: false,
    });
  }

  // children
  async children({ roleTypes, roleId, roleName, page, user }) {
    if (!user) user = { id: 0 };
    // page
    page = this.ctx.bean.util.page(page, false);
    // roleId
    if (!roleId || roleId === 'root') {
      roleId = 0;
    }
    // where
    const where = { 'f.roleIdParent': roleId };
    if (roleName !== undefined) {
      where['f.roleName'] = roleName;
    }
    if (roleTypes && roleTypes.length > 0) {
      where['f.roleTypeCode'] = {
        op: 'in',
        val: roleTypes,
      };
    }
    // select
    const list = await this.ctx.bean.atom.select({
      atomClass: __atomClassRole,
      options: {
        orders: [
          ['f.sorting', 'asc'],
          ['f.roleName', 'asc'],
        ],
        page,
        stage: 'formal',
        where,
      },
      user,
      pageForce: false,
    });
    return list;
  }

  // save
  async save({ roleId, data: { roleName, leader, sorting, catalog } }) {
    const role = await this.get({ id: roleId });
    if (roleName !== undefined) role.roleName = roleName;
    if (leader !== undefined) role.leader = leader;
    if (sorting !== undefined) role.sorting = sorting;
    if (catalog !== undefined) role.catalog = catalog;
    await this.model.update(role);
    // atomName
    if (roleName !== undefined && role.roleName !== roleName) {
      await this.modelAtom.update({ id: role.atomId, atomName: roleName });
    }
  }

  async _register({ roleName, roleIdParent }) {
    return await this.ctx.meta.util.lock({
      resource: `${moduleInfo.relativeName}.role.register`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanModule: moduleInfo.relativeName,
          beanFullName: 'role',
          context: { roleName, roleIdParent },
          fn: '_registerLock',
        });
      },
    });
  }

  async _registerLock({ roleName, roleIdParent }) {
    // get again
    const role = await this.child({
      roleId: roleIdParent,
      roleName,
    });
    if (role) return role.id;
    // add
    return await this.add({ roleName, roleIdParent });
  }

  async _initSystemRoles({ module, rolesData }) {
    const roleIds = {};
    // system roles
    for (const roleName in rolesData) {
      let role = rolesData[roleName];
      const exists = await this.getSystemRole({ roleName });
      if (!exists) {
        // parent
        let roleIdParent;
        if (role.roleIdParent === '__system__') {
          roleIdParent = 0;
        } else {
          roleIdParent = roleIds[role.roleIdParent];
          if (!roleIdParent) {
            // parent
            const roleParent = await this.getSystemRole({ roleName: role.roleIdParent });
            roleIdParent = roleParent.id;
          }
        }
        // add
        role = this.ctx.bean.util.extend({ module }, role, { roleIdParent });
        roleIds[roleName] = await this.add(role);
      }
    }
    return roleIds;
  }
}
