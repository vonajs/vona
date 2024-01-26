import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueSchedule extends BeanBase {
  async execute(context) {
    await this.app.meta._runSchedule(context);
  }
}
