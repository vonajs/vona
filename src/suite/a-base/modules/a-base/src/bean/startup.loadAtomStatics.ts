import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({ instance: true, debounce: true })
export class StartupLoadAtomStatics extends BeanBase implements IStartupExecute {
  async execute() {
    await this.app.bean.atomStatic.loadAllAtomStatics();
  }
}
