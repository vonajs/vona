import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // alter table: aCmsCategory
    await this.bean.model.alterTable('aCmsCategory', function (table) {
      table.string('url', 255);
    });
  }
}
