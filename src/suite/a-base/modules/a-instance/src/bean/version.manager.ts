import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase<ScopeModule> {
  async update(options) {
    if (options.version === 1) {
      // create table: aInstance
      const tableName = this.scope.model.instance.table;
      await this.bean.model.createTable(tableName, function (table) {
        table.basicFields({ iid: false });
        table.boolean('disabled');
        table.string('name', 255);
        table.string('title', 255);
        table.text('config');
      });
    }
  }

  async init(_options) {}
}
