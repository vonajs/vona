import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalMessage extends BeanBase {
  async group({ options, user }: any) {
    return await this.ctx.bean.message.group({ options, user });
  }
}
