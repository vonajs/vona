import { ScopeModule, __ThisModule__ } from '../../../resource/this.js';
import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase<ScopeModule> {
  constructor() {
    super(__ThisModule__);
  }

  get modelRoleExpand() {
    return this.scope.model.roleExpand;
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
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._adjustRoleExpandsInstance();
        },
      });
    }
  }

  async _adjustRoleExpandsInstance() {
    // select all role rights
    const roleExpands = await this.modelRoleExpand.select();
    for (const roleExpand of roleExpands) {
      const roleId = roleExpand.roleId;
      const role = await this.ctx.bean.role.get({ id: roleId });
      if (role) {
        const roleAtomId = role.atomId;
        await this.modelRoleExpand.update({ id: roleExpand.id, roleAtomId });
      }
    }
  }
}
