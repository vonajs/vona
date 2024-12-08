import { BeanBase, IScheduleExecute, IScheduleExecuteOptions, Schedule } from 'vona';

@Schedule({
  repeat: {
    every: 3000,
  },
})
export class ScheduleTest extends BeanBase implements IScheduleExecute {
  async execute(options: IScheduleExecuteOptions) {
    const job = options.job;
    console.log(
      `----- Schedule Test: iid=${this.ctx.instance.id}, every=${job.data.jobOptions.repeat.every}, ${new Date()}`,
    );
  }
}
