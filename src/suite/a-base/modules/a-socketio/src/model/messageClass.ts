import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityMessageClass } from '../entity/messageClass.js';

@Model({
  table: 'aSocketIOMessageClass',
  options: {
    disableDeleted: false,
  },
})
export class ModelMessageClass extends BeanModelBase<EntityMessageClass> {
  // array of object/number
  async mget(ids) {
    if (ids.length === 0) return [];
    // array of number
    if (typeof ids[0] !== 'object') {
      return await super.mget(ids);
    }
    // array of object
    const result: any[] = [];
    for (const messageClass of ids) {
      result.push(await this.get(messageClass));
    }
    return result;
  }

  async get(where, ...args) {
    // id
    if (where.id) {
      return await super.get({ id: where.id }, ...args);
    }
    // module/messageClassName
    if (where.module && where.messageClassName) {
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
