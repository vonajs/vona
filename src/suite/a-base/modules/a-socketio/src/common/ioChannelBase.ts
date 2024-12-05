import { BeanBase } from 'vona';

export class BeanIoChannelBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  async onPush(/* content, options, message, messageSync, messageClass*/ _params: any) {
    return false;
  }
}
