import type { FunctionAsync } from 'vona';
import { AsyncLocalStorage } from 'node:async_hooks';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { ServiceDbMeta } from '../service/dbMeta.ts';

@Service()
export class ServiceDatabaseAsyncLocalStorage extends BeanBase {
  ctxStorage: AsyncLocalStorage<ServiceDbMeta>;

  get current(): ServiceDbMeta {
    return this.ctxStorage.getStore()!;
  }

  async run<RESULT>(store: ServiceDbMeta, fn: FunctionAsync<RESULT>): Promise<RESULT> {
    if (store === this.current) {
      return fn();
    }
    return this.ctxStorage.run(store, () => {
      return fn();
    });
  }
}
