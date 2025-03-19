import type { IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate {
  async update(_options: IMetaVersionUpdateOptions) {
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
