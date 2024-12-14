import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ instance: true, debounce: true })
export class StartupLoadAtomStatics extends BeanBase implements IStartupExecute {
  async execute() {
    await this.app.bean.atomStatic.loadAllAtomStatics();
  }
}
