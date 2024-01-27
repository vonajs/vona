import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupLoadSchedules extends BeanBase {
  async execute() {
    await this.app.meta._loadSchedules({ ctx: this.ctx });
  }
}
