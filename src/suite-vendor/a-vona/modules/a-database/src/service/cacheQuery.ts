import type { BeanModelCache } from '../bean/bean.model/bean.model_cache.ts';
import { Service } from 'vona-module-a-bean';
import { ModelCacheBase } from '../lib/modelCacheBase.ts';

@Service()
export class ServiceCacheQuery extends ModelCacheBase {
  protected __init__(model: BeanModelCache) {
    super.__init__(model, 'query');
  }
}
