import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({ dependencies: 'a-version:databaseInit' })
export class StartupDatabaseName extends BeanBase implements IStartupExecute {
  async execute() {
    return await this.scope.service.database.databaseNameStartup();
  }
}
