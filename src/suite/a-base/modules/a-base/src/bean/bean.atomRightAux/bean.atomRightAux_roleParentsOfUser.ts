import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomRightAuxRoleWhos } from './bean.atomRightAux_roleWhos.js';

export class BeanAtomRightAuxRoleParentsOfUser extends BeanAtomRightAuxRoleWhos {
  async getRoleParentsOfUser({ userId }: any) {
    // cache
    return await this.self.scope.summerCache.roleParentsOfUser.get({ userId });
  }

  async clearSummer_roleParentsOfUser() {
    await this.self.scope.summerCache.roleParentsOfUser.clear();
  }

  async __getRoleParentsOfUserRaw({ userId }: any) {
    return await this.bean.model.select('aUserRole as a', {
      columns: ['a.roleId', 'b.roleName', 'b.roleTypeCode'],
      joins: [['innerJoin', 'aRole as b', { 'a.roleId': 'b.id' }]],
      where: {
        'a.userId': userId,
      },
      orders: [['a.roleId', 'desc']],
    });
  }
}
