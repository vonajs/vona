import type { FunctionAsync } from 'vona';
import type { IDbInfo } from '../types/database.ts';
import { AsyncLocalStorage } from 'node:async_hooks';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDbMeta } from '../service/dbMeta.ts';

@Bean()
export class BeanDatabaseAsyncLocalStorage extends BeanBase {
  ctxStorage: AsyncLocalStorage<ServiceDbMeta>;

  get currentDb(): ServiceDbMeta {
    return this.ctxStorage.getStore()!;
  }

  async newDb<RESULT>(dbInfo: IDbInfo | undefined, fn: FunctionAsync<RESULT>): Promise<RESULT> {
    if (!dbInfo) return fn();
    const db = this.bean.database.createDbMeta(dbInfo.level, dbInfo.clientName);
    return this.run(db, fn);
  }

  async run<RESULT>(store: ServiceDbMeta, fn: FunctionAsync<RESULT>): Promise<RESULT> {
    if (store === this.currentDb) {
      return fn();
    }
    return this.ctxStorage.run(store, () => {
      return fn();
    });
  }
}
