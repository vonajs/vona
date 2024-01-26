import { BeanBase } from '@cabloy/core';

export class BeanIo0 extends BeanBase {
  get messageClass() {
    return this.ctx.bean.local.module(__ThisModule__).messageClass;
  }

  get message() {
    return this.ctx.bean.local.module(__ThisModule__).message;
  }

  get localRedis() {
    return this.ctx.bean.local.module(__ThisModule__).redis;
  }

  get localIOInner() {
    return this.ctx.bean.local.module(__ThisModule__).ioInner;
  }

  _getBeanMessage(messageClassBase) {
    return this.localIOInner._getBeanMessage(messageClassBase);
  }

  _getBeanChannel(channelFullName) {
    return this.localIOInner._getBeanChannel(channelFullName);
  }
}
