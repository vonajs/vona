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
    await this.__clear_raw(table);
    // modelsClear
    const modelsClear = this._model.options.cache?.modelsClear;
    if (!modelsClear) return;
    const modelsClear2 = Array.isArray(modelsClear) ? modelsClear : [modelsClear];
    for (const modelClear of modelsClear2) {

    }
  }

  public async __clear_raw(table?: keyof ITableRecord) {
    if (!this.enabled) return;
    table = table || this._model.getTable();
    const cache = this.getInstance(table);
    await cache.clear();
  }
}
