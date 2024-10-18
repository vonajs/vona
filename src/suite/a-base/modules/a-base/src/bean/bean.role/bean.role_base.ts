import { Cast } from 'vona';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';
import { BeanModuleScopeBase } from 'vona';
import initData15 from '../version.manager/init/initData15.js';
import { BeanRole } from '../bean.role.js';

const __atomClassRole = {
  module: __ThisModule__,
  atomClassName: 'role',
};

export class BeanRoleBase extends BeanModuleScopeBase<ScopeModule> {
  get self() {
    return Cast<BeanRole>(this);
  }

  get model() {
    return this.scope.model.role;
  }

  get modelRole() {
    return this.scope.model.role;
  }

  get modelRoleRef() {
    return this.scope.model.roleRef;
  }

  get modelRoleInc() {
    return this.scope.model.roleInc;
  }

  get modelRoleIncRef() {
    return this.scope.model.roleIncRef;
  }

  get modelRoleExpand() {
    return this.scope.model.roleExpand;
  }

  get modelUserRole() {
    return this.scope.model.userRole;
  }

  get modelRoleRight() {
    return this.scope.model.roleRight;
  }

  get modelRoleRightRef() {
    return this.scope.model.roleRightRef;
  }

  get modelAtom() {
    return this.scope.model.atom;
  }

  async get(where) {
    return await this.model.get(where);
  }

  async getSystemRole({ roleName }: any) {
    return await this.get({
      roleName,
      system: 1,
    });
  }

  // add role
  //  { module,roleName,...}
  async add(data, user?, returnKey?) {
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

  async addChild({ roleAtomId, roleId, user }: any) {
    roleId = await this.self._forceRoleId({ roleAtomId, roleId });
    const key = await this.add({ roleIdParent: roleId }, user, true);
    const atom = await this.ctx.bean.atom.read({ key, user });
    return { key, atom };
  }

  async move({ roleAtomId, roleId, roleIdParent }: any) {
    // role
    const role = await this.self._forceRole({ roleAtomId, roleId });
    if (!role) return;
    // roleIdParentOld
    const roleIdParentOld = role.roleIdParent;
    if (roleIdParentOld === roleIdParent) return;
    // update
    await this.model.update({ id: role.id, roleIdParent });

    // adjust catalog
    await this.adjustCatalog(roleIdParentOld);
    await this.adjustCatalog(roleIdParent);

    // set dirty
    await this.self.setDirty(true);
  }

  async delete({ roleAtomId, roleId, force = false }: any) {
    roleAtomId = await this.self._forceRoleAtomId({ roleAtomId, roleId });
    // delete this
    await this.ctx.bean.atom.delete({ key: { atomId: roleAtomId }, options: { force } });
  }

  async clone({ roleAtomId, roleId, user }: any) {
    roleAtomId = await this.self._forceRoleAtomId({ roleAtomId, roleId });
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

  async parseRoleNames({ roleNames, force = false }: any) {
    const arr = roleNames.split(',');
    const res: any[] = [];
    for (const roleName of arr) {
      const role = await this.parseRoleName({ roleName, force });
      res.push(role); // not check if null
    }
    return res;
  }

  // roleA.roleB
  async parseRoleName({ roleName, roleIdParent, force = false }: any) {
    // parse
    const role = await this._parseRoleName_general({ roleName, roleIdParent, force });
    // special check 'authenticated.builtIn'
    if (!role && roleName === 'authenticated.builtIn') {
      await this._initSystemRoles({
        module: __ThisModule__,
        rolesData: initData15.roles,
      });
      return await this._parseRoleName_general({ roleName });
    }
    // ok
    return role;
  }

  async _parseRoleName_general({ roleName, roleIdParent, force = false }: any) {
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

  async item({ roleAtomId, roleId }: any) {
    roleAtomId = await this.self._forceRoleAtomId({ roleAtomId, roleId });
    return await this.ctx.bean.atom.read({ key: { atomId: roleAtomId } });
  }

  // child
  async child({ roleId, roleName }: any) {
    const list = await this.children({ roleId, roleName, page: false });
    return list[0];
  }

  // childrenTop
  async childrenTop({ roleTypes, page, user }: any) {
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

  async _childrenTop_byAuth({ roleTypes, atomClass, user }: any) {
    let roleIds;
    if (user.id === 0) {
      const roleRoot = await this.parseRoleName({ roleName: 'root' });
      roleIds = [roleRoot.id];
    } else {
      let roles;
      if (!roleTypes || roleTypes.length === 0) {
        roles = await this.bean.model.select(
          'aViewUserRightRefAtomClass',
          {
            where: {
              userIdWho: user.id,
              atomClassId: atomClass.id,
              action: 2,
            },
          },
          { disableDeleted: true },
        );
      } else {
        roles = await this.bean.model.select(
          'aViewUserRightRefAtomClass as a',
          {
            columns: ['*'],
            joins: [['innerJoin', 'aRole as b', { 'a.roleIdWhom': 'b.id' }]],
            where: {
              'a.userIdWho': user.id,
              'a.atomClassId': atomClass.id,
              'a.action': 2,
              'b.roleTypeCode': roleTypes,
            },
          },
          { disableDeleted: true },
        );
      }
      roleIds = roles.map(item => item.roleIdWhom);
    }
    return roleIds;
  }

  async _childrenTop_filter({ roleIds }: any) {
    if (roleIds.length <= 1) return roleIds;
    const items = await this.modelRoleRef.select({
      where: {
        roleId: roleIds,
      },
    });
    const res: any[] = [];
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

  async _childrenTop_select({ roleIds, atomClass, page, user }: any) {
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
  async children({ roleTypes, roleId, roleName, page, user }: any) {
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
  async save({ roleId, data: { roleName, leader, sorting, catalog } }: any) {
    const role = await this.get({ id: roleId });
    if (!role) return;
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

  async _register({ roleName, roleIdParent }: any) {
    return await this.ctx.meta.util.lock({
      resource: `${__ThisModule__}.role.register`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanFullName: 'role',
          context: { roleName, roleIdParent },
          fn: '_registerLock',
        });
      },
    });
  }

  async _registerLock({ roleName, roleIdParent }: any) {
    // get again
    const role = await this.child({
      roleId: roleIdParent,
      roleName,
    });
    if (role) return role.id;
    // add
    return await this.add({ roleName, roleIdParent });
  }

  async _initSystemRoles({ module, rolesData }: any) {
    const roleIds: any = {};
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
            roleIdParent = roleParent!.id;
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
