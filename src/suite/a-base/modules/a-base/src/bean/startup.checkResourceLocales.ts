import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ instance: true, debounce: true, dependencies: 'a-base:loadAtomStatics' })
export class StartupCheckResourceLocales extends BeanBase implements IStartupExecute {
  async execute() {
    await this.app.bean.resource.checkLocales();
  }
}
