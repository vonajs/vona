import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueOvertime extends BeanBase {
  async execute(context) {
    const _behaviorBean = this.ctx.bean._newBean(`${moduleInfo.relativeName}.flow.behavior.overtime`);
    await _behaviorBean._runJob(context);
  }
}
