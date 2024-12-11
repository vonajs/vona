import { BeanBase, Schedule } from 'vona';
import { IScheduleExecute, TypeScheduleJob } from 'vona-module-a-schedule';

@Schedule({ enable: false, repeat: { every: 3000 } })
export class ScheduleTest extends BeanBase implements IScheduleExecute {
  async execute(job?: TypeScheduleJob) {
    // todo: job.data
    console.log(
      `----- Schedule Test: iid=${this.ctx.instance.id}, every=${job?.data.options?.jobOptions?.repeat?.every}, ${new Date()}`,
    );
  }
}
