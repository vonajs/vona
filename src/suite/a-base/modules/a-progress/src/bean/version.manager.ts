import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // aProgress
      await this.bean.model.createTable('aProgress', function (table) {
        table.basicFields();
        table.string('progressId', 50);
        table.int0('counter');
        table.int0('done');
        table.int0('abort');
        table.text('data');
      });
    }

    if (options.version === 2) {
      // aProgress: add field userId
      await this.bean.model.alterTable('aProgress', function (table) {
        table.userId();
      });
    }

    if (options.version === 3) {
      // drop table: aProgress
      await this.bean.model.dropTable('aProgress');
    }
  }

  async init() {}

  async test() {}
}
