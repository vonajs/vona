import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // alter table: aCmsArticle
    await this.bean.model.alterTable('aCmsArticle', function (table) {
      table.string('uuid', 50);
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

    // uuid
    await this._update6Uuids();
  }

  async _update6Uuids() {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._update6UuidsInstance();
        },
      });
    }
  }

  async _update6UuidsInstance() {
    const articles = await this.ctx.model.article.select();
    for (const article of articles) {
      const uuid = this._parseUuid(article);
      await this.ctx.model.article.update({
        id: article.id,
        uuid,
      });
    }
  }

  _parseUuid(article) {
    if (!article.url) return this._uuid();
    const matches = article.url.match(/articles\/(.*)\.html/);
    if (!matches) return this._uuid();
    if (matches[1].length !== 32) return this._uuid();
    return matches[1];
  }

  _uuid() {
    return this.ctx.bean.util.uuidv4();
  }
}
