import { BeanBase, Local } from 'vona';

@Local()
export class LocalFlow extends BeanBase {
  async select({ options, user }: any) {
    return await this.ctx.bean.flow.select({ options, user });
  }

  async count({ options, user }: any) {
    return await this.ctx.bean.flow.count({ options, user });
  }
}
