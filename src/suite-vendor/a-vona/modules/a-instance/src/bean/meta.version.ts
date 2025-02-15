import type { IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // create table: aInstance
      const entity = this.scope.entity.instance;
      await this.bean.model.createTable(entity.table, table => {
        table.basicFields({ iid: false });
        table.boolean(entity.column('disabled'));
        table.string(entity.column('name'), 255);
        table.string(entity.column('title'), 255);
        table.text(entity.column('config'));
      });
    }
  }
}
