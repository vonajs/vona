import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // create table: aCmsTag
    await this.bean.model.createTable('aCmsTag', function (table) {
      table.basicFields();
      table.string('language', 50);
      table.string('tagName', 50);
      table.int0('articleCount');
    });

    // create table: aCmsArticleTag
    await this.bean.model.createTable('aCmsArticleTag', function (table) {
      table.basicFields();
      table.atomId();
      table.itemId();
      table.json('tags');
    });

    // create table: aCmsArticleTagRef
    await this.bean.model.createTable('aCmsArticleTagRef', function (table) {
      table.basicFields();
      table.atomId();
      table.itemId();
      table.int0('tagId');
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

    // create view: aCmsArticleViewSearch
    await this.bean.model.createView('aCmsArticleViewSearch', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.categoryName', 'e.tags', 'c.content', 'c.html', 'c.content as contentSearch'])
          .leftJoin('aCmsCategory as b', { 'a.categoryId': 'b.id' })
          .leftJoin('aCmsContent as c', { 'a.id': 'c.itemId' })
          .leftJoin('aCmsArticleTag as e', { 'a.id': 'e.itemId' }),
      );
    });

    // create view: aCmsArticleViewTag
    await this.bean.model.createView('aCmsArticleViewTag', view => {
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
