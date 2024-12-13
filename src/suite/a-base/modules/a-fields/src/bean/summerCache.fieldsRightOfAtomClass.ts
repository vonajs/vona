import { BeanSummerCacheBase, ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona-module-a-summer';

export type TSummerCacheFieldsRightOfAtomClassKey = any;
export type TSummerCacheFieldsRightOfAtomClassData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheFieldsRightOfAtomClass
  extends BeanSummerCacheBase<TSummerCacheFieldsRightOfAtomClassKey, TSummerCacheFieldsRightOfAtomClassData>
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
