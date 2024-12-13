import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceMessage extends BeanBase {
  async group({ options, user }: any) {
    return await this.app.bean.message.group({ options, user });
  }
}
