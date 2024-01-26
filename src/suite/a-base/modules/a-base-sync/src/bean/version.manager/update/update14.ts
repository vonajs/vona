import { BeanBase } from '@cabloy/core';

const __atomClassRole = {
  module: ,
  atomClassName: 'role',
};
const __atomClassUser = {
  module: ,
  atomClassName: 'user',
};

export class VersionUpdate extends BeanBase {
  get modelRole() {
    return this.ctx.model.module().role;
  }
  get modelUser() {
    return this.ctx.model.module().user;
  }

  async run() {
    // adjustRoles
    await this._adjustRoles();
    // adjustUsers
    await this._adjustUsers();
  }

  async _adjustRoles() {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._adjustRolesInstance();
        },
      });
    }
  }

  async _adjustUsers() {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._adjustUsersInstance();
        },
      });
    }
  }

  async _adjustRolesInstance() {
    // select all roles where atomId=0
    const roles = await this.modelRole.select({ where: { atomId: 0 } });
    for (const role of roles) {
      const roleId = role.id;
      const roleName = role.roleName;
      // add atom
      const atomKey = await this.ctx.bean.atom.create({
        atomClass: __atomClassRole,
        item: {
          itemId: roleId,
          atomStaticKey: `${}:role_${roleName}`,
          catalog: role.catalog,
          system: role.system,
          roleIdParent: role.roleIdParent,
        },
        user: { id: 0 },
      });
      await this.ctx.bean.atom.write({
        key: atomKey,
        item: {
          atomName: roleName,
        },
        user: { id: 0 },
      });
      // submit
      await this.ctx.bean.atom.submit({
        key: atomKey,
        options: { ignoreFlow: true },
        user: { id: 0 },
      });
    }
  }

  async _adjustUsersInstance() {
    // select all roles where atomId=0
    const items = await this.modelUser.select({ where: { atomId: 0 } });
    for (const item of items) {
      const userId = item.id;
      let userName = item.userName;
      if (!userName && item.anonymous) {
        userName = 'anonymous';
      }
      // maybe also empty
      if (!userName) {
        userName = '__Unknown User__';
      }
      // add atom
      const atomKey = await this.ctx.bean.atom.create({
        atomClass: __atomClassUser,
        item: {
          itemId: userId,
          disabled: item.disabled,
          anonymous: item.anonymous,
        },
        user: { id: 0 },
      });
      await this.ctx.bean.atom.write({
        key: atomKey,
        item: {
          atomName: userName,
        },
        user: { id: 0 },
      });
      // submit
      await this.ctx.bean.atom.submit({
        key: atomKey,
        options: { ignoreFlow: true },
        user: { id: 0 },
      });
    }
  }
}
