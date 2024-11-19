import { BeanBase, Service } from 'vona';

@Service()
export class ServiceMessage extends BeanBase {
  async group({ options, user }: any) {
    return await this.app.bean.message.group({ options, user });
  }
}
