import { BeanBase } from 'vona';
import { type IScheduleExecute, Schedule, type TypeScheduleJob } from 'vona-module-a-schedule';

@Schedule({ enable: false, repeat: { every: 5000 } })
export class ScheduleTest2 extends BeanBase implements IScheduleExecute {
  async execute(job?: TypeScheduleJob) {
    console.log(
      `----- Schedule Test2: iid=${this.ctx.instance.id}, every=${job?.data.options?.jobOptions?.repeat?.every}, ${new Date()}`,
    );
  }
}
