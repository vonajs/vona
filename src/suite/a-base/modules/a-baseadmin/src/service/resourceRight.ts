import { BeanBase, Service } from 'vona';

@Service()
export class ServiceResourceRight extends BeanBase {
  async rights({ roleAtomId, page, user }: any) {
    return await this.app.bean.resource.resourceRights({ roleAtomId, page, user });
  }

  async add({ roleAtomId, atomIds, user }: any) {
    return await this.app.bean.resource.addResourceRoles({ roleAtomId, atomIds, user });
  }

  async delete({ roleAtomId, atomId, user }: any) {
    return await this.app.bean.resource.deleteResourceRole({ roleAtomId, atomId, user });
  }

  async spreads({ roleAtomId, page, user }: any) {
    return await this.app.bean.resource.resourceSpreads({ roleAtomId, page, user });
  }
}
