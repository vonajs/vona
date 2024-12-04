import { BeanBase, IMetaVersionUpdate, IMetaVersionUpdateOptions, Meta } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Meta()
export class MetaVersion extends BeanBase<ScopeModule> implements IMetaVersionUpdate {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // create table: aInstance
      const entity = this.scope.entity.instance;
      await this.bean.model.createTable(entity.table, function (table) {
        table.basicFields({ iid: false });
        table.boolean(entity.column('disabled'));
        table.string(entity.column('name'), 255);
        table.string(entity.column('title'), 255);
        table.text(entity.column('config'));
      });
    }
  }
}
