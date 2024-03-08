import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    await this.run_atom();
    await this.run_categorytag();
    await this.run_resource();
    await this.run_function();
  }

  async run_atom() {
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
    await this.bean.model.alterTable('aAtom', function (table) {
      table.int0('atomDisabled');
    });

    // alter view: aViewUserRightAtom
    await this.bean.model.dropView('aViewUserRightAtom');
    await this.bean.model.createView('aViewUserRightAtom', view => {
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
    // aAtom: add field atomLanguage\atomCategoryId
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.string('atomLanguage', 50);
      table.int0('atomCategoryId');
      table.json('atomTags');
    });

    // create table: aCategory
    await this.bean.model.schema.createTable('aCategory', function (table) {
      table.basicFields();
      table.int0('atomClassId');
      table.string('language', 50);
      table.string('categoryName', 50);
      table.int0('categoryCatalog');
      table.int0('categoryHidden');
      table.int0('categorySorting');
      table.string('categoryFlag', 255);
      table.int0('categoryIdParent');
      table.string('categoryUrl', 255);
    });

    // create table: aTag
    await this.bean.model.schema.createTable('aTag', function (table) {
      table.basicFields();
      table.int0('atomClassId');
      table.string('language', 50);
      table.string('tagName', 50);
      table.int0('tagAtomCount');
    });

    // create table: aTagRef
    await this.bean.model.schema.createTable('aTagRef', function (table) {
      table.basicFields();
      table.int0('atomId');
      table.int0('tagId');
    });
  }

  async run_resource() {
    // create table: aResource
    await this.bean.model.schema.createTable('aResource', function (table) {
      table.basicFields();
      table.int0('atomId');
      table.string('description', 255);
      table.int0('resourceSorting');
      table.string('resourceType', 50);
      table.json('resourceConfig');
    });

    // create table: aResourceLocale
    await this.bean.model.schema.createTable('aResourceLocale', function (table) {
      table.basicFields();
      table.int0('atomId');
      table.string('locale', 50);
      table.string('atomNameLocale', 255);
    });

    // create table: aResourceRole
    await this.bean.model.schema.createTable('aResourceRole', function (table) {
      table.basicFields();
      table.int0('atomId');
      table.int0('roleId');
    });

    // aViewUserRightResource
    await this.bean.model.schema.createView('aViewUserRightResource', view => {
      view.as(
        this.bean.model
          .builder('aViewUserRoleExpand as a')
          .select([
            'a.iid',
            'a.userId as userIdWho',
            'a.roleExpandId',
            'a.roleId',
            'a.roleIdBase',
            'b.id as resourceRoleId',
            'b.atomId as resourceAtomId',
          ])
          .innerJoin('aResourceRole as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });
  }

  async run_function() {
    // drop view: aViewUserRightFunction
    await this.bean.model.schema.dropView('aViewUserRightFunction');
    // drop table: aFunction
    await this.bean.model.schema.dropTable('aFunction');
    // drop table: aFunctionLocale
    await this.bean.model.schema.dropTable('aFunctionLocale');
    // drop table: aFunctionScene
    await this.bean.model.schema.dropTable('aFunctionScene');
    // drop table: aFunctionStar
    await this.bean.model.schema.dropTable('aFunctionStar');
    // drop table: aRoleFunction
    await this.bean.model.schema.dropTable('aRoleFunction');
  }
}
