import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    await this._alterTables();
    await this._alterViews_aRoleRight_level1();
    await this._alterViews_aRoleRightRef_level1();
    await this._alterViews_aRoleRightRef_level2();
  }

  async _alterTables() {
    // aAtom: add atomAreaKey atomAreaValue
    await this.bean.model.alterTable('aAtom', function (table) {
      table.string('atomAreaKey', 255);
      table.string('atomAreaValue', 255);
    });

    // aRoleRight: add areaKey areaScope
    await this.bean.model.alterTable('aRoleRight', function (table) {
      table.string('areaKey', 255);
      table.string('areaScope', 255);
    });

    // aRoleRightRef: add areaKey areaScope
    await this.bean.model.alterTable('aRoleRightRef', function (table) {
      table.string('areaKey', 255);
      table.string('areaScope', 255);
    });
  }

  async _alterViews_aRoleRight_level1() {
    // level1: aViewRoleRightAtomClass(8) aViewUserRightAtomClass(1)

    // aViewRoleRightAtomClass
    await this.bean.model.alterView('aViewRoleRightAtomClass', view => {
      view.as(
        this.bean.model
          .builder('aRoleExpand as a')
          .select([
            'a.iid',
            'a.roleId as roleIdWho',
            'a.roleIdBase',
            'b.id as roleRightId',
            'b.atomClassId',
            'b.action',
            'b.scope',
            'b.areaKey',
            'b.areaScope',
          ])
          .innerJoin('aRoleRight as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });

    // aViewUserRightAtomClass
    await this.bean.model.alterView('aViewUserRightAtomClass', view => {
      view.as(
        this.bean.model
          .builder('aViewUserRoleExpand as a')
          .select([
            'a.iid',
            'a.userId as userIdWho',
            'a.roleExpandId',
            'a.roleId',
            'a.roleIdBase',
            'b.id as roleRightId',
            'b.atomClassId',
            'b.action',
            'b.scope',
            'b.areaKey',
            'b.areaScope',
          ])
          .innerJoin('aRoleRight as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });
  }

  async _alterViews_aRoleRightRef_level1() {
    // level1:
    //   aViewUserRightRefAtomClass(13)
    //   aViewUserRightAtomClassUser(13)
    //   aViewRoleRightAtomClassUser(13)
    //   aViewRoleRightAtomClassRole(13)
    //   aViewUserRightAtomClassRole(8)

    // aViewUserRightRefAtomClass
    await this.ctx.model.query('drop view aViewUserRightRefAtomClass');
    let sql = `
        create view aViewUserRightRefAtomClass as
          select a.iid,a.userId as userIdWho,a.roleExpandId,a.roleId,a.roleIdBase,
                b.id as roleRightRefId,b.roleRightId,b.atomClassId,b.action,b.roleIdScope as roleIdWhom,b.areaKey,b.areaScope
            from aViewUserRoleExpand a
              inner join aRoleRightRef b on a.roleIdBase=b.roleId
        `;
    await this.ctx.model.query(sql);

    // aViewUserRightAtomClassUser
    await this.ctx.model.query('drop view aViewUserRightAtomClassUser');
    sql = `
        create view aViewUserRightAtomClassUser as
          select a.iid,a.userId as userIdWho,b.atomClassId,b.action,b.areaKey,b.areaScope,
                c.userId as userIdWhom,c.roleId as roleIdWhom,
                a.roleIdBase,c.roleIdParent,c.level as roleIdParentLevel
            from aViewUserRoleExpand a
              inner join aRoleRightRef b on a.roleIdBase=b.roleId
              inner join aViewUserRoleRef c on b.roleIdScope=c.roleIdParent
      `;
    await this.ctx.model.query(sql);

    // aViewRoleRightAtomClassUser
    await this.ctx.model.query('drop view aViewRoleRightAtomClassUser');
    sql = `
      create view aViewRoleRightAtomClassUser as
        select a.iid,a.roleId as roleIdWho,b.atomClassId,b.action,b.areaKey,b.areaScope,
               c.userId as userIdWhom,c.roleId as roleIdWhom,
               a.roleIdBase,c.roleIdParent,c.level as roleIdParentLevel
          from aRoleExpand a
            inner join aRoleRightRef b on a.roleIdBase=b.roleId
            inner join aViewUserRoleRef c on b.roleIdScope=c.roleIdParent
        `;
    await this.ctx.model.query(sql);

    // aViewRoleRightAtomClassRole
    await this.ctx.model.query('drop view aViewRoleRightAtomClassRole');
    sql = `
        create view aViewRoleRightAtomClassRole as
          select a.iid,a.roleId as roleIdWho,b.atomClassId,b.action,b.areaKey,b.areaScope,
                c.roleId as roleIdWhom,
                a.roleIdBase,c.roleIdParent,c.level as roleIdParentLevel
            from aRoleExpand a
              inner join aRoleRightRef b on a.roleIdBase=b.roleId
              inner join aRoleRef c on b.roleIdScope=c.roleIdParent
      `;
    await this.ctx.model.query(sql);

    // aViewUserRightAtomClassRole
    await this.ctx.model.query('drop view aViewUserRightAtomClassRole');
    sql = `
        create view aViewUserRightAtomClassRole as
          select a.iid,a.userId as userIdWho,
                 b.atomClassId,b.action,b.areaKey,b.areaScope,
                 c.roleId as roleIdWhom
            from aViewUserRoleExpand a
              inner join aRoleRightRef b on a.roleIdBase=b.roleId
              inner join aRoleRef c on b.roleIdScope=c.roleIdParent
          `;
    await this.ctx.model.query(sql);
  }

  async _alterViews_aRoleRightRef_level2() {
    // level2:
    //   aViewUserRightAtom(9)
    //   aViewRoleRightAtom(9)
    //   aViewUserRightAtomRole(9)

    // aViewUserRightAtom
    await this.ctx.model.query('drop view aViewUserRightAtom');
    let sql = `
          create view aViewUserRightAtom as
            select a.iid, a.id as atomId,a.userIdCreated as userIdWhom,
                   b.userIdWho,b.action,b.areaKey,b.areaScope 
              from aAtom a,aViewUserRightAtomClassUser b
                where a.deleted=0 and a.atomStage>0
                  and a.atomClassId=b.atomClassId
                  and a.userIdCreated=b.userIdWhom
      `;
    await this.ctx.model.query(sql);

    // aViewRoleRightAtom
    await this.ctx.model.query('drop view aViewRoleRightAtom');
    sql = `
          create view aViewRoleRightAtom as
            select a.iid, a.id as atomId,a.userIdCreated as userIdWhom,
                   b.roleIdWho,b.action,b.areaKey,b.areaScope
              from aAtom a,aViewRoleRightAtomClassUser b
                where a.deleted=0 and a.atomStage>0
                  and a.atomClassId=b.atomClassId
                  and a.userIdCreated=b.userIdWhom
      `;
    await this.ctx.model.query(sql);

    // aViewUserRightAtomRole
    await this.ctx.model.query('drop view aViewUserRightAtomRole');
    sql = `
          create view aViewUserRightAtomRole as
            select a.iid, a.id as atomId,a.roleIdOwner as roleIdWhom,
                   b.userIdWho,b.action,b.areaKey,b.areaScope
              from aAtom a,aViewUserRightAtomClassRole b
                where a.deleted=0 and a.atomStage>0
                  and a.atomClassId=b.atomClassId
                  and a.roleIdOwner=b.roleIdWhom
        `;
    await this.ctx.model.query(sql);
  }
}
