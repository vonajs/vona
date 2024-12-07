import { BeanBase, Startup } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Startup({ debounce: true, dependencies: 'a-version:workerAlive' })
export class StartupDatabaseInit extends BeanBase<ScopeModule> {
  async execute() {
    return await this.scope.service.database.databaseInitStartup();
  }
}
