import { ScopeModule } from '../../.metadata/this.js';
import { BeanBase, cast } from 'vona';
import { BeanIo } from '../bean.io.js';

export class BeanIo0 extends BeanBase<ScopeModule> {
  get self() {
    return Cast<BeanIo>(this);
  }

  get messageClass() {
    return this.scope.service.messageClass;
  }

  get message() {
    return this.scope.service.message;
  }

  get localRedis() {
    return this.scope.service.redis;
  }

  get localIOInner() {
    return this.scope.service.ioInner;
  }

  _getBeanMessage(messageClassBase, throwError: boolean = true) {
    return this.localIOInner._getBeanMessage(messageClassBase, throwError);
  }

  _getBeanChannel(channelFullName) {
    return this.localIOInner._getBeanChannel(channelFullName);
  }
}
