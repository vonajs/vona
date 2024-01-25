import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aAtomClass',
  options: {
    disableDeleted: false,
    cacheName: { name: 'modelAtomClass' },
  },
})
export class ModelAtomClass extends BeanModelBase {
  // array of object/number
  async mget(ids) {
    if (ids.length === 0) return [];
    // array of number
    if (typeof ids[0] !== 'object') {
      return await super.mget(ids);
    }
    // array of object
    const result = [];
    for (const atomClass of ids) {
      result.push(await this.get(atomClass));
    }
    return result;
  }

  async get(where, ...args) {
    // id
    if (where.id) {
      return await super.get({ id: where.id }, ...args);
    }
    // module/atomClassName
    if (where.module && where.atomClassName) {
      // cache
      const cache = this.__getCacheInstance();
      return await cache.get(where, {
        fn_get: async key => {
          return await super.get(key, ...args);
        },
      });
    }
    // others
    return await super.get(where, ...args);
  }
}
