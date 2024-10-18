import { BeanBase, Local } from 'vona';

@Local()
export class LocalUser extends BeanBase {
  async getLabels({ user }: any) {
    return await this.ctx.bean.atom.getLabels({ user });
  }

  async setLabels({ labels, user }: any) {
    return await this.ctx.bean.atom.setLabels({ labels, user });
  }
}
