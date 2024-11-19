import { BeanBase, Service } from 'vona';

@Service()
export class ServiceProgress extends BeanBase {
  async check({ progressId, counter, user }: any) {
    return await this.app.bean.progress.check({ progressId, counter, user });
  }

  async abort({ progressId, user }: any) {
    return await this.app.bean.progress.abort({ progressId, user });
  }

  async delete({ progressId, user }: any) {
    return await this.app.bean.progress.delete({ progressId, user });
  }
}
