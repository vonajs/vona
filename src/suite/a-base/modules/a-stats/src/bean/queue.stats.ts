import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'queue' })
export class QueueStats extends BeanBase {
  async execute(context) {
    const data = context.data;
    return await this.ctx.bean.stats._notify_queue(data);
  }
}
