import type { IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate {
  async update(options: IMetaVersionUpdateOptions) {
    if (options.version === 1) {
      // homeUser
      const entityUser = this.scope.entity.user;
      await this.bean.model.createTable(entityUser.$table, table => {
        table.basicFields();
        table.string(entityUser.$column('name'), 255);
        table.string(entityUser.$column('avatar'), 255);
        table.string(entityUser.$column('locale'), 255);
      });
    }
  }
}
