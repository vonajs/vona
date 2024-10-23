import { BeanBase, Service } from 'vona';

@Service()
export class ServiceFlow extends BeanBase {
  async data({ flowId, options, user }: any) {
    return await this.ctx.bean.flowTask.flowData({ flowId, options, user });
  }
}
