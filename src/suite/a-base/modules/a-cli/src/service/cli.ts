import { BeanBase, Service } from 'vona';

@Service()
export class ServiceCli extends BeanBase {
  async meta({ context, user }: any) {
    return await this.app.bean.cli.meta({ context, user });
  }

  async execute({ progressId, context, user }: any) {
    return await this.app.bean.cli.execute({ progressId, context, user });
  }
}
