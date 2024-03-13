import { __ThisModule__ } from '../../resource/this.js';
import { BeanAtomRightAux0 } from './bean.atomRightAux_0.js';

export class BeanAtomRightAuxRoleScopesOfUser extends BeanAtomRightAux0 {
  async getRoleScopesOfUser({ atomClass, action, userId }: any) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // action
    action = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // cache
    return await this.ctx.bean.summer.get(
      { module: __ThisModule__, name: 'roleScopesOfUser' },
      { atomClassId: atomClass.id, action, userId },
    );
  }

  async clearSummer_roleScopesOfUser() {
    await this.ctx.bean.summer.clear({ module: __ThisModule__, name: 'roleScopesOfUser' });
  }

  async __getRoleScopesOfUserRaw({ atomClassId, action, userId }: any) {
    // atomClass
    const atomClass = await this.ctx.bean.atomClass.get({ id: atomClassId });
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // not check atomClassBase.itemOnly
    // just check atomClassBase.enableRight.role.roleScopes
    // enableRight
    const enableRight = atomClassBase.enableRight;
    if (!enableRight) {
      // if pass right checked, should check enableRight outer
      // throw error
      this.ctx.throw(403);
    }
    const enableRightRole = enableRight.role;
    if (!enableRightRole) return false;
    const enableRightRoleScopes = typeof enableRightRole === 'object' && enableRightRole.scopes;
    if (!enableRightRoleScopes) {
      return await this.ctx.bean.atomClass.checkRightAtomClassActionOfUser({
        atomClass: { id: atomClassId },
        action,
        user: { id: userId },
        excludeMine: true,
      });
    }
    // sql
    const items = await this.bean.model.select(
      'aViewUserRightAtomClassRole',
      {
        columns: 'roleIdWhom',
        where: {
          atomClassId,
          action,
          userIdWho: userId,
        },
      },
      { disableDeleted: true },
    );
    const roleIds = items.map(item => item.roleIdWhom);
    // false
    if (roleIds.length === 0) return false;
    // true
    const roleAuthenticated = await this.ctx.bean.role.getSystemRole({ roleName: 'authenticated' });
    if (roleIds.includes(roleAuthenticated!.id)) return true;
    // array
    return roleIds;
  }
}
