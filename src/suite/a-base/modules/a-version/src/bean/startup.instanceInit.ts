import { BeanBase, IInstanceStartupOptions, IStartupExecute, Startup } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Startup({ instance: true, debounce: true })
export class StartupInstanceInit extends BeanBase<ScopeModule> implements IStartupExecute {
  async execute(options?: IInstanceStartupOptions) {
    const beanVersion = this.scope.service.version;
    return await beanVersion.instanceInitStartup(options);
  }
}
