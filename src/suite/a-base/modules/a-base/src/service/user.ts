import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceUser extends BeanBase {
  async getLabels({ user }: any) {
    return await this.app.bean.atom.getLabels({ user });
  }

  async setLabels({ labels, user }: any) {
    return await this.app.bean.atom.setLabels({ labels, user });
  }
}
