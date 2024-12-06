import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';
import { ScopeModule } from '../.metadata/this.js';

export type TSummerCacheFieldsRightOfUserKey = any;
export type TSummerCacheFieldsRightOfUserData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheFieldsRightOfUser
  extends BeanSummerCacheBase<ScopeModule, TSummerCacheFieldsRightOfUserKey, TSummerCacheFieldsRightOfUserData>
  implements ISummerCacheGet<TSummerCacheFieldsRightOfUserKey, TSummerCacheFieldsRightOfUserData>
{
  async getNative(
    key: TSummerCacheFieldsRightOfUserKey,
    _options: TSummerCacheActionOptions<TSummerCacheFieldsRightOfUserKey, TSummerCacheFieldsRightOfUserData>,
    _keyHash: string,
  ): Promise<TSummerCacheFieldsRightOfUserData | null | undefined> {
    return await this.app.bean.fields.__getFieldsRightOfUserRaw(key);
  }
}
