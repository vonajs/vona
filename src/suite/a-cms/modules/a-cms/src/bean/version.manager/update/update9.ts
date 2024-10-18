import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // drop view: aCmsArticleViewFull
    await this.bean.model.dropView('aCmsArticleViewFull');
    // drop view: aCmsArticleViewSearch
    await this.bean.model.dropView('aCmsArticleViewSearch');
    // drop column: aCmsContent.itemId
    await this.bean.model.alterTable('aCmsContent', function (table) {
      table.dropColumn('itemId');
    });
  }
}
