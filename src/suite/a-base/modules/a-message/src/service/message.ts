import { BeanBase, Local } from 'vona';

@Local()
export class LocalMessage extends BeanBase {
  async group({ options, user }: any) {
    return await this.ctx.bean.message.group({ options, user });
  }
}
