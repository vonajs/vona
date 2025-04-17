import type { IMetaVersionInit, IMetaVersionInitOptions, IMetaVersionUpdate, IMetaVersionUpdateOptions } from 'vona-module-a-version';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate, IMetaVersionInit {
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

  async init(options: IMetaVersionInitOptions) {
    if (options.version === 1) {
      // admin
      await this.scope.model.user.insert({
        name: 'admin',
        avatar: ':emoji:flower',
        locale: undefined,
      });
    }
  }
}
