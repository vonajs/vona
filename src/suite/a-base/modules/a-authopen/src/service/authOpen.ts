import { BeanBase, Service } from 'vona';

@Service()
export class ServiceAuthOpen extends BeanBase {
  async hideClientSecret({ key, user }: any) {
    return await this.ctx.bean.authOpen.hideClientSecret({
      atomId: key.atomId,
      itemId: key.itemId,
      user,
    });
  }

  async resetClientSecret({ key, user }: any) {
    return await this.ctx.bean.authOpen.resetClientSecret({
      atomId: key.atomId,
      itemId: key.itemId,
      user,
    });
  }
}
