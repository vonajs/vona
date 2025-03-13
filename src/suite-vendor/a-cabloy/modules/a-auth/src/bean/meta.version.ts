import type { IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // aAuth
      const entity = this.scope.entity.auth;
      await this.bean.model.createTable(entity.table, table => {
        table.basicFields();
        table.userId();
      });
    }
  }
}
