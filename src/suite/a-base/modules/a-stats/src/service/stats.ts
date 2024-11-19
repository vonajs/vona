import { BeanBase, Service } from 'vona';

@Service()
export class ServiceStats extends BeanBase {
  async get({ module, name, nameSub, user }: any) {
    return await this.app.bean.stats.get({ module, name, nameSub, user });
  }
}
