import { BeanModelCache } from './bean.model_cache.js';

export class BeanModelBase<TRecord extends {} = any, TScopeModule = unknown> extends BeanModelCache<TRecord> {
  get scope() {
    return this.getScope() as TScopeModule;
  }
}
