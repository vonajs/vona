import { BeanBase, cast } from 'vona';
import { IDecoratorScheduleOptions, IScheduleExecute, IScheduleRecord, TypeScheduleJob } from '../types/schedule.js';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceSchedule extends BeanBase {
  async execute(scheduleName: keyof IScheduleRecord, job?: TypeScheduleJob) {
    // ignore on test
    if (this.app.meta.isTest) return;
    // check if valid
    if (job && !this.__checkJobValid(scheduleName, job)) {
      await this.__deleteSchedule(job);
      return;
    }
    // schedule config
    const scheduleItem = this.bean.onion.schedule.getOnionSlice(scheduleName);
    const scheduleConfig = this.bean.onion.schedule.getOnionOptions<IDecoratorScheduleOptions>(scheduleName);
    // execute
    return await this.bean.executor.newCtx(
      async () => {
        const beanFullName = scheduleItem.beanOptions.beanFullName;
        const beanInstance = <IScheduleExecute>this.app.bean._getBean(beanFullName as any);
        return await beanInstance.execute(job);
      },
      {
        transaction: scheduleConfig?.transaction,
        instance: true,
      },
    );
  }

  private async __deleteSchedule(job: TypeScheduleJob) {
    const jobKeyActive = this.$scope.queue.service.queue.getRepeatKey(job.name, job.opts.repeat!);
    const repeat = await cast(job).queue.repeat;
    await repeat.removeRepeatableByKey(jobKeyActive);
  }

  private __checkJobValid(scheduleName: keyof IScheduleRecord, job: TypeScheduleJob) {
    // schedule: maybe not exists
    const scheduleItem = this.bean.onion.schedule.getOnionSlice(scheduleName);
    if (!scheduleItem) return false;
    // check disable
    if (-1 === this.bean.onion.schedule.getOnionsEnabled().findIndex(item => item.name === scheduleName)) {
      return false;
    }
    // check if changed
    const scheduleConfig = this.app.bean.onion.schedule.getOnionOptions<IDecoratorScheduleOptions>(scheduleName);
    const jobKeyActive = this.$scope.queue.service.queue.getRepeatKey(
      job.data!.options!.jobName!,
      job.data!.options!.jobOptions!.repeat!,
    );
    const jobNameConfig = this.__getJobName(this.ctx.subdomain, scheduleName);
    const jobKeyConfig = this.$scope.queue.service.queue.getRepeatKey(jobNameConfig, scheduleConfig!.repeat);
    if (jobKeyActive !== jobKeyConfig) return false;
    // ok
    return true;
  }

  private __getJobName(subdomain: string, scheduleName: keyof IScheduleRecord) {
    return `${subdomain}.${cast<string>(scheduleName).replace(':', '.schedule.')}`; // not use :
  }

  public async loadSchedules(subdomain?: string) {
    if (subdomain === undefined) subdomain = this.ctx.subdomain;
    for (const scheduleItem of this.bean.onion.schedule.getOnionsEnabled()) {
      const scheduleName = scheduleItem.name;
      // push
      const jobName = this.__getJobName(subdomain, scheduleName);
      this.scope.queue.schedule.push(
        { scheduleName },
        {
          subdomain,
          queueNameSub: scheduleName,
          jobName,
          jobOptions: {
            jobId: jobName,
            repeat: scheduleItem.beanOptions.options!.repeat,
          },
        },
      );
    }
  }
}
