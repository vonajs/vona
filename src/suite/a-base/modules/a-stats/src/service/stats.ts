import { BeanBase, Local } from 'vona';

@Local()
export class LocalStats extends BeanBase {
  async get({ module, name, nameSub, user }: any) {
    return await this.ctx.bean.stats.get({ module, name, nameSub, user });
  }
}
