import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // update cms blocks
    await this.bean.model
      .builder('aCmsContent')
      .update({
        content: this.bean.model.raw("replace (content,'cms-pluginblock:audio','cms-pluginblock:blockAudio')"),
      })
      .whereILike('content', '%cms-pluginblock:audio%');

    await this.bean.model
      .builder('aCmsContent')
      .update({
        content: this.bean.model.raw("replace (content,'cms-pluginblock:iframe','cms-pluginblock:blockIFrame')"),
      })
      .whereILike('content', '%cms-pluginblock:iframe%');

    // migration: languange/category/tag
    await this._update7Migration();
  }

  async _update7Migration() {
    // all instances
    const instances = await this.ctx.bean.instance.list();
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async () => {
          await this._update7MigrationInstance();
        },
      });
    }
  }

  async _update7MigrationInstance() {
    // cagetories
    const mapCagetoryIds = await this._update7Migration_cagetories();
    // tags
    const mapTagIds = await this._update7Migration_tags();
    // articles/post
    await this._update7Migration_articles({ mapCagetoryIds, mapTagIds });
  }

  async _update7Migration_articles({ mapCagetoryIds, mapTagIds }: any) {
    // articles
    const articles = await this.bean.model.select('aCmsArticle as a', {
      columns: ['a.*', 'b.userIdCreated', 'c.tags'],
      joins: [
        ['leftJoin', 'aAtom as b', { 'b.id': 'a.atomId' }],
        ['leftJoin', 'aCmsArticleTag as c', { 'c.atomId': 'a.atomId' }],
      ],
      where: { 'b.atomStage': 1 },
    });
    // loop
    for (const article of articles) {
      await this._update7Migration_article({ mapCagetoryIds, mapTagIds, article });
    }
  }

  async _update7Migration_article({ mapCagetoryIds, mapTagIds, article }: any) {
    // user
    const user = { id: article.userIdCreated };
    // open
    const res = await this.ctx.bean.atom.openDraft({ key: { atomId: article.atomId }, user });
    const draftKey = res.draft.key;
    // atomCategoryId
    const atomCategoryId = article.categoryId === 0 ? 0 : mapCagetoryIds[article.categoryId];
    // atomTags
    let atomTags = article.tags;
    if (article.tags) {
      const _tags = JSON.parse(article.tags);
      atomTags = _tags.map(item => {
        return mapTagIds[item.id];
      });
      atomTags = JSON.stringify(atomTags);
    }
    // write
    await this.ctx.bean.atom.write({
      key: draftKey,
      target: null,
      item: {
        atomLanguage: article.language,
        atomCategoryId,
        atomTags,
      },
      options: {
        ignoreRender: true,
      },
      user,
    });
    // submit
    await this.ctx.bean.atom.submit({
      key: draftKey,
      options: {
        ignoreRender: true,
        ignoreFlow: true,
      },
      user,
    });
  }

  async _update7Migration_tags() {
    const mapTagIds: any = {};
    const tags = await this.bean.model.select('aCmsTag', {
      where: {
        iid: this.ctx.instance.id,
        deleted: 0,
      },
    });
    for (const tag of tags) {
      await this._update7Migration_tag({ mapTagIds, tags, tag });
    }
    return mapTagIds;
  }

  async _update7Migration_tag({ mapTagIds, tag }: any) {
    const tagIdNew = await this.ctx.bean.tag.add({
      atomClass: { id: tag.atomClassId },
      data: {
        language: tag.language,
        tagName: tag.tagName,
        tagAtomCount: tag.articleCount,
      },
    });
    mapTagIds[tag.id] = tagIdNew;
    return tagIdNew;
  }

  async _update7Migration_cagetories() {
    const mapCagetoryIds: any = {};
    const categories = await this.bean.model.select('aCmsCategory', {
      where: {
        iid: this.ctx.instance.id,
        deleted: 0,
      },
    });
    for (const category of categories) {
      await this._update7Migration_cagetory({ mapCagetoryIds, categories, category });
    }
    return mapCagetoryIds;
  }
  async _update7Migration_cagetory({ mapCagetoryIds, categories, category }: any) {
    if (category.__parsed) return mapCagetoryIds[category.id];
    let categoryIdParent = 0;
    if (category.categoryIdParent > 0) {
      const categoryParent = categories.find(item => item.id === category.categoryIdParent);
      categoryIdParent = await this._update7Migration_cagetory({
        mapCagetoryIds,
        categories,
        category: categoryParent,
      });
    }
    const categoryIdNew = await this.ctx.bean.category.add({
      atomClass: { id: category.atomClassId },
      data: {
        language: category.language,
        categoryName: category.categoryName,
        categoryHidden: category.hidden,
        categorySorting: category.sorting,
        categoryFlag: category.flag,
        categoryUrl: category.url,
        categoryIdParent,
      },
    });
    category.__parsed = true;
    mapCagetoryIds[category.id] = categoryIdNew;
    return categoryIdNew;
  }
}
