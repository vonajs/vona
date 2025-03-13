import type { IMetaVersionInit, IMetaVersionInitOptions, IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate, IMetaVersionInit {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // aAuthSimple
      const entity = this.scope.entity.authSimple;
      await this.bean.model.createTable(entity.table, table => {
        table.basicFields();
        table.userId();
        table.text(entity.column('hash'));
      });
    }
  }

  async init(options: IMetaVersionInitOptions) {
    if (options.version === 1) {
      // admin
      const userAdmin = await this.bean.userInner.getByName('admin');
      if (userAdmin) {
        const password = options.password || this.scope.config.passwordDefault.admin;
        await this.bean.authSimple.add(userAdmin.id, password);
      }
    }
  }
}
