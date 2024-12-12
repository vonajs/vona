import { __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  constructor() {
    super(__ThisModule__);
  }

  get modelRoleRight() {
    return this.scope.model.roleRight;
  }

  async run(options) {
    // aRoleRight: add roleAtomId
    await this.bean.model.alterTable('aRoleRight', function (table) {
      table.int0('roleAtomId');
    });
    // adjustRoleRights
    await this._adjustRoleRights(options);
  }

  async _adjustRoleRights(_options) {
    // all instances
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.bean.executor.newCtx(
        async () => {
          await this._adjustRoleRightsInstance();
        },
        {
          subdomain: instance.name,
        },
      );
    }
  }

  async _adjustRoleRightsInstance() {
    // select all role rights
    const roleRights = await this.modelRoleRight.select();
    for (const roleRight of roleRights) {
      const roleId = roleRight.roleId;
      const role = await this.app.bean.role.get({ id: roleId });
      if (role) {
        const roleAtomId = role.atomId;
        await this.modelRoleRight.update({ id: roleRight.id, roleAtomId });
      }
    }
  }
}
