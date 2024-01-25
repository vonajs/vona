module.exports = class AtomRightAux {
  async getRoleWhosOfAtomClassAction({ atomClass, action }) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // action
    action = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // cache
    return await this.ctx.bean.summer.get(
      { module: moduleInfo.relativeName, name: 'roleWhosOfAtomClassAction' },
      { atomClassId: atomClass.id, action },
    );
  }

  async clearSummer_roleWhosOfAtomClassAction() {
    await this.ctx.bean.summer.clear({ module: moduleInfo.relativeName, name: 'roleWhosOfAtomClassAction' });
  }

  async __getRoleWhosOfAtomClassActionRaw({ atomClassId, action }) {
    return await this.ctx.model.query(
      `
          select distinct roleIdWho,scope from aViewRoleRightAtomClass 
            where iid=? and atomClassId=? and action=?
        `,
      [this.ctx.instance.id, atomClassId, action],
    );
  }
};
