module.exports = class Startup {
  get modelRoleRight() {
    return this.ctx.model.module('a-base').roleRight;
  }

  async execute() {
    await this._checkAtomClasses();
  }

  async _checkAtomClasses() {
    const atomClasses = this.ctx.bean.base.atomClasses();
    for (const module in atomClasses) {
      const atomClassesModule = atomClasses[module];
      for (const atomClassName in atomClassesModule) {
        const atomClass = atomClassesModule[atomClassName];
        if (atomClass.history) {
          await this._checkAtomClass({
            atomClass: { module, atomClassName },
          });
        }
      }
    }
  }

  async _checkAtomClass({ atomClass }) {
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // check if any role exists
    const right = await this.modelRoleRight.get({
      atomClassId: atomClass.id,
      action: 17, // viewHistory
    });
    if (right) return;
    // always add role of template.system when no records
    const roleRights = [
      { roleName: 'template.system', action: 'viewHistory', scopeNames: 'authenticated' }, //
      { roleName: 'authenticated', action: 'viewHistory', scopeNames: 0 }, //
    ];
    await this.ctx.bean.role.addRoleRightBatch({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      roleRights,
    });
  }
};
