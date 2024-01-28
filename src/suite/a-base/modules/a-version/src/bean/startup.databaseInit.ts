import { Bean, BeanBase } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'startup' })
export class StartupDatabaseInit extends BeanBase {
  get scope() {
    return this.getScope() as ScopeModule;
  }

  async execute() {
    const beanVersion = this.scope.local.version;
    return await beanVersion.databaseInitStartup();
  }
}
