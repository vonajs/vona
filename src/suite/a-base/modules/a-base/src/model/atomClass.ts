import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAtomClass } from '../entity/atomClass.js';

@Model({
  table: 'aAtomClass',
  options: {
    disableDeleted: false,
  },
})
export class ModelAtomClass extends BeanModelBase<EntityAtomClass> {
  // array of object/number
  async mget(ids) {
    if (ids.length === 0) return [];
    // array of number
    if (typeof ids[0] !== 'object') {
      return await super.mget(ids);
    }
    // array of object
    const result: any[] = [];
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
