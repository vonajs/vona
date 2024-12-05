import { Virtual } from 'vona';
import { BeanModelCache } from './bean.model/bean.model_cache.js';

@Virtual()
export class BeanModelBase<TRecord extends {} = any, TScopeModule = unknown> extends BeanModelCache<TRecord> {
  get scope() {
    return this.getScope() as TScopeModule;
  }
}
