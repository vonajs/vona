import { BeanBase } from 'vona';
import { type IScheduleExecute, Schedule, type TypeScheduleJob } from 'vona-module-a-schedule';

@Schedule({ enable: false, repeat: { every: 3000 } })
export class ScheduleTest extends BeanBase implements IScheduleExecute {
  async execute(job?: TypeScheduleJob) {
    // eslint-disable-next-line
    console.log(
      `----- Schedule Test: iid=${this.ctx.instance.id}, every=${job?.data.options?.jobOptions?.repeat?.every}, ${new Date()}`,
    );
  }
}
