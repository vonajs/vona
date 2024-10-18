import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'queue' })
export class QueueSchedule extends BeanBase {
  async execute(context) {
    await this.app.meta._runSchedule(context);
  }
}
