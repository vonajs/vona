import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupOutputHomeRoute extends BeanBase {
  async execute() {
    await this.app.meta._loadSchedules({ ctx: this.ctx });
  }
}
