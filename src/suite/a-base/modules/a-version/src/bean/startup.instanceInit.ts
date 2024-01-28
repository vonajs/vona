import { Bean, BeanBase } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'startup' })
export class StartupInstanceInit extends BeanBase {
  get scope() {
    return this.getScope() as ScopeModule;
  }

  async execute(context) {
    const options = context.options;
    const beanVersion = this.scope.local.version;
    return await beanVersion.instanceInitStartup({ options });
  }
}
