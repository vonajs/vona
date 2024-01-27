import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalResourceRight extends BeanBase {
  async rights({ roleAtomId, page, user }: any) {
    return await this.ctx.bean.resource.resourceRights({ roleAtomId, page, user });
  }

  async add({ roleAtomId, atomIds, user }: any) {
    return await this.ctx.bean.resource.addResourceRoles({ roleAtomId, atomIds, user });
  }

  async delete({ roleAtomId, atomId, user }: any) {
    return await this.ctx.bean.resource.deleteResourceRole({ roleAtomId, atomId, user });
  }

  async spreads({ roleAtomId, page, user }: any) {
    return await this.ctx.bean.resource.resourceSpreads({ roleAtomId, page, user });
  }
}
