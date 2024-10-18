import { Bean, BeanBase } from 'vona';
import type { IModuleConfigSummerCacheBase } from 'vona-module-a-summer';

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
