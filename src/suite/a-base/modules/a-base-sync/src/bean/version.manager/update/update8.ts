import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(options) {
    let sql;

    // aFunctionScene
    sql = `
          CREATE TABLE aFunctionScene (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            sceneName varchar(50) DEFAULT NULL,
            sceneMenu int(11) DEFAULT '0',
            sceneSorting int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `;
    await this.ctx.model.query(sql);

    // aFunction: scene -> sceneId
    sql = `
        ALTER TABLE aFunction
          CHANGE COLUMN scene sceneId int(11) DEFAULT '0'
                  `;
    await this.ctx.model.query(sql);

    // aAtom: add field roleIdOwner
    sql = `
        ALTER TABLE aAtom
          ADD COLUMN roleIdOwner int(11) DEFAULT '0'
                  `;
    await this.ctx.model.query(sql);

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
    await this._updateAtoms();
  }

  async _updateAtoms() {
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
    const mapUserAtomClassRole = {};
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
