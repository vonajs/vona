import { Bean, BeanBase } from '@cabloy/core';
import type { IModuleConfigSummerCacheBase } from 'cabloy-module-api-a-summer';

@Bean({ scene: 'summer.cache' })
export class SummerCacheTest extends BeanBase {
  _cacheBase: IModuleConfigSummerCacheBase;

  constructor(cacheBase: IModuleConfigSummerCacheBase) {
    super();
    this._cacheBase = cacheBase;
  }

  async get(key) {
    return {
      id: key.id,
      name: `name_${key.id}`,
    };
  }
}
