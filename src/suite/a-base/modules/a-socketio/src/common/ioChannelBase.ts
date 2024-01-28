import { BeanBase } from 'cabloy-module-api-a-base';

export class BeanIoChannelBase extends BeanBase {
  async onPush(/* content, options, message, messageSync, messageClass*/ _params: any) {
    return false;
  }
}
