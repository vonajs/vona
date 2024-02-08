import { Bean, BeanBase } from '@cabloy/core';
import type { IModuleConfigSummerCacheBase } from 'cabloy-module-api-a-summer';

@Bean({ scene: 'summer.cache' })
export class SummerCacheRoleWhosOfAtomClassAction extends BeanBase {
  _cacheBase: IModuleConfigSummerCacheBase;

  constructor(cacheBase: IModuleConfigSummerCacheBase) {
    super();
    this._cacheBase = cacheBase;
  }

  async get(key) {
    return await this.ctx.bean.atomRightAux.__getRoleWhosOfAtomClassActionRaw(key);
  }
}
