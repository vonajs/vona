import { __ThisModule__ } from '../../../resource/this.js';
import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  get modelRoleRight() {
    return this.ctx.model.module(__ThisModule__).roleRight;
  }

  async run(options) {
    // aRoleRight: add roleAtomId
    const sql = `
        ALTER TABLE aRoleRight
          Add COLUMN roleAtomId int(11) DEFAULT '0'
                  `;
    await this.ctx.model.query(sql);
    // adjustRoleRights
    await this._adjustRoleRights(options);
  }

  async _adjustRoleRights(_options) {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._adjustRoleRightsInstance();
        },
      });
    }
  }

  async _adjustRoleRightsInstance() {
    // select all role rights
    const roleRights = await this.modelRoleRight.select();
    for (const roleRight of roleRights) {
      const roleId = roleRight.roleId;
      const role = await this.ctx.bean.role.get({ id: roleId });
      const roleAtomId = role.atomId;
      await this.modelRoleRight.update({ id: roleRight.id, roleAtomId });
    }
  }
}
