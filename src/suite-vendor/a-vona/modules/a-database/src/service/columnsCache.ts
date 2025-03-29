import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

// const SymbolColumnsCache = Symbol('SymbolColumnsCache');
// const SymbolColumnsDefaultCache = Symbol('SymbolColumnsDefaultCache');

@Service()
export class ServiceColumnsCache extends BeanBase {
  // private [SymbolColumnsCache]:
  // protected __init__(clientNameSelector?: string, clientConfig?: ConfigDatabaseClient) {
  //   this._onDatabaseClientColumnsClearCancel = this.scope.event.databaseClientReload.on(async ({ clientName, clientConfig }, next) => {
  //     if (clientName === this.clientName) {
  //       await this.reload(clientConfig);
  //     }
  //     await next();
  //   });
  // }

  // protected async __dispose__() {
  //   this._onDatabaseClientReloadCancel?.();
  // }
}
