import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aSettings
      await this.bean.model.createTable('aSettings', function (table) {
        table.basicFields();
        table.string('module', 255);
        table.int0('scene');
        table.userId();
        table.json('value');
      });

      // create table: aSettingsRef
      await this.bean.model.createTable('aSettingsRef', function (table) {
        table.basicFields();
        table.string('module', 255);
        table.int0('scene');
        table.userId();
        table.string('name', 255);
        table.json('value');
      });
    }
  }

  async init(options) {
    if (options.version === 1) {
      // empty
    }
  }
}
