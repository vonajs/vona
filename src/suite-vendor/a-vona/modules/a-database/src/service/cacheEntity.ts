import type { BeanModelCache } from '../bean/bean.model/bean.model_cache.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceCacheEntity extends BeanBase {
  private _model: BeanModelCache;

  protected __init__(model: BeanModelCache) {
    this._model = model;
  }
}
