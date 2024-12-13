import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceUser extends BeanBase {
  async select({ query, page, user }: any) {
    return await this.app.bean.user.selectGeneral({ params: { query, page }, user });
  }

  async userRoles({ userAtomId, page, user }: any) {
    return await this.app.bean.role.userRoles({ userAtomId, page, user });
  }

  async addUserRole({ userAtomId, roleId, user }: any) {
    return await this.app.bean.role.addUserRole({ userAtomId, roleId, user });
  }

  async deleteUserRole({ userAtomId, roleId, user }: any) {
    return await this.app.bean.role.deleteUserRole({ userAtomId, roleId, user });
  }

  async atomRights({ userAtomId, page, user }: any) {
    return await this.app.bean.role.atomRightsOfUser({ userAtomId, page, user });
  }

  async resourceRights({ userAtomId, page, user }: any) {
    return await this.app.bean.resource.resourceRightsOfUser({ userAtomId, page, user });
  }
}
