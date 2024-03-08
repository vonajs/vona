import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aRole
    await this.bean.model.alterTable('aRole', function (table) {
      table.string('description', 255);
      table.int0('atomId');
      table.int0('roleTypeCode');
      table.json('roleConfig');
    });
    // aUser
    await this.bean.model.alterTable('aUser', function (table) {
      table.int0('atomId');
    });
    // aViewUserRightRefAtomClass
    await this.bean.model.createView('aViewUserRightRefAtomClass', view => {
      view.as(
        this.bean.model
          .builder('aViewUserRoleExpand as a')
          .select([
            'a.iid',
            'a.userId as userIdWho',
            'a.roleExpandId',
            'a.roleId',
            'a.roleIdBase',
            'b.id as roleRightRefId',
            'b.roleRightId',
            'b.atomClassId',
            'b.action',
            'b.roleIdScope as roleIdWhom',
          ])
          .innerJoin('aRoleRightRef as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });
    // aViewUserRightAtomClassUser
    await this.bean.model.alterView('aViewUserRightAtomClassUser', view => {
      view.as(
        this.bean.model
          .builder('aViewUserRoleExpand as a')
          .select([
            'a.iid',
            'a.userId as userIdWho',
            'b.atomClassId',
            'b.action',
            'c.userId as userIdWhom',
            'c.roleId as roleIdWhom',
            'a.roleIdBase',
            'c.roleIdParent',
            'c.level as roleIdParentLevel',
          ])
          .innerJoin('aRoleRightRef as b', { 'a.roleIdBase': 'b.roleId' })
          .innerJoin('aViewUserRoleRef as c', { 'b.roleIdScope': 'c.roleIdParent' }),
      );
    });
    // aViewRoleRightAtomClassUser
    await this.bean.model.alterView('aViewRoleRightAtomClassUser', view => {
      view.as(
        this.bean.model
          .builder('aRoleExpand as a')
          .select([
            'a.iid',
            'a.roleId as roleIdWho',
            'b.atomClassId',
            'b.action',
            'c.userId as userIdWhom',
            'c.roleId as roleIdWhom',
            'a.roleIdBase',
            'c.roleIdParent',
            'c.level as roleIdParentLevel',
          ])
          .innerJoin('aRoleRightRef as b', { 'a.roleIdBase': 'b.roleId' })
          .innerJoin('aViewUserRoleRef as c', { 'b.roleIdScope': 'c.roleIdParent' }),
      );
    });
    // aViewRoleRightAtomClassRole
    await this.bean.model.createView('aViewRoleRightAtomClassRole', view => {
      view.as(
        this.bean.model
          .builder('aRoleExpand as a')
          .select([
            'a.iid',
            'a.roleId as roleIdWho',
            'b.atomClassId',
            'b.action',
            'c.roleId as roleIdWhom',
            'a.roleIdBase',
            'c.roleIdParent',
            'c.level as roleIdParentLevel',
          ])
          .innerJoin('aRoleRightRef as b', { 'a.roleIdBase': 'b.roleId' })
          .innerJoin('aRoleRef as c', { 'b.roleIdScope': 'c.roleIdParent' }),
      );
    });
    // aViewRoleRightResource
    await this.bean.model.createView('aViewRoleRightResource', view => {
      view.as(
        this.bean.model
          .builder('aRoleExpand as a')
          .select(['a.iid', 'a.roleId as roleIdWho', 'a.roleIdBase', 'b.id as resourceRoleId', 'b.atomId'])
          .innerJoin('aResourceRole as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });
    // view: aRoleView
    await this.bean.model.createView('aRoleView', view => {
      view.as(
        this.bean.model
          .builder('aRole as a')
          .select(['a.*', 'b.roleName as roleNameParent'])
          .leftJoin('aRole as b', { 'a.roleIdParent': 'b.id' }),
      );
    });
    // view: aRoleIncludesView
    await this.bean.model.createView('aRoleIncludesView', view => {
      view.as(
        this.bean.model
          .builder('aRole as a')
          .select(['a.*', 'b.id as roleIncId', 'b.roleId as roleIdWho', 'b.roleIdInc'])
          .innerJoin('aRoleInc as b', { 'a.id': 'b.roleIdInc' }),
      );
    });
    // view: aRoleUserRolesView
    await this.bean.model.createView('aRoleUserRolesView', view => {
      view.as(
        this.bean.model
          .builder('aRole as a')
          .select(['a.*', 'b.id as userRoleId', 'b.userId as userIdWho'])
          .innerJoin('aUserRole as b', { 'a.id': 'b.roleId' }),
      );
    });
  }
}
