import { Bean, BeanBase } from 'vona';
import type { IModuleConfigSummerCacheBase } from 'cabloy-module-api-a-summer';

@Bean({ scene: 'summer.cache' })
export class SummerCacheFieldsRightOfAtomClass extends BeanBase {
  _cacheBase: IModuleConfigSummerCacheBase;

  constructor(cacheBase: IModuleConfigSummerCacheBase) {
    super();
    this._cacheBase = cacheBase;
  }

  async get(key) {
    return await this.ctx.bean.fields.__getFieldsRightOfAtomClassRaw(key);
  }
}
