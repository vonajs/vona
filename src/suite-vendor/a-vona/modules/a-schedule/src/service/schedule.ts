import { BeanBase, cast, deepExtend } from 'vona';
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

  public async deleteSchedule(scheduleName: keyof IScheduleRecord): Promise<boolean>;
  public async deleteSchedule(job: TypeScheduleJob): Promise<boolean>;
  public async deleteSchedule(job: TypeScheduleJob | string): Promise<boolean> {
    if (typeof job === 'string') {
      const scheduleName = cast<keyof IScheduleRecord>(job);
      const scheduleItem = this.bean.onion.schedule.onionsNormal[scheduleName];
      const scheduleKey = this.getScheduleKey(this.ctx.subdomain, scheduleName);
      const scheduleOptions = scheduleItem.beanOptions.options!;
      const queueName = scheduleOptions.queue || 'a-schedule:schedule';
      const queue = this.$scope.queue.service.queue.getQueue(queueName, this.ctx.subdomain);
      return await queue.removeJobScheduler(scheduleKey);
    } else {
      const queue = this.$scope.queue.service.queue.getQueue(job.data.queueName, job.data.options!.subdomain);
      return await queue.removeJobScheduler(job.name);
    }
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
    if (scheduleHashActive !== scheduleHashConfig) {
      // todo: to be considered, maybe not do delete/add
      await this.deleteSchedule(job);
      await this.addSchedule(scheduleName, job.data.options!.subdomain);
      return false;
    }
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
      await this.addSchedule(scheduleName, subdomain);
    }
  }

  public async addSchedule(scheduleName: keyof IScheduleRecord, subdomain?: string) {
    if (subdomain === undefined) subdomain = this.ctx.subdomain;
    const scheduleItem = this.bean.onion.schedule.getOnionSlice(scheduleName);
    if (!scheduleItem) return;
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
        queueNameSub: scheduleName,
        jobOptions: {
          repeat: scheduleOptions.repeat,
        },
      },
    );
    const templateOptions = deepExtend({}, this.scope.config.schedule.templateOptions, scheduleOptions.templateOptions);
    await queue.upsertJobScheduler(scheduleKey, scheduleOptions.repeat, {
      name: scheduleKey,
      data,
      opts: templateOptions,
    });
  }
}
