import { Service, BeanBase } from 'vona';

@Service()
export class ServiceStash extends BeanBase {
  _caches: any;

  constructor() {
    super();
    this._caches = {};
  }
  get({ type, key }: any) {
    const cache = this._prepareCache(type);
    return cache[key];
  }
  set({ type, key, value }: any) {
    const cache = this._prepareCache(type);
    cache[key] = value;
  }
  remove({ type, key }: any) {
    const cache = this._prepareCache(type);
    delete cache[key];
  }
  clear({ type }: any) {
    delete this._caches[type];
  }
  reset() {
    this._caches = {};
  }
  _prepareCache(type) {
    let cache = this._caches[type];
    if (!cache) {
      cache = this._caches[type] = {};
    }
    return cache;
  }
}
