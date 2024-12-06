import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomRightAuxRoleScopesOfRole } from './bean.atomRightAux_roleScopesOfRole.js';

export class BeanAtomRightAuxRoleScopesMineOfUser extends BeanAtomRightAuxRoleScopesOfRole {
  async getRoleScopesMineOfUser({ atomClass, action, userId }: any) {
    // atomClass
    atomClass = await this.app.bean.atomClass.get(atomClass);
    // action
    action = this.app.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // cache
    return await this.scope.summerCache.roleScopesMineOfUser.get({ atomClassId: atomClass.id, action, userId });
  }

  async clearSummer_roleScopesMineOfUser() {
    await this.scope.summerCache.roleScopesMineOfUser.clear();
  }

  async __getRoleScopesMineOfUserRaw({ atomClassId, action, userId }: any) {
    // atomClass
    const atomClass = await this.app.bean.atomClass.get({ id: atomClassId });
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // not check atomClassBase.itemOnly
    // just check atomClassBase.enableRight.role.roleScopes
    // enableRight
    const enableRight = atomClassBase.enableRight;
    if (!enableRight) {
      // if pass right checked, should check enableRight outer
      // throw error
      this.app.throw(403);
    }
    const enableRightMine = enableRight!.mine;
    if (!enableRightMine) return false;
    return await this.app.bean.atomClass.checkRightAtomClassActionOfUser({
      atomClass: { id: atomClassId },
      action,
      user: { id: userId },
      onlyMine: true,
    });
  }
}
