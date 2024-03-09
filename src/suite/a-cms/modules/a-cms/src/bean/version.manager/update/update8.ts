import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // schemas update for 7
    await this._update7Migration_schemas();
  }
  async _update7Migration_schemas() {
    let sql;
    // aCmsArticle
    await this.bean.model.alterTable('aCmsArticle', function (table) {
      table.dropColumn('categoryId');
      table.dropColumn('language');
    });

    // aCmsArticleTag
    await this.bean.model.dropTable('aCmsArticleTag');

    // aCmsArticleTagRef
    await this.bean.model.dropTable('aCmsArticleTagRef');

    // aCmsCategory
    sql = 'DROP TABLE aCmsCategory';
    await this.ctx.model.query(sql);
    // aCmsTag
    sql = 'DROP TABLE aCmsTag';
    await this.ctx.model.query(sql);
    // aCmsArticleView
    sql = 'DROP VIEW aCmsArticleView';
    await this.ctx.model.query(sql);
    // aCmsArticleViewFull
    await this.ctx.model.query('drop view aCmsArticleViewFull');
    sql = `
          CREATE VIEW aCmsArticleViewFull as
            select a.*,b.content,b.html from aCmsArticle a
              left join aCmsContent b on a.id=b.itemId
        `;
    await this.ctx.model.query(sql);
    // aCmsArticleViewSearch
    await this.ctx.model.query('drop view aCmsArticleViewSearch');
    sql = `
          CREATE VIEW aCmsArticleViewSearch as
            select a.*,b.content,b.html,concat(c.atomName,',',b.content) contentSearch from aCmsArticle a
              left join aCmsContent b on a.id=b.itemId
              left join aAtom c on a.atomId=c.id
        `;
    await this.ctx.model.query(sql);
    // aCmsArticleViewTag
    await this.ctx.model.query('drop view aCmsArticleViewTag');
  }
}
