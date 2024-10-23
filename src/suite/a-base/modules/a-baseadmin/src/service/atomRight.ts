import { BeanBase, Local } from 'vona';

@Local()
export class LocalAtomRight extends BeanBase {
  async rights({ roleAtomId, page, user }: any) {
    return await this.ctx.bean.role.roleRights({ roleAtomId, page, user });
  }

  async add({ roleAtomId, atomClass, actionCode, scopeSelf, scope, user }: any) {
    if (scopeSelf) {
      scope = 0;
    }
    return await this.ctx.bean.role.addRoleRight({
      roleAtomId,
      atomClass,
      // atomClassId: _atomClass.id,
      action: actionCode,
      scope,
      user,
    });
  }

  async delete({ roleAtomId, roleRightId, user }: any) {
    return await this.ctx.bean.role.deleteRoleRight({ roleAtomId, roleRightId, user });
  }

  async spreads({ roleAtomId, page, user }: any) {
    return await this.ctx.bean.role.roleSpreads({ roleAtomId, page, user });
  }
}
