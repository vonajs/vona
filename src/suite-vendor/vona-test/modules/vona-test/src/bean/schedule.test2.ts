import type { IScheduleExecute, TypeScheduleJob } from 'vona-module-a-schedule';
import { BeanBase } from 'vona';
import { Schedule } from 'vona-module-a-schedule';

@Schedule({ enable: false, repeat: { every: 5000 } })
export class ScheduleTest2 extends BeanBase implements IScheduleExecute {
  async execute(job?: TypeScheduleJob) {
    // eslint-disable-next-line
    console.log(
      `----- Schedule Test2: iid=${this.ctx.instance.id}, every=${job?.data.options?.jobOptions?.repeat?.every}, ${new Date()}`,
    );
  }
}
