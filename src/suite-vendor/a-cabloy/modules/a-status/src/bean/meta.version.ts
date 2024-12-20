import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // create table: aStatus
      const entity = this.scope.entity.status;
      await this.bean.model.createTable(entity.table, function (table) {
        table.basicFields();
        table.string(entity.column('module'), 255);
        table.string(entity.column('name'), 255);
        table.text(entity.column('value'));
      });
    }
  }
}
