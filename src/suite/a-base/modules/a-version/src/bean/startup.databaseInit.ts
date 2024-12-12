import { BeanBase, Startup } from 'vona';

@Startup({ debounce: true, dependencies: 'a-version:workerAlive' })
export class StartupDatabaseInit extends BeanBase {
  async execute() {
    return await this.scope.service.database.databaseInitStartup();
  }
}
