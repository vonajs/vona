import { __ThisModule__ } from '../../resource/this.js';
import { BeanAtomRightAuxRoleScopesOfUser } from './bean.atomRightAux_roleScopesOfUser.js';

export class BeanAtomRightAuxRoleScopesOfRole extends BeanAtomRightAuxRoleScopesOfUser {
  async getRoleScopesOfRole({ atomClass, action, roleId }: any) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // action
    action = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // cache
    return await this.ctx.bean.summer.get(
      { module: __ThisModule__, name: 'roleScopesOfRole' },
      { atomClassId: atomClass.id, action, roleId },
    );
  }

  async clearSummer_roleScopesOfRole() {
    await this.ctx.bean.summer.clear({ module: __ThisModule__, name: 'roleScopesOfRole' });
  }

  async __getRoleScopesOfRoleRaw({ atomClassId, action, roleId }: any) {
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
      return await this.ctx.bean.atomClass.checkRightAtomClassActionOfRole({
        atomClass: { id: atomClassId },
        action,
        roleId,
        excludeMine: true,
      });
    }
    // sql
    const items = await this.bean.model.select(
      'aViewRoleRightAtomClassRole as c',
      {
        columns: ['c.roleIdWhom'],
        where: {
          'c.atomClassId': atomClassId,
          'c.action': action,
          'c.roleIdWho': roleId,
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
