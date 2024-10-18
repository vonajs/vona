import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'startup' })
export class StartupInstanceInit extends BeanBase<ScopeModule> {
  async execute(context) {
    const options = context.options;
    const beanVersion = this.scope.local.version;
    return await beanVersion.instanceInitStartup({ options });
  }
}
