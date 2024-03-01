import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aSequence
      await this.bean.model.schema.createTable('aSequence', function (table) {
        table.basicFields();
        table.string('module', 255);
        table.string('name', 255);
        table.json('value');
      });
    }
  }
}
