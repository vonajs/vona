import { BeanBase, Service } from 'vona';

@Service()
export class ServiceFlow extends BeanBase {
  async select({ options, user }: any) {
    return await this.app.bean.flow.select({ options, user });
  }

  async count({ options, user }: any) {
    return await this.app.bean.flow.count({ options, user });
  }
}
