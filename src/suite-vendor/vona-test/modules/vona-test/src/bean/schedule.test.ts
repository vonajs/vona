import { Bean, BeanBase } from 'vona';

@Schedule({ scene: 'schedule' })
export class ScheduleTest extends BeanBase {
  async execute(context) {
    const job = context.job;
    console.log(
      `----- Schedule Test: iid=${this.ctx.instance.id}, every=${job.data.jobOptions.repeat.every}, ${new Date()}`,
    );
  }
}
