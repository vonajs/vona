import { BeanBase } from '@cabloy/core';

export class BeanIoChannelBase extends BeanBase {
  async onPush(/* content, options, message, messageSync, messageClass*/ _params: any) {
    return false;
  }
}
