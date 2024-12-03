import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Bean({ scene: 'startup' })
export class StartupInstanceInit extends BeanBase<ScopeModule> {
  async execute(context) {
    const options = context.options;
    const beanVersion = this.scope.service.version;
    return await beanVersion.instanceInitStartup(options);
  }
}
