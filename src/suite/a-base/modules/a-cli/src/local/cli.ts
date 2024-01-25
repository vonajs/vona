import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalCli extends BeanBase {
  async meta({ context, user }) {
    return await this.ctx.bean.cli.meta({ context, user });
  }

  async execute({ progressId, context, user }) {
    return await this.ctx.bean.cli.execute({ progressId, context, user });
  }
}
