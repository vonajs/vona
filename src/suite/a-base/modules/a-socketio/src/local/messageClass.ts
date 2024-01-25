import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalMessageClass extends BeanBase {
  async messageClass({ messageClass }) {
    return await this.ctx.bean.io.messageClass.get(messageClass);
  }
}
