import { BeanBase, IStartupExecute, Startup } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Startup({ dependencies: 'a-version:databaseInit' })
export class StartupDatabaseName extends BeanBase<ScopeModule> implements IStartupExecute {
  async execute() {
    return await this.scope.service.database.databaseNameStartup();
  }
}
