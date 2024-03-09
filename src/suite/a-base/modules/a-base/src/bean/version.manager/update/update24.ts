import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    await this._alterViews_aRoleRight_level1();
    await this._alterViews_aRoleRightRef_level1();
    await this._alterViews_aRoleRightRef_level2();
    await this._alterTables();
  }

  async _alterTables() {
    // aAtom: drop atomAreaKey atomAreaValue
    await this.bean.model.alterTable('aAtom', function (table) {
      table.dropColumn('atomAreaKey');
      table.dropColumn('atomAreaValue');
    });

    // aRoleRight: drop areaKey areaScope
    await this.bean.model.alterTable('aRoleRight', function (table) {
      table.dropColumn('areaKey');
      table.dropColumn('areaScope');
    });

    // aRoleRightRef: drop areaKey areaScope
    await this.bean.model.alterTable('aRoleRightRef', function (table) {
      table.dropColumn('areaKey');
      table.dropColumn('areaScope');
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

    // drop views
    await this.bean.model.dropView('aViewUserRightAtom');
    await this.bean.model.dropView('aViewRoleRightAtom');
    await this.bean.model.dropView('aViewUserRightAtomRole');

    // aViewUserRightRefAtomClass
    await this.bean.model.alterView('aViewUserRightRefAtomClass', view => {
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
    await this.bean.model.alterView('aViewRoleRightAtomClassRole', view => {
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

    // aViewUserRightAtomClassRole
    await this.bean.model.alterView('aViewUserRightAtomClassRole', view => {
      view.as(
        this.bean.model
          .builder('aViewUserRoleExpand as a')
          .select(['a.iid', 'a.userId as userIdWho', 'b.atomClassId', 'b.action', 'c.roleId as roleIdWhom'])
          .innerJoin('aRoleRightRef as b', { 'a.roleIdBase': 'b.roleId' })
          .innerJoin('aRoleRef as c', { 'b.roleIdScope': 'c.roleIdParent' }),
      );
    });
  }

  async _alterViews_aRoleRightRef_level2() {
    // level2:
    //   aViewUserRightAtom(9)
    //   aViewRoleRightAtom(9)
    //   aViewUserRightAtomRole(9)

    // aViewUserRightAtom
    await this.bean.model.alterView('aViewUserRightAtom', view => {
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

    // aViewRoleRightAtom
    await this.bean.model.alterView('aViewRoleRightAtom', view => {
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

    // aViewUserRightAtomRole
    await this.bean.model.alterView('aViewUserRightAtomRole', view => {
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
  }
}
