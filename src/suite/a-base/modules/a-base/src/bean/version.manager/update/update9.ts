import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    await this.run_atom();
    await this.run_categorytag();
    await this.run_resource();
    await this.run_function();
  }

  async run_atom() {
    let sql;

    // aAtom: atomEnabled->atomStage
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.renameColumn('atomEnabled', 'atomStage');
    });

    // aAtom: atomFlow->atomFlowId
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.renameColumn('atomFlow', 'atomFlowId');
    });

    // aAtom: add field atomClosed/atomIdDraft/atomIdArchive
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.int0('atomClosed');
      table.int0('atomIdDraft');
      table.int0('atomIdArchive');
    });

    // aAtom: add field atomStatic/atomStaticKey/atomRevision
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.int0('atomStatic');
      table.string('atomStaticKey', 255);
      table.int0('atomRevision');
    });

    // aAtom: add field atomDisabled
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.int0('atomDisabled');
    });

    // alter view: aViewUserRightAtom
    await this.bean.model.schema.dropView('aViewUserRightAtom');
    await this.bean.model.schema.createView('aViewUserRightAtom', view => {
      view.as(
        this.bean.model
          .builder('aAtom as a')
          .select(['a.iid', 'a.id as atomId', 'a.userIdCreated as userIdWhom', 'b.userIdWho', 'b.action'])
          .innerJoin('aViewUserRightAtomClassUser as b', {
            'a.atomClassId': 'b.atomClassId',
            'a.userIdCreated': 'b.userIdWhom',
          })
          .where('a.deleted', 0)
          .where('a.atomStage', '>', 0),
      );
    });

    // alter view: aViewRoleRightAtom
    await this.bean.model.schema.dropView('aViewRoleRightAtom');
    await this.bean.model.schema.createView('aViewRoleRightAtom', view => {
      view.as(
        this.bean.model
          .builder('aAtom as a')
          .select(['a.iid', 'a.id as atomId', 'a.userIdCreated as userIdWhom', 'b.roleIdWho', 'b.action'])
          .innerJoin('aViewRoleRightAtomClassUser as b', {
            'a.atomClassId': 'b.atomClassId',
            'a.userIdCreated': 'b.userIdWhom',
          })
          .where('a.deleted', 0)
          .where('a.atomStage', '>', 0),
      );
    });

    // alter view: aViewUserRightAtomRole
    await this.bean.model.schema.dropView('aViewUserRightAtomRole');
    await this.bean.model.schema.createView('aViewUserRightAtomRole', view => {
      view.as(
        this.bean.model
          .builder('aAtom as a')
          .select(['a.iid', 'a.id as atomId', 'a.roleIdOwner as roleIdWhom', 'b.userIdWho', 'b.action'])
          .innerJoin('aViewUserRightAtomClassRole as b', {
            'a.atomClassId': 'b.atomClassId',
            'a.roleIdOwner': 'b.roleIdWhom',
          })
          .where('a.deleted', 0)
          .where('a.atomStage', '>', 0),
      );
    });

    // aAtomAction: add field bulk
    await this.bean.model.schema.alterTable('aAtomAction', function (table) {
      table.int0('bulk');
    });
    //   update action:create as bulk
    await this.bean.model.builder('aAtomAction').update({ bulk: 1 }).where('code', 1);
  }

  async run_categorytag() {
    let sql;
    // aAtom: add field atomLanguage\atomCategoryId
    sql = `
        ALTER TABLE aAtom
          ADD COLUMN atomLanguage varchar(50) DEFAULT NULL,
          ADD COLUMN atomCategoryId int(11) DEFAULT '0',
          ADD COLUMN atomTags JSON DEFAULT NULL
        `;
    await this.ctx.model.query(sql);

    // create table: aCategory
    sql = `
          CREATE TABLE aCategory (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomClassId int(11) DEFAULT '0',
            language varchar(50) DEFAULT NULL,
            categoryName varchar(50) DEFAULT NULL,
            categoryCatalog int(11) DEFAULT '0',
            categoryHidden int(11) DEFAULT '0',
            categorySorting int(11) DEFAULT '0',
            categoryFlag varchar(255) DEFAULT NULL,
            categoryIdParent int(11) DEFAULT '0',
            categoryUrl varchar(255) DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `;
    await this.ctx.model.query(sql);

    // create table: aTag
    sql = `
          CREATE TABLE aTag (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomClassId int(11) DEFAULT '0',
            language varchar(50) DEFAULT NULL,
            tagName varchar(50) DEFAULT NULL,
            tagAtomCount int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `;
    await this.ctx.model.query(sql);

    // create table: aTagRef
    sql = `
          CREATE TABLE aTagRef (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            tagId int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `;
    await this.ctx.model.query(sql);
  }

  async run_resource() {
    let sql;

    // create table: aResource
    sql = `
          CREATE TABLE aResource (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            description varchar(255) DEFAULT NULL,
            resourceSorting int(11) DEFAULT '0',
            resourceType varchar(50) DEFAULT NULL,
            resourceConfig JSON DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `;
    await this.ctx.model.query(sql);

    sql = `
          CREATE TABLE aResourceLocale (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            locale varchar(50) DEFAULT NULL,
            atomNameLocale varchar(255) DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `;
    await this.ctx.model.query(sql);

    sql = `
          CREATE TABLE aResourceRole (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            roleId int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `;
    await this.ctx.model.query(sql);

    // aViewUserRightResource
    sql = `
          CREATE VIEW aViewUserRightResource as
            select a.iid,a.userId as userIdWho,a.roleExpandId,a.roleId,a.roleIdBase,
                   b.id as resourceRoleId,b.atomId as resourceAtomId
              from aViewUserRoleExpand a
                inner join aResourceRole b on a.roleIdBase=b.roleId
            `;
    await this.ctx.model.query(sql);
  }

  async run_function() {
    // drop table: aFunction
    await this.ctx.model.query('drop table aFunction');
    // drop table: aFunctionLocale
    await this.ctx.model.query('drop table aFunctionLocale');
    // drop table: aFunctionScene
    await this.ctx.model.query('drop table aFunctionScene');
    // drop table: aFunctionStar
    await this.ctx.model.query('drop table aFunctionStar');
    // drop table: aRoleFunction
    await this.ctx.model.query('drop table aRoleFunction');
    // drop view: aViewUserRightFunction
    await this.ctx.model.query('drop view aViewUserRightFunction');
  }
}
