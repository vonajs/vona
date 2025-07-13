import type { BeanModelCache } from '../bean/bean.model/bean.model_cache.ts';
import type { ITableRecord } from '../types/onion/table.ts';
import { Service } from 'vona-module-a-bean';
import { ModelCacheBase } from '../lib/modelCacheBase.ts';

@Service()
export class ServiceCacheQuery extends ModelCacheBase {
  protected __init__(model: BeanModelCache) {
    super.__init__(model, 'query');
  }

  public async clear(table?: keyof ITableRecord) {
    if (!this.enabled) return;
    table = table || this._model.getTable('cacheQueryClear', [], undefined);
    const cache = this.getInstance(table);
    await cache.clear();
  }
}
