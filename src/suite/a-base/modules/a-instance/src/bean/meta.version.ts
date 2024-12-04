import { BeanBase, IMetaVersionUpdate, IMetaVersionUpdateOptions, Meta } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Meta()
export class MetaVersion extends BeanBase<ScopeModule> implements IMetaVersionUpdate {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // create table: aInstance
      const tableName = this.scope.entity.instance.getTable();
      await this.bean.model.createTable(tableName, function (table) {
        table.basicFields({ iid: false });
        table.boolean('disabled');
        table.string('name', 255);
        table.string('title', 255);
        table.text('config');
      });
    }
  }
}
