import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // alter table: aCmsArticle
    await this.bean.model.alterTable(
      'aCmsArticle',
      function (table) {
        table.timestamp('renderAt');
      },
      true,
    );
  }
}
