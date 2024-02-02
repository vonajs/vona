import { ScopeModule, __ThisModule__ } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';

export class BeanIo0 extends BeanBase<ScopeModule> {
  get messageClass() {
    return this.scope.local.messageClass;
  }

  get message() {
    return this.scope.local.message;
  }

  get localRedis() {
    return this.scope.local.redis;
  }

  get localIOInner() {
    return this.scope.local.ioInner;
  }

  _getBeanMessage(messageClassBase) {
    return this.localIOInner._getBeanMessage(messageClassBase);
  }

  _getBeanChannel(channelFullName) {
    return this.localIOInner._getBeanChannel(channelFullName);
  }
}
