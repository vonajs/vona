import { Bean, BeanBase } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'startup' })
export class StartupDatabaseName extends BeanBase<ScopeModule> {
  async execute() {
    const beanVersion = this.scope.local.version;
    return await beanVersion.databaseNameStartup();
  }
}
