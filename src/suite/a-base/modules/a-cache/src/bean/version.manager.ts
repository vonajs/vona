import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { EntityCache } from '../entity/cache.js';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aCache
      await this.bean.model.createTable('aCache', function (table) {
        table.basicFields();
        table.string('module', 255);
        table.string('name', 255);
        table.json('value');
        table.int0('timeout');
      });
    }

    if (options.version === 2) {
      // delete
      await this.bean.model.builder<EntityCache>('aCache').truncate();
      // alter table: aCache
      await this.bean.model.alterTable('aCache', function (table) {
        table.dropColumn('timeout');
        table.timestamp('expired');
      });
    }
  }

  async init(options) {
    if (options.version === 0) {
      // cache reset
      //   : just clear mem cache
      await this.ctx.cache.mem._clearAll();
    }
  }
}
