import type { IMetaVersionInit, IMetaVersionInitOptions, IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate, IMetaVersionInit {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // homeRole
      const entityRole = this.scope.entity.role;
      await this.bean.model.createTable(entityRole.$table, table => {
        table.basicFields();
        table.string(entityRole.$column('name'), 255);
      });
      // homeUser
      const entityUser = this.scope.entity.user;
      await this.bean.model.createTable(entityUser.$table, table => {
        table.basicFields();
        table.string(entityUser.$column('name'), 255);
        table.string(entityUser.$column('avatar'), 255);
        table.string(entityUser.$column('locale'), 255);
      });
      // homeUserRole
      const entityUserRole = this.scope.entity.userRole;
      await this.bean.model.createTable(entityUserRole.$table, table => {
        table.basicFields();
        table.tableIdentity('userId');
        table.tableIdentity('roleId');
      });
    }
  }

  async init(options: IMetaVersionInitOptions) {
    if (options.version === 1) {
      // role: admin
      const roleAdmin = await this.scope.model.role.insert({
        name: 'admin',
      });
      // user: admin
      const userAdmin = await this.scope.model.user.insert({
        name: 'admin',
        avatar: ':emoji:flower',
        locale: undefined,
      });
      // userRole: admin
      await this.scope.model.userRole.insert({
        userId: userAdmin.id,
        roleId: roleAdmin.id,
      });
    }
  }
}
