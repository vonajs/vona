import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({ debounce: true, after: true })
export class StartupLoadSchedules extends BeanBase implements IStartupExecute {
  async execute() {
    await this.app.meta._loadSchedules();
  }
}
