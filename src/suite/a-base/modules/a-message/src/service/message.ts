import { BeanBase, Service } from 'vona';

@Service()
export class ServiceMessage extends BeanBase {
  async group({ options, user }: any) {
    return await this.ctx.bean.message.group({ options, user });
  }
}
