import { BeanBase, cast, IDecoratorScheduleOptions, IScheduleExecute, IScheduleRecord, Service } from 'vona';
import * as Bull from 'bullmq';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceSchedule extends BeanBase<ScopeModule> {
  async execute(scheduleName: keyof IScheduleRecord, job?: Bull.Job) {
    // ignore on test
    if (this.app.meta.isTest) return;
    // check if valid
    if (job && !this.__checkJobValid(scheduleName, job)) {
      await this.__deleteSchedule(job);
      return;
    }
    // schedule config
    const scheduleItem = this.app.meta.onionSchedule.getMiddlewareItem(scheduleName);
    const scheduleConfig = this.app.meta.onionSchedule.getMiddlewareOptions<IDecoratorScheduleOptions>(scheduleName);
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

  private async __deleteSchedule(job: Bull.Job) {
    const jobKeyActive = this.scope.service.queue.getRepeatKey(job.data.jobName, job.data.jobOptions.repeat);
    const repeat = await cast(job).queue.repeat;
    await repeat.removeRepeatableByKey(jobKeyActive);
  }

  private __checkJobValid(scheduleName: keyof IScheduleRecord, job: Bull.Job) {
    // schedule: maybe not exists
    const scheduleItem = this.app.meta.onionSchedule.getMiddlewareItem(scheduleName);
    if (!scheduleItem) return false;
    // check disable
    if (-1 === this.app.meta.onionSchedule.middlewaresEnabled.findIndex(item => item.name === scheduleName)) {
      return false;
    }
    // check if changed
    const scheduleConfig = this.app.meta.onionSchedule.getMiddlewareOptions<IDecoratorScheduleOptions>(scheduleName);
    const jobKeyActive = this.scope.service.queue.getRepeatKey(job.data.jobName, job.data.jobOptions.repeat);
    const jobNameConfig = this.__getJobName(this.ctx.subdomain, scheduleName);
    const jobKeyConfig = this.scope.service.queue.getRepeatKey(jobNameConfig, scheduleConfig!.repeat);
    if (jobKeyActive !== jobKeyConfig) return false;
    // ok
    return true;
  }

  private __getJobName(subdomain: string, scheduleName: keyof IScheduleRecord) {
    return `${subdomain}.${scheduleName.replace(':', '.schedule.')}`; // not use :
  }

  public async loadSchedules() {
    const instances = await this.bean.instance.list();
    for (const instance of instances) {
      this.loadSchedulesInstance(instance.name);
    }
  }

  public async loadSchedulesInstance(subdomain: string) {
    for (const scheduleItem of this.app.meta.onionSchedule.middlewaresEnabled) {
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
            // jobId,
            repeat: scheduleItem.beanOptions.options!.repeat,
          },
        },
      );
    }
  }
}
