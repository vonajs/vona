import { __ThisModule__ } from '../../resource/this.js';
import { BeanAtomRightAuxRoleWhos } from './bean.atomRightAux_roleWhos.js';

export class BeanAtomRightAuxRoleParentsOfUser extends BeanAtomRightAuxRoleWhos {
  async getRoleParentsOfUser({ userId }: any) {
    // cache
    return await this.ctx.bean.summer.get({ module: __ThisModule__, name: 'roleParentsOfUser' }, { userId });
  }

  async clearSummer_roleParentsOfUser() {
    await this.ctx.bean.summer.clear({ module: __ThisModule__, name: 'roleParentsOfUser' });
  }

  async __getRoleParentsOfUserRaw({ userId }: any) {
    return await this.bean.model.query(
      `
          select a.roleId,b.roleName,b.roleTypeCode from aUserRole a
            inner join aRole b on a.roleId=b.id
            where a.iid=? and a.userId=?
            order by a.roleId desc
        `,
      [this.ctx.instance.id, userId],
    );
  }
}
