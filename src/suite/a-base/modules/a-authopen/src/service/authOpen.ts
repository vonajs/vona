import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceAuthOpen extends BeanBase {
  async hideClientSecret({ key, user }: any) {
    return await this.app.bean.authOpen.hideClientSecret({
      atomId: key.atomId,
      itemId: key.itemId,
      user,
    });
  }

  async resetClientSecret({ key, user }: any) {
    return await this.app.bean.authOpen.resetClientSecret({
      atomId: key.atomId,
      itemId: key.itemId,
      user,
    });
  }
}
