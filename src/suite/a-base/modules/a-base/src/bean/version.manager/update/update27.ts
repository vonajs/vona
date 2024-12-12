import { __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  get modelRoleExpand() {
    return this.$scope.base.model.roleExpand;
  }

  async run(options) {
    // aRoleExpand: add roleAtomId
    await this.bean.model.alterTable('aRoleExpand', function (table) {
      table.int0('roleAtomId');
    });
    // adjustRoleExpands
    await this._adjustRoleExpands(options);
  }

  async _adjustRoleExpands(_options) {
    // all instances
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.bean.executor.newCtx(
        async () => {
          await this._adjustRoleExpandsInstance();
        },
        {
          subdomain: instance.name,
        },
      );
    }
  }

  async _adjustRoleExpandsInstance() {
    // select all role rights
    const roleExpands = await this.modelRoleExpand.select();
    for (const roleExpand of roleExpands) {
      const roleId = roleExpand.roleId;
      const role = await this.app.bean.role.get({ id: roleId });
      if (role) {
        const roleAtomId = role.atomId;
        await this.modelRoleExpand.update({ id: roleExpand.id, roleAtomId });
      }
    }
  }
}
