import type { IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // aAuth
      const entityAuth = this.scope.entity.auth;
      await this.bean.model.createTable(entityAuth.table, table => {
        table.basicFields();
        table.userId();
        table.integer(entityAuth.column('authProviderId'));
        table.string(entityAuth.column('profileId'), 255);
        table.text(entityAuth.column('profile'));
      });
      // aAuthProvider
      const entityAuthProvider = this.scope.entity.authProvider;
      await this.bean.model.createTable(entityAuthProvider.table, table => {
        table.basicFieldsSimple();
        table.boolean(entityAuthProvider.column('disabled')).defaultTo(false);
        table.string(entityAuthProvider.column('module'), 255);
        table.string(entityAuthProvider.column('providerName'), 255);
        table.string(entityAuthProvider.column('clientName'), 255);
        table.json(entityAuthProvider.column('clientOptions'));
      });
    }
  }
}
