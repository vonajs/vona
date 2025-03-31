import type { FunctionAsync } from 'vona';
import type { ServiceDbMeta } from '../service/dbMeta.ts';
import { AsyncLocalStorage } from 'node:async_hooks';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanDatabaseAsyncLocalStorage extends BeanBase {
  ctxStorage: AsyncLocalStorage<ServiceDbMeta>;

  get currentDb(): ServiceDbMeta {
    return this.ctxStorage.getStore()!;
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
