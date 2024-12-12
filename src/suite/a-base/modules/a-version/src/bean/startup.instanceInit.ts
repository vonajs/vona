import { BeanBase, IInstanceStartupOptions, IStartupExecute, Startup } from 'vona';

@Startup({ instance: true, debounce: true })
export class StartupInstanceInit extends BeanBase implements IStartupExecute {
  async execute(options?: IInstanceStartupOptions) {
    const beanVersion = this.scope.service.version;
    return await beanVersion.instanceInitStartup(options);
  }
}
