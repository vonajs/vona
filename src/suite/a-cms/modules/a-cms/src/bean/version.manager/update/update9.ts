import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // drop column: aCmsContent.itemId
    await this.bean.model.alterTable('aCmsContent', function (table) {
      table.dropColumn('itemId');
    });
    // drop view: aCmsArticleViewFull
    await this.bean.model.dropView('aCmsArticleViewFull');
    // drop view: aCmsArticleViewSearch
    await this.bean.model.dropView('aCmsArticleViewSearch');
  }
}
