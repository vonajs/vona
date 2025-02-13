import { BeanBase } from 'vona';
import { type IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ debounce: true })
export class StartupDatabaseInit extends BeanBase implements IStartupExecute {
  async execute() {
    return await this.scope.service.database.databaseInitStartup();
  }
}
