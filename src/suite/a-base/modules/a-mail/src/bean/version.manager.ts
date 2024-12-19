import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aMail
      await this.bean.model.createTable('aMail', function (table) {
        table.basicFields();
        table.string('scene', 50);
        table.int0('status');
        table.text('mailTo');
        table.text('mailSubject');
        table.text('message', 'longtext');
      });
    }
  }

  async init(options) {
    if (options.version === 1) {
      // empty
    }
  }

  async test() {}
}
