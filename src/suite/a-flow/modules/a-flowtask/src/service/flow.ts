import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceFlow extends BeanBase {
  async data({ flowId, options, user }: any) {
    return await this.app.bean.flowTask.flowData({ flowId, options, user });
  }
}
