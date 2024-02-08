import { Bean, BeanBase } from '@cabloy/core';
import type { IModuleConfigSummerCacheBase } from 'cabloy-module-api-a-summer';

@Bean({ scene: 'summer.cache' })
export class SummerCacheFieldsRightOfUser extends BeanBase {
  _cacheBase: IModuleConfigSummerCacheBase;

  constructor(cacheBase: IModuleConfigSummerCacheBase) {
    super();
    this._cacheBase = cacheBase;
  }

  async get(key) {
    return await this.ctx.bean.fields.__getFieldsRightOfUserRaw(key);
  }
}
