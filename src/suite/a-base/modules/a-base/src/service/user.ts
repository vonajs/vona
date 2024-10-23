import { BeanBase, Service } from 'vona';

@Service()
export class ServiceUser extends BeanBase {
  async getLabels({ user }: any) {
    return await this.ctx.bean.atom.getLabels({ user });
  }

  async setLabels({ labels, user }: any) {
    return await this.ctx.bean.atom.setLabels({ labels, user });
  }
}
