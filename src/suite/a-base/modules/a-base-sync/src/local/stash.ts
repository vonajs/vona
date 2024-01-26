module.exports = class Stash {
  constructor() {
    this._caches = {};
  }
  get({ type, key }) {
    const cache = this._prepareCache(type);
    return cache[key];
  }
  set({ type, key, value }) {
    const cache = this._prepareCache(type);
    cache[key] = value;
  }
  remove({ type, key }) {
    const cache = this._prepareCache(type);
    delete cache[key];
  }
  clear({ type }) {
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
};
