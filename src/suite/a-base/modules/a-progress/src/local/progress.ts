import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalProgress extends BeanBase {
  async check({ progressId, counter, user }: any) {
    return await this.ctx.bean.progress.check({ progressId, counter, user });
  }

  async abort({ progressId, user }: any) {
    return await this.ctx.bean.progress.abort({ progressId, user });
  }

  async delete({ progressId, user }: any) {
    return await this.ctx.bean.progress.delete({ progressId, user });
  }
}
