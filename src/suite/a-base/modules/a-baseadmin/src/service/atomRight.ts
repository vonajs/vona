import { BeanBase, Service } from 'vona';

@Service()
export class ServiceAtomRight extends BeanBase {
  async rights({ roleAtomId, page, user }: any) {
    return await this.app.bean.role.roleRights({ roleAtomId, page, user });
  }

  async add({ roleAtomId, atomClass, actionCode, scopeSelf, scope, user }: any) {
    if (scopeSelf) {
      scope = 0;
    }
    return await this.app.bean.role.addRoleRight({
      roleAtomId,
      atomClass,
      // atomClassId: _atomClass.id,
      action: actionCode,
      scope,
      user,
    });
  }

  async delete({ roleAtomId, roleRightId, user }: any) {
    return await this.app.bean.role.deleteRoleRight({ roleAtomId, roleRightId, user });
  }

  async spreads({ roleAtomId, page, user }: any) {
    return await this.app.bean.role.roleSpreads({ roleAtomId, page, user });
  }
}
