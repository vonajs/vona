import { BeanModelBaseInner } from './beanModelBaseInner.js';

export class BeanModelBase extends BeanModelBaseInner {
  get __cacheName() {
    return this.options.cacheName;
  }

  get __cacheKeyAux() {
    return this.options.cacheKeyAux;
  }

  get __cacheNotKey() {
    return this.options.cacheNotKey !== false;
  }

  async mget(ids) {
    if (!this.__cacheExists()) {
      return await this.__mget_select(ids);
    }
    // cache
    const cache = this.__getCacheInstance();
    return await cache.mget(ids, {
      fn_mget: async keys => {
        return await this.__mget_select(keys);
      },
    });
  }

  async get(where, ...args) {
    if (!this.__cacheExists()) {
      return await super.get(where, ...args);
    }
    if (where.id && typeof where.id === 'object') {
      // for example: id: { op: '<', val: flowNodeId },
      return await super.get(where, ...args);
    }
    if (!this.__checkCacheKeyValid(where)) {
      if (this.__cacheNotKey) {
        return await this.__get_notkey(where, ...args);
      }
      return await super.get(where, ...args);
    }
    return await this.__get_key(where, ...args);
  }

  async update(where, ...args) {
    if (!this.__cacheExists()) {
      return await super.update(where, ...args);
    }
    const res = await super.update(where, ...args);
    await this.__deleteCache_key(where);
    return res;
  }

  async delete(where, ...args) {
    if (!this.__cacheExists()) {
      return await super.delete(where, ...args);
    }
    const res = await super.delete(where, ...args);
    await this.__deleteCache_key(where);
    return res;
  }

  async __mget_select(keys) {
    const items = await this.select({
      where: {
        id: keys,
      },
    });
    items.sort((a, b) => {
      const indexA = keys.indexOf(a.id);
      const indexB = keys.indexOf(b.id);
      return indexA - indexB;
    });
    return items;
  }

  async __get_notkey(where, ...args) {
    // cache
    const cache = this.__getCacheInstance();
    const data = await cache.get(where, {
      fn_get: async () => {
        return await super.get(where, { columns: ['id'] });
      },
      ignoreNull: true,
    });
    if (!data) return data;
    // check if exists and valid
    const data2 = await this.__get_key({ id: data.id }, ...args);
    if (data2 && this.__checkCacheNotKeyDataValid(where, data2)) {
      return data2;
    }
    // delete cache
    await this.__deleteCache_notkey(where);
    // get again
    return await this.__get_notkey(where, ...args);
  }

  async __get_key(where, ...args) {
    // cache
    const cache = this.__getCacheInstance();
    return await cache.get(where.id, {
      fn_get: async () => {
        // where: maybe contain aux key
        return await super.get(where, ...args);
      },
    });
  }

  __checkCacheKeyValid(where) {
    let keys = Object.keys(where);
    if (this.__cacheKeyAux) {
      keys = keys.filter(item => item !== this.__cacheKeyAux);
    }
    return keys.length === 1 && keys[0] === 'id';
  }

  __checkCacheNotKeyDataValid(where, data) {
    for (const key in where) {
      const a = where[key];
      const b = data[key];
      if (a && b && typeof a === 'string' && typeof b === 'string') {
        if (a.toLowerCase() !== b.toLowerCase()) return false;
      } else if (typeof a === 'boolean' || typeof b === 'boolean') {
        if (Boolean(a) !== Boolean(b)) return false;
      } else {
        if (a !== b) return false;
      }
    }
    return true;
  }

  async __deleteCache_key(where) {
    if (!where.id) return;
    const cache = this.__getCacheInstance();
    await cache.del(where.id);
  }

  async __deleteCache_notkey(where) {
    const cache = this.__getCacheInstance();
    await cache.del(where);
  }

  __getCacheInstance() {
    return this.ctx.bean.summer.getCache(this.__cacheName);
  }

  async clearCache() {
    if (!this.__cacheExists()) return;
    await this.ctx.bean.summer.clear(this.__cacheName);
  }

  __cacheExists() {
    if (!this.__cacheName) return false;
    const cachaBase = this.ctx.bean.summer._findCacheBase({
      module: this.__cacheName.module,
      name: this.__cacheName.name,
    });
    return !!cachaBase;
  }
}
