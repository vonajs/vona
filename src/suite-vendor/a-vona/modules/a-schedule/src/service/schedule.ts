import { BeanBase, cast } from 'vona';
import { IDecoratorScheduleOptions, IScheduleExecute, IScheduleRecord, TypeScheduleJob } from '../types/schedule.js';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceSchedule extends BeanBase {
  async execute(scheduleName: keyof IScheduleRecord, job?: TypeScheduleJob) {
    // ignore on test
    if (this.app.meta.isTest) return;
    // check if valid
    if (job && !(await this.checkScheduleValid(job))) {
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

  public async deleteSchedule(job: TypeScheduleJob) {
    const queue = this.$scope.queue.service.queue.getQueue(job.data.queueName, job.data.options!.subdomain);
    const result = await queue.removeJobScheduler(job.name);
    console.log(result);
  }

  public async checkScheduleValid(job: TypeScheduleJob) {
    const scheduleName = job.data.data.scheduleName;
    // schedule: maybe not exists
    const scheduleItem = this.bean.onion.schedule.getOnionSlice(scheduleName);
    if (!scheduleItem) {
      await this.deleteSchedule(job);
      return false;
    }
    // check disable
    if (-1 === this.bean.onion.schedule.getOnionsEnabled().findIndex(item => item.name === scheduleName)) {
      await this.deleteSchedule(job);
      return false;
    }
    // check if changed
    const scheduleConfig = this.app.bean.onion.schedule.getOnionOptions<IDecoratorScheduleOptions>(scheduleName);
    const scheduleHashActive = this.$scope.queue.service.queue.getRepeatKey(
      job.name,
      job.data!.options!.jobOptions!.repeat!,
    );
    const scheduleKeyConfig = this.getScheduleKey(this.ctx.subdomain, scheduleName);
    const scheduleHashConfig = this.$scope.queue.service.queue.getRepeatKey(scheduleKeyConfig, scheduleConfig!.repeat);
    if (scheduleHashActive !== scheduleHashConfig) return false; // not delete schedule
    // ok
    return true;
  }

  public getScheduleKey(subdomain: string, scheduleName: keyof IScheduleRecord) {
    return `${subdomain}.${cast<string>(scheduleName).replace(':', '.schedule.')}`; // not use :
  }

  public async loadSchedules(subdomain?: string) {
    if (subdomain === undefined) subdomain = this.ctx.subdomain;
    for (const scheduleItem of this.bean.onion.schedule.getOnionsEnabled()) {
      const scheduleName = scheduleItem.name;
      // push
      const scheduleKey = this.getScheduleKey(subdomain, scheduleName);
      const scheduleOptions = scheduleItem.beanOptions.options!;
      const queueName = scheduleOptions.queue || 'a-schedule:schedule';
      const queue = this.$scope.queue.service.queue.getQueue(queueName, subdomain);
      const data = this.$scope.queue.service.queue.prepareJobInfo(
        queueName,
        { scheduleName },
        {
          subdomain,
          jobOptions: {
            repeat: scheduleOptions.repeat,
          },
        },
      );
      await queue.upsertJobScheduler(scheduleKey, scheduleOptions.repeat, { data });
    }
  }
}
