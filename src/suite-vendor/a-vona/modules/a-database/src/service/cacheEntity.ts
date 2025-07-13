import type { BeanModelCache } from '../bean/bean.model/bean.model_cache.ts';
import type { ITableRecord } from '../types/onion/table.ts';
import type { TableIdentity } from '../types/tableIdentity.ts';
import { Service } from 'vona-module-a-bean';
import { ModelCacheBase } from '../lib/modelCacheBase.ts';

@Service()
export class ServiceCacheEntity extends ModelCacheBase {
  protected __init__(model: BeanModelCache) {
    super.__init__(model, 'entity');
  }

  public async clear(table?: keyof ITableRecord) {
    if (!this.enabled) return;
    table = table || this._model.getTable('cacheEntityClear', [], undefined);
    const cache = this.getInstance(table);
    await cache.clear();
  }

  public async del(id: TableIdentity | TableIdentity[], table?: keyof ITableRecord) {
    if (!this.enabled) return;
    table = table || this._model.getTable('cacheEntityDel', [id], undefined);
    const cache = this.getInstance(table);
    if (Array.isArray(id)) {
      await cache.mdel(id);
    } else {
      await cache.del(id);
    }
  }
}
