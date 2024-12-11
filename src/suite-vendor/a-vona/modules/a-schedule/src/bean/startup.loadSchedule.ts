import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({
  instance: true,
  debounce: true,
  after: true,
})
export class StartupLoadSchedule extends BeanBase implements IStartupExecute {
  async execute() {
    await this.$scope.schedule.service.schedule.loadSchedules(this.ctx.subdomain);
  }
}
