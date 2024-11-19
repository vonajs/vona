import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(options) {
    // aFunctionScene
    await this.bean.model.createTable('aFunctionScene', function (table) {
      table.basicFields();
      table.string('sceneName', 50);
      table.int0('sceneMenu');
      table.int0('sceneSorting');
    });

    // aFunction: scene -> sceneId
    await this.bean.model.alterTable('aFunction', function (table) {
      table.renameColumn('scene', 'sceneId');
    });

    // aAtom: add field roleIdOwner
    await this.bean.model.alterTable('aAtom', function (table) {
      table.int0('roleIdOwner');
    });

    // aViewRoleRightAtomClass
    await this.bean.model.createView('aViewRoleRightAtomClass', view => {
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

    // aViewUserRightAtomClassRole
    await this.bean.model.createView('aViewUserRightAtomClassRole', view => {
      view.as(
        this.bean.model
          .builder('aViewUserRoleExpand as a')
          .select(['a.iid', 'a.userId as userIdWho', 'b.atomClassId', 'b.action', 'c.roleId as roleIdWhom'])
          .innerJoin('aRoleRightRef as b', { 'a.roleIdBase': 'b.roleId' })
          .innerJoin('aRoleRef as c', { 'b.roleIdScope': 'c.roleIdParent' }),
      );
    });

    // aViewUserRightAtomRole
    await this.bean.model.createView('aViewUserRightAtomRole', view => {
      view.as(
        this.bean.model
          .builder('aAtom as a')
          .select(['a.iid', 'a.id as atomId', 'a.roleIdOwner as roleIdWhom', 'b.userIdWho', 'b.action'])
          .innerJoin('aViewUserRightAtomClassRole as b', {
            'a.atomClassId': 'b.atomClassId',
            'a.roleIdOwner': 'b.roleIdWhom',
          })
          .where({ 'a.deleted': 0, 'a.atomEnabled': 1 }),
      );
    });

    // update exists atoms
    await this._updateAtoms(options);
  }

  async _updateAtoms(_options) {
    // all instances
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async () => {
          await this._updateAtomsInstance();
        },
      });
    }
  }

  async _updateAtomsInstance() {
    // cache
    const mapUserAtomClassRole: any = {};
    // atoms
    const atoms = await this.bean.atom.model.select();
    for (const atom of atoms) {
      const mapKey = `${atom.userIdCreated}:${atom.atomClassId}`;
      let mapValue = mapUserAtomClassRole[mapKey];
      if (mapValue === undefined) {
        mapValue = mapUserAtomClassRole[mapKey] = await this._getRoleIdOwner(atom.atomClassId, atom.userIdCreated);
      }
      if (mapValue > 0) {
        await this.bean.atom.model.update({
          id: atom.id,
          roleIdOwner: mapValue,
        });
      }
    }
  }

  async _getRoleIdOwner(atomClassId, userId) {
    return await this.app.bean.atom.preferredRoleId({
      atomClass: { id: atomClassId },
      user: { id: userId },
      disableAuthOpenCheck: true,
    });
  }
}
