import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalFlow extends BeanBase {
  async data({ flowId, options, user }: any) {
    return await this.ctx.bean.flowTask.flowData({ flowId, options, user });
  }
}
