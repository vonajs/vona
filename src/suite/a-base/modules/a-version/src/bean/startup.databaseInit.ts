import { Bean, BeanBase } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'startup' })
export class StartupDatabaseInit extends BeanBase<ScopeModule> {
  async execute() {
    return await this.scope.local.database.databaseInitStartup();
  }
}
