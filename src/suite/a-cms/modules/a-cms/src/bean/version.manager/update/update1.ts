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
    sql = `
        CREATE TABLE aCmsContent (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          atomId int(11) DEFAULT '0',
          itemId int(11) DEFAULT '0',
          content LONGTEXT DEFAULT NULL,
          html LONGTEXT DEFAULT NULL,
          PRIMARY KEY (id)
        )
      `;
    await this.ctx.model.query(sql);
    await this.bean.model.createTable('', function (table) {});

    // create table: aCmsCategory
    sql = `
        CREATE TABLE aCmsCategory (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          categoryName varchar(50) DEFAULT NULL,
          language varchar(50) DEFAULT NULL,
          catalog int(11) DEFAULT '0',
          hidden int(11) DEFAULT '0',
          sorting int(11) DEFAULT '0',
          flag varchar(255) DEFAULT NULL,
          categoryIdParent int(11) DEFAULT '0',
          PRIMARY KEY (id)
        )
      `;
    await this.ctx.model.query(sql);
    // create view: aCmsArticleView
    sql = `
        CREATE VIEW aCmsArticleView as
          select a.*,b.categoryName from aCmsArticle a
            left join aCmsCategory b on a.categoryId=b.id
      `;
    await this.ctx.model.query(sql);
    // create view: aCmsArticleViewFull
    sql = `
        CREATE VIEW aCmsArticleViewFull as
          select a.*,b.categoryName,c.content,c.html,concat(d.atomName,',',c.content) contentSearch from aCmsArticle a
            left join aCmsCategory b on a.categoryId=b.id
            left join aCmsContent c on a.id=c.itemId
            left join aAtom d on a.atomId=d.id
      `;
    await this.ctx.model.query(sql);
  }
}
