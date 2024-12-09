import { BeanBase, IScheduleExecute, IScheduleJobData, Schedule } from 'vona';
import * as Bull from 'bullmq';

@Schedule({ repeat: { every: 3000 } })
export class ScheduleTest extends BeanBase implements IScheduleExecute {
  async execute(job?: Bull.Job<IScheduleJobData>) {
    // todo: job.data
    console.log(
      `----- Schedule Test: iid=${this.ctx.instance.id}, every=${job?.data.jobOptions.repeat.every}, ${new Date()}`,
    );
  }
}
