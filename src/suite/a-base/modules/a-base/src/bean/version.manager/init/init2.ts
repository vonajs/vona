import { __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase } from 'vona';

import initData from './initData2.js';

export class VersionInit extends BeanBase {
  async run(options) {
    // roles
    const roleIds = await this._initRoles();
    // role includes
    await this._roleIncludes(roleIds);
    // build
    await this.app.bean.role.setDirty(true);
    // users
    await this._initUsers(roleIds, options);
  }

  // roles
  async _initRoles() {
    return await this.app.bean.role._initSystemRoles({
      module: __ThisModule__,
      rolesData: initData.roles,
    });
  }

  // role includes
  async _roleIncludes(roleIds) {
    for (const item of initData.includes) {
      await this.app.bean.role.addRoleInc({ roleId: roleIds[item.from], roleIdInc: roleIds[item.to] });
    }
  }

  // users
  async _initUsers(roleIds, options) {
    // users
    const users: any[] = [];
    // user: root
    const userRoot = this.app.bean.util.extend({}, initData.users.root);
    userRoot.item.email = options.email;
    userRoot.item.mobile = options.mobile;
    users.push(userRoot);
    // user: admin
    const demo = this.$scope.base.config.configFront.demo;
    if (demo.enable) {
      const userAdmin = this.app.bean.util.extend({}, initData.users.admin);
      users.push(userAdmin);
    }
    for (const user of users) {
      const userId = await this.app.bean.user.add(user.item);
      // activated
      await this.app.bean.user.save({
        user: { id: userId, activated: 1 },
      });
      // user->role
      await this.app.bean.role.addUserRole({
        userId,
        roleId: roleIds[user.roleId],
      });
    }
  }
}
