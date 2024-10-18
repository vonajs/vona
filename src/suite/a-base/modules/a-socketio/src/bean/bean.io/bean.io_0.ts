import { ScopeModule } from '../../resource/this.js';
import { BeanBase, Cast } from 'vona';
import { BeanIo } from '../bean.io.js';

export class BeanIo0 extends BeanBase<ScopeModule> {
  get self() {
    return Cast<BeanIo>(this);
  }

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

  _getBeanMessage(messageClassBase, throwError: boolean = true) {
    return this.localIOInner._getBeanMessage(messageClassBase, throwError);
  }

  _getBeanChannel(channelFullName) {
    return this.localIOInner._getBeanChannel(channelFullName);
  }
}
