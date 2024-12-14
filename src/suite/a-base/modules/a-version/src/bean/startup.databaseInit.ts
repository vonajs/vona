import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ debounce: true, dependencies: 'a-version:workerAlive' })
export class StartupDatabaseInit extends BeanBase implements IStartupExecute {
  async execute() {
    return await this.scope.service.database.databaseInitStartup();
  }
}
