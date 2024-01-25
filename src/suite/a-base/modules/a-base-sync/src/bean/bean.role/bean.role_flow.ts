import BeanRoleUsers from './bean.role_users.js';

export class BeanRoleFlow extends BeanRoleUsers {
  // const roleRights = [
  //   {
  //     roleName: 'family.father',
  //     flowKey: 'test-flow:set03_atomStateDraft',
  //     nodeDefId: 'activity_1',
  //     scopeNames: 'family',
  //   },
  // ];
  async addRoleRightBatchByModeFlow({ atomClassId, module, atomClassName, roleRights }) {
    // module
    module = module || this.moduleScope;
    // const _module = this.ctx.app.meta.modules[module];
    // atomClass
    const atomClass = await this.ctx.bean.atomClass.get({ id: atomClassId, module, atomClassName });
    // write back, for use atomClassId
    module = atomClass.module;
    atomClassName = atomClass.atomClassName;
    // roleRights
    if (!roleRights || !roleRights.length) return;
    for (const roleRight of roleRights) {
      // role
      let role;
      if (roleRight.roleAtomId || roleRight.roleId) {
        role = await this._forceRole({ roleAtomId: roleRight.roleAtomId, roleId: roleRight.roleId });
      } else {
        role = await this.parseRoleName({ roleName: roleRight.roleName, force: true });
      }
      // scope
      const scope = await this._parseScopeNames({ scopeNames: roleRight.scopeNames });
      // add role right
      const action = await this.ctx.bean.atomAction.getByModeFlow({
        atomClassId: atomClass.id,
        flowKey: roleRight.flowKey,
        nodeDefId: roleRight.nodeDefId,
        nodeDefName: roleRight.nodeDefName,
      });
      await this.addRoleRight({
        roleId: role.id,
        atomClassId: atomClass.id,
        action: action.code,
        scope,
      });
    }
  }
}
