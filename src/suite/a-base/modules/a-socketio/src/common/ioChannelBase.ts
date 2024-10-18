import { BeanBase } from 'vona';

export class BeanIoChannelBase<T = unknown> extends BeanBase<T> {
  async onPush(/* content, options, message, messageSync, messageClass*/ _params: any) {
    return false;
  }
}
