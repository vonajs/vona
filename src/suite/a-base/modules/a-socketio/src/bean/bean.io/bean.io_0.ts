import { BeanBase, cast } from 'vona';
import { BeanIo } from '../bean.io.js';

export class BeanIo0 extends BeanBase {
  protected get self() {
    return cast<BeanIo>(this);
  }

  get messageClass() {
    return this.self.scope.service.messageClass;
  }

  get message() {
    return this.self.scope.service.message;
  }

  get localRedis() {
    return this.self.scope.service.redis;
  }

  get localIOInner() {
    return this.self.scope.service.ioInner;
  }

  _getBeanMessage(messageClassBase, throwError: boolean = true) {
    return this.localIOInner._getBeanMessage(messageClassBase, throwError);
  }

  _getBeanChannel(channelFullName) {
    return this.localIOInner._getBeanChannel(channelFullName);
  }
}
