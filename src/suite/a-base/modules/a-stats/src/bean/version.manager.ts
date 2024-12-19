import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aStats
      await this.bean.model.createTable('aStats', function (table) {
        table.basicFields();
        table.userId();
        table.string('module', 255);
        table.string('name', 255);
        table.json('value');
      });
    }
  }
}
