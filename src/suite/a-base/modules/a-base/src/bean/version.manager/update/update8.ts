import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(options) {
    let sql;

    // aFunctionScene
    await this.bean.model.schema.createTable('aFunctionScene', function (table) {
      table.basicFields();
      table.string('sceneName', 50);
      table.int0('sceneMenu');
      table.int0('sceneSorting');
    });

    // aFunction: scene -> sceneId
    await this.bean.model.schema.alterTable('aFunction', function (table) {
      table.renameColumn('scene', 'sceneId');
    });

    // aAtom: add field roleIdOwner
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.int0('roleIdOwner');
    });

    // aViewRoleRightAtomClass
    sql = `
        create view aViewRoleRightAtomClass as
          select a.iid,a.roleId as roleIdWho,a.roleIdBase,b.id as roleRightId,b.atomClassId,b.action,b.scope from aRoleExpand a
            inner join aRoleRight b on a.roleIdBase=b.roleId
          `;
    await this.ctx.model.query(sql);

    // aViewUserRightAtomClassRole
    sql = `
        create view aViewUserRightAtomClassRole as
          select a.iid,a.userId as userIdWho,b.atomClassId,b.action,c.roleId as roleIdWhom from aViewUserRoleExpand a
            inner join aRoleRightRef b on a.roleIdBase=b.roleId
            inner join aRoleRef c on b.roleIdScope=c.roleIdParent
          `;
    await this.ctx.model.query(sql);

    // aViewUserRightAtomRole
    sql = `
        create view aViewUserRightAtomRole as
          select a.iid, a.id as atomId,a.roleIdOwner as roleIdWhom,b.userIdWho,b.action from aAtom a,aViewUserRightAtomClassRole b
            where a.deleted=0 and a.atomEnabled=1
              and a.atomClassId=b.atomClassId
              and a.roleIdOwner=b.roleIdWhom
        `;
    await this.ctx.model.query(sql);

    // update exists atoms
    await this._updateAtoms(options);
  }

  async _updateAtoms(_options) {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._updateAtomsInstance();
        },
      });
    }
  }

  async _updateAtomsInstance() {
    // cache
    const mapUserAtomClassRole: any = {};
    // atoms
    const atoms = await this.ctx.model.query(
      'select id, atomClassId, userIdCreated from aAtom where iid=? and deleted=0',
      [this.ctx.instance.id],
    );
    for (const atom of atoms) {
      const mapKey = `${atom.userIdCreated}:${atom.atomClassId}`;
      let mapValue = mapUserAtomClassRole[mapKey];
      if (mapValue === undefined) {
        mapValue = mapUserAtomClassRole[mapKey] = await this._getRoleIdOwner(atom.atomClassId, atom.userIdCreated);
      }
      if (mapValue > 0) {
        await this.ctx.model.query('update aAtom set roleIdOwner=? where id=?', [mapValue, atom.id]);
      }
    }
  }

  async _getRoleIdOwner(atomClassId, userId) {
    return await this.ctx.bean.atom.preferredRoleId({
      atomClass: { id: atomClassId },
      user: { id: userId },
      disableAuthOpenCheck: true,
    });
  }
}
