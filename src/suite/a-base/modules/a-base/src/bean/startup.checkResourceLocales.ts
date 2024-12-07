import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({ instance: true, debounce: true, dependencies: 'a-base:loadAtomStatics' })
export class StartupCheckResourceLocales extends BeanBase implements IStartupExecute {
  async execute() {
    await this.app.bean.resource.checkLocales();
  }
}
