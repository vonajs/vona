import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aInstance
      await this.bean.model.schema.createTable('aInstance', function (table) {
        table.basicFields({ iid: false });
        table.int0('disabled');
        table.string('name', 255);
      });
    }
    if (options.version === 2) {
      await this.bean.model.alterTable('aInstance', function (table) {
        table.string('title', 255);
      });
    }
    if (options.version === 3) {
      await this.bean.model.alterTable('aInstance', function (table) {
        table.json('meta');
      });
    }
    if (options.version === 4) {
      await this.bean.model.alterTable('aInstance', function (table) {
        table.renameColumn('meta', 'config');
      });
    }
  }

  async init(_options) {}
}
