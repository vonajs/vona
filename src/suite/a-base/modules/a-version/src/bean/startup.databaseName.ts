import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'startup' })
export class StartupDatabaseName extends BeanBase<ScopeModule> {
  async execute() {
    return await this.scope.local.database.databaseNameStartup();
  }
}
