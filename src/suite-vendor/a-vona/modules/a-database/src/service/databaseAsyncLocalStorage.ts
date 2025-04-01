import type { FunctionAsync } from 'vona';
import { AsyncLocalStorage } from 'node:async_hooks';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { ServiceDb } from '../service/db.ts';

@Service()
export class ServiceDatabaseAsyncLocalStorage extends BeanBase {
  ctxStorage: AsyncLocalStorage<ServiceDb>;

  get current(): ServiceDb {
    return this.ctxStorage.getStore()!;
  }

  async run<RESULT>(store: ServiceDb, fn: FunctionAsync<RESULT>): Promise<RESULT> {
    if (store === this.current) {
      return fn();
    }
    return this.ctxStorage.run(store, () => {
      return fn();
    });
  }
}
