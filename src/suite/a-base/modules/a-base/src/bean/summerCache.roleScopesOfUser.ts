import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';

export type TSummerCacheRoleScopesOfUserKey = any;
export type TSummerCacheRoleScopesOfUserData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheRoleScopesOfUser
  extends BeanSummerCacheBase<TSummerCacheRoleScopesOfUserKey, TSummerCacheRoleScopesOfUserData>
  implements ISummerCacheGet<TSummerCacheRoleScopesOfUserKey, TSummerCacheRoleScopesOfUserData>
{
  async getNative(
    key: TSummerCacheRoleScopesOfUserKey,
    _options?: TSummerCacheActionOptions<TSummerCacheRoleScopesOfUserKey, TSummerCacheRoleScopesOfUserData>,
    _keyHash?: string,
  ): Promise<TSummerCacheRoleScopesOfUserData | null | undefined> {
    return await this.app.bean.atomRightAux.__getRoleScopesOfUserRaw(key);
  }
}
