import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // alter table: aCmsArticle
    await this.bean.model.alterTable('aCmsArticle', function (table) {
      table.string('audioFirst', 255);
      table.string('audioCoverFirst', 255);
    });

    // alter view: aCmsArticleView
    await this.bean.model.alterView('aCmsArticleView', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.categoryName', 'e.tags'])
          .leftJoin('aCmsCategory as b', { 'a.categoryId': 'b.id' })
          .leftJoin('aCmsArticleTag as e', { 'a.id': 'e.itemId' }),
      );
    });

    // alter view: aCmsArticleViewFull
    await this.bean.model.alterView('aCmsArticleViewFull', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.categoryName', 'e.tags', 'c.content', 'c.html'])
          .leftJoin('aCmsCategory as b', { 'a.categoryId': 'b.id' })
          .leftJoin('aCmsContent as c', { 'a.id': 'c.itemId' })
          .leftJoin('aCmsArticleTag as e', { 'a.id': 'e.itemId' }),
      );
    });
    // alter view: aCmsArticleViewSearch
    await this.bean.model.alterView('aCmsArticleViewSearch', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.categoryName', 'e.tags', 'c.content', 'c.html', 'c.content as contentSearch'])
          .leftJoin('aCmsCategory as b', { 'a.categoryId': 'b.id' })
          .leftJoin('aCmsContent as c', { 'a.id': 'c.itemId' })
          .leftJoin('aCmsArticleTag as e', { 'a.id': 'e.itemId' }),
      );
    });

    // alter view: aCmsArticleViewTag
    await this.bean.model.alterView('aCmsArticleViewTag', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.categoryName', 'e.tags', 'f.tagId'])
          .leftJoin('aCmsCategory as b', { 'a.categoryId': 'b.id' })
          .leftJoin('aCmsArticleTag as e', { 'a.id': 'e.itemId' })
          .leftJoin('aCmsArticleTagRef as f', { 'a.id': 'f.itemId' }),
      );
    });
  }
}
