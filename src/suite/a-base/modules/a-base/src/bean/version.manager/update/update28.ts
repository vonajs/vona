import { ScopeModule, __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase<ScopeModule> {
  constructor() {
    super(__ThisModule__);
  }

  get modelResourceRole() {
    return this.scope.model.resourceRole;
  }

  async run(options) {
    // aResourceRole: add roleAtomId
    await this.bean.model.alterTable('aResourceRole', function (table) {
      table.int0('roleAtomId');
    });
    // adjustRoleRights
    await this._adjustResourceRoles(options);
  }

  async _adjustResourceRoles(_options) {
    // all instances
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async () => {
          await this._adjustResourceRolesInstance();
        },
      });
    }
  }

  async _adjustResourceRolesInstance() {
    // select all resource roles
    const resourceRoles = await this.modelResourceRole.select();
    for (const resourceRole of resourceRoles) {
      const roleId = resourceRole.roleId;
      const role = await this.app.bean.role.get({ id: roleId });
      if (role) {
        const roleAtomId = role.atomId;
        await this.modelResourceRole.update({ id: resourceRole.id, roleAtomId });
      }
    }
  }
}
