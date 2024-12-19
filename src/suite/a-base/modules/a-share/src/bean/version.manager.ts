import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aShare
      await this.bean.model.createTable('aShare', function (table) {
        table.basicFields();
        table.string('uuid', 50);
        table.atomId();
        table.userId();
        table.string('host', 255);
        table.string('url', 255);
      });

      // create table: aShareRecordPV
      await this.bean.model.createTable('aShareRecordPV', function (table) {
        table.basicFields();
        table.int0('shareId');
        table.userId();
      });

      // create table: aShareRecordUV
      await this.bean.model.createTable('aShareRecordUV', function (table) {
        table.basicFields();
        table.atomId();
        table.int0('userIdSource');
        table.int0('userIdTarget');
      });
    }
  }

  async init() {}

  async test() {}
}
