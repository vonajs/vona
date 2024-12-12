import { __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase } from 'vona';

const __atomClassRole = {
  module: __ThisModule__,
  atomClassName: 'role',
};
const __atomClassUser = {
  module: __ThisModule__,
  atomClassName: 'user',
};

export class VersionUpdate extends BeanBase {
  constructor() {
    super(__ThisModule__);
  }

  get modelRole() {
    return this.scope.model.role;
  }
  get modelUser() {
    return this.scope.model.user;
  }

  async run(options) {
    // adjustRoles
    await this._adjustRoles(options);
    // adjustUsers
    await this._adjustUsers(options);
  }

  async _adjustRoles(_options) {
    // all instances
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.bean.executor.newCtx(
        async () => {
          await this._adjustRolesInstance();
        },
        {
          subdomain: instance.name,
        },
      );
    }
  }

  async _adjustUsers(_options) {
    // all instances
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.bean.executor.newCtx(
        async () => {
          await this._adjustUsersInstance();
        },
        {
          subdomain: instance.name,
        },
      );
    }
  }

  async _adjustRolesInstance() {
    // select all roles where atomId=0
    const roles = await this.modelRole.select({ where: { atomId: 0 } });
    for (const role of roles) {
      const roleId = role.id;
      const roleName = role.roleName;
      // add atom
      const atomKey = await this.app.bean.atom.create({
        atomClass: __atomClassRole,
        item: {
          itemId: roleId,
          atomStaticKey: `${__ThisModule__}:role_${roleName}`,
          catalog: role.catalog,
          system: role.system,
          roleIdParent: role.roleIdParent,
        },
        user: { id: 0 },
      });
      await this.app.bean.atom.write({
        key: atomKey,
        item: {
          atomName: roleName,
        },
        user: { id: 0 },
      });
      // submit
      await this.app.bean.atom.submit({
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
      const atomKey = await this.app.bean.atom.create({
        atomClass: __atomClassUser,
        item: {
          itemId: userId,
          disabled: item.disabled,
          anonymous: item.anonymous,
        },
        user: { id: 0 },
      });
      await this.app.bean.atom.write({
        key: atomKey,
        item: {
          atomName: userName,
        },
        user: { id: 0 },
      });
      // submit
      await this.app.bean.atom.submit({
        key: atomKey,
        options: { ignoreFlow: true },
        user: { id: 0 },
      });
    }
  }
}
