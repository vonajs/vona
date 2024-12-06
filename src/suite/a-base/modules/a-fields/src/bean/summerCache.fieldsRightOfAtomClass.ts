import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';
import { ScopeModule } from '../.metadata/this.js';

export type TSummerCacheFieldsRightOfAtomClassKey = any;
export type TSummerCacheFieldsRightOfAtomClassData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheFieldsRightOfAtomClass
  extends BeanSummerCacheBase<
    ScopeModule,
    TSummerCacheFieldsRightOfAtomClassKey,
    TSummerCacheFieldsRightOfAtomClassData
  >
  implements ISummerCacheGet<TSummerCacheFieldsRightOfAtomClassKey, TSummerCacheFieldsRightOfAtomClassData>
{
  async getNative(
    key: TSummerCacheFieldsRightOfAtomClassKey,
    _options?: TSummerCacheActionOptions<TSummerCacheFieldsRightOfAtomClassKey, TSummerCacheFieldsRightOfAtomClassData>,
    _keyHash?: string,
  ): Promise<TSummerCacheFieldsRightOfAtomClassData | null | undefined> {
    return await this.app.bean.fields.__getFieldsRightOfAtomClassRaw(key);
  }
}
