import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // create table: aCmsArticle
    await this.bean.model.createTable('aCmsArticle', function (table) {
      table.basicFields();
      table.atomId();
      table.int0('categoryId');
      table.string('language', 50);
      table.int0('sticky');
      table.string('keywords', 255);
      table.text('description');
      table.text('summary');
      table.string('url', 255);
      table.int0('editMode');
      table.string('slug', 255);
      table.int0('sorting');
      table.string('flag', 255);
      table.json('extra');
      table.string('imageFirst', 255);
    });

    // create table: aCmsContent
    await this.bean.model.createTable('aCmsContent', function (table) {
      table.basicFields();
      table.atomId();
      table.itemId();
      table.text('content', 'longtext');
      table.text('html', 'longtext');
    });

    // create table: aCmsCategory
    await this.bean.model.createTable('aCmsCategory', function (table) {
      table.basicFields();
      table.string('categoryName', 50);
      table.string('language', 50);
      table.int0('catalog');
      table.int0('hidden');
      table.int0('sorting');
      table.string('flag', 255);
      table.int0('categoryIdParent');
    });

    // create view: aCmsArticleView
    await this.bean.model.createView('aCmsArticleView', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.categoryName'])
          .leftJoin('aCmsCategory as b', { 'a.categoryId': 'b.id' }),
      );
    });

    // create view: aCmsArticleViewFull
    await this.bean.model.createView('aCmsArticleViewFull', view => {
      view.as(
        this.bean.model
          .builder('aCmsArticle as a')
          .select(['a.*', 'b.categoryName', 'c.content', 'c.html', 'c.content as contentSearch'])
          .leftJoin('aCmsCategory as b', { 'a.categoryId': 'b.id' })
          .leftJoin('aCmsContent as c', { 'a.id': 'c.itemId' }),
      );
    });
  }
}
