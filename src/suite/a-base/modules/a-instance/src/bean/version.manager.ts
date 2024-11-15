import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aInstance
      await this.bean.model.createTable('aInstance', function (table) {
        table.basicFields({ iid: false });
        table.int0('disabled');
        table.string('name', 255);
        table.string('title', 255);
        table.text('config');
      });
    }
  }

  async init(_options) {}
}
