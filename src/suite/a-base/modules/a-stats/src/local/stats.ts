import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalStats extends BeanBase {
  async get({ module, name, nameSub, user }) {
    return await this.ctx.bean.stats.get({ module, name, nameSub, user });
  }
}
