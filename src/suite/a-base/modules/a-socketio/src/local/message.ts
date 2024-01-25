import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalMessage extends BeanBase {
  async offset({ messageClass, options, user }) {
    return await this.ctx.bean.io.message.offset({ messageClass, options, user });
  }

  async select({ messageClass, options, user }) {
    return await this.ctx.bean.io.message.select({ messageClass, options, user });
  }

  async count({ messageClass, options, user }) {
    return await this.ctx.bean.io.message.count({ messageClass, options, user });
  }

  async setRead({ messageClass, messageIds, all, user }) {
    return await this.ctx.bean.io.message.setRead({ messageClass, messageIds, all, user });
  }

  async delete({ messageIds, user }) {
    return await this.ctx.bean.io.message.delete({ messageIds, user });
  }
}
