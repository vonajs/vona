import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // schemas update for 7
    await this._update7Migration_schemas();
  }
  async _update7Migration_schemas() {
    // aCmsArticle
    await this.bean.model.dropView('aCmsArticleView', true);
    await this.bean.model.dropView('aCmsArticleViewFull', true);
    await this.bean.model.dropView('aCmsArticleViewSearch', true);
    await this.bean.model.dropView('aCmsArticleViewTag', true);
    await this.bean.model.alterTable('aCmsArticle', function (table) {
      table.dropColumn('categoryId');
      table.dropColumn('language');
    });

    // aCmsArticleTag
    await this.bean.model.dropTable('aCmsArticleTag');

    // aCmsArticleTagRef
    await this.bean.model.dropTable('aCmsArticleTagRef');

    // aCmsCategory
    await this.bean.model.dropTable('aCmsCategory');

    // aCmsTag
    await this.bean.model.dropTable('aCmsTag');

    // aCmsArticleView
    await this.bean.model.dropView('aCmsArticleView');

    // aCmsArticleViewFull
    await this.bean.model.alterView('aCmsArticleViewFull', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.content', 'b.html'])
          .leftJoin('aCmsContent as b', { 'a.id': 'b.itemId' }),
      );
    });

    // aCmsArticleViewSearch
    await this.bean.model.alterView('aCmsArticleViewSearch', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.content', 'b.html', 'b.content as contentSearch'])
          .leftJoin('aCmsContent as b', { 'a.id': 'b.itemId' }),
      );
    });

    // aCmsArticleViewTag
    await this.bean.model.dropView('aCmsArticleViewTag');
  }
}
