import { BeanBase, Local } from 'vona';

@Local()
export class LocalFlow extends BeanBase {
  async data({ flowId, options, user }: any) {
    return await this.ctx.bean.flowTask.flowData({ flowId, options, user });
  }
}
