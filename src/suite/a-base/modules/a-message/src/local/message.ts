import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalMessage extends BeanBase {
  async group({ options, user }) {
    return await this.ctx.bean.message.group({ options, user });
  }
}
