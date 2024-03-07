import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    let sql;
    // aRole
    await this.bean.model.schema.alterTable('aRole', function (table) {
      table.string('description', 255);
      table.int0('atomId');
      table.int0('roleTypeCode');
      table.json('roleConfig');
    });
    // aUser
    await this.bean.model.schema.alterTable('aUser', function (table) {
      table.int0('atomId');
    });
    // aViewUserRightRefAtomClass
    await this.bean.model.schema.createView('aViewUserRightRefAtomClass', view => {
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
    await this.bean.model.schema.dropView('aViewUserRightAtomClassUser');
    await this.bean.model.schema.createView('aViewUserRightAtomClassUser', view => {
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
    await this.bean.model.schema.dropView('aViewRoleRightAtomClassUser');
    await this.bean.model.schema.createView('aViewRoleRightAtomClassUser', view => {
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
    await this.bean.model.schema.createView('aViewRoleRightAtomClassRole', view => {
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
    await this.bean.model.schema.createView('aViewRoleRightResource', view => {
      view.as(
        this.bean.model
          .builder('aRoleExpand as a')
          .select(['a.iid', 'a.roleId as roleIdWho', 'a.roleIdBase', 'b.id as resourceRoleId', 'b.atomId'])
          .innerJoin('aResourceRole as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });
    // view: aRoleView
    sql = `
          CREATE VIEW aRoleView as
            select a.*,b.roleName as roleNameParent from aRole a
              left join aRole b on a.roleIdParent=b.id
        `;
    await this.ctx.model.query(sql);
    // view: aRoleIncludesView
    sql = `
          CREATE VIEW aRoleIncludesView as
            select a.*,b.id as roleIncId,b.roleId as roleIdWho,b.roleIdInc from aRole a
              inner join aRoleInc b on a.id=b.roleIdInc
        `;
    await this.ctx.model.query(sql);
    // view: aRoleUsersView
    sql = `
          CREATE VIEW aRoleUserRolesView as
            select a.*,b.id as userRoleId,b.userId as userIdWho from aRole a
              inner join aUserRole b on a.id=b.roleId
        `;
    await this.ctx.model.query(sql);
  }
}
