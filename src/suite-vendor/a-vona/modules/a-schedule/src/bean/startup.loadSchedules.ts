import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({
  instance: true,
  debounce: true,
  after: true,
})
export class StartupLoadSchedules extends BeanBase implements IStartupExecute {
  async execute() {
    await this.$scope.schedule.service.schedule.loadSchedules();
  }
}
