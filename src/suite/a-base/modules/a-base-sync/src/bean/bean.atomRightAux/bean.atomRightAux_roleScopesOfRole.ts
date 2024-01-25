import BeanAtomRightAuxRoleScopesOfUser from './bean.atomRightAux_roleScopesOfUser.js';

export class BeanAtomRightAuxRoleScopesOfRole extends BeanAtomRightAuxRoleScopesOfUser {
  async getRoleScopesOfRole({ atomClass, action, roleId }) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // action
    action = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // cache
    return await this.ctx.bean.summer.get(
      { module: moduleInfo.relativeName, name: 'roleScopesOfRole' },
      { atomClassId: atomClass.id, action, roleId },
    );
  }

  async clearSummer_roleScopesOfRole() {
    await this.ctx.bean.summer.clear({ module: moduleInfo.relativeName, name: 'roleScopesOfRole' });
  }

  async __getRoleScopesOfRoleRaw({ atomClassId, action, roleId }) {
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
    const enableRightRoleScopes = enableRightRole.scopes;
    if (!enableRightRoleScopes) {
      return await this.ctx.bean.atomClass.checkRightAtomClassActionOfRole({
        atomClass: { id: atomClassId },
        action,
        roleId,
        excludeMine: true,
      });
    }
    // sql
    const sql = `
        select c.roleIdWhom from aViewRoleRightAtomClassRole c
          where c.iid=? and c.atomClassId=? and c.action=? and c.roleIdWho=?
      `;
    const items = await this.ctx.model.query(sql, [this.ctx.instance.id, atomClassId, action, roleId]);
    const roleIds = items.map(item => item.roleIdWhom);
    // false
    if (roleIds.length === 0) return false;
    // true
    const roleAuthenticated = await this.ctx.bean.role.getSystemRole({ roleName: 'authenticated' });
    if (roleIds.includes(roleAuthenticated.id)) return true;
    // array
    return roleIds;
  }
}
