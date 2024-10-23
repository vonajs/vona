import { BeanBase, Local } from 'vona';

@Local()
export class LocalCli extends BeanBase {
  async meta({ context, user }: any) {
    return await this.ctx.bean.cli.meta({ context, user });
  }

  async execute({ progressId, context, user }: any) {
    return await this.ctx.bean.cli.execute({ progressId, context, user });
  }
}
