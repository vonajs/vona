import { ScopeModule, __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
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
      await this.bean.executor.newCtx(
        async () => {
          await this._adjustResourceRolesInstance();
        },
        {
          subdomain: instance.name,
        },
      );
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
