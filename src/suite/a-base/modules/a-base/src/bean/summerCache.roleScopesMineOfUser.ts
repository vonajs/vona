import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';

export type TSummerCacheRoleScopesMineOfUserKey = any;
export type TSummerCacheRoleScopesMineOfUserData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheRoleScopesMineOfUser
  extends BeanSummerCacheBase<TSummerCacheRoleScopesMineOfUserKey, TSummerCacheRoleScopesMineOfUserData>
  implements ISummerCacheGet<TSummerCacheRoleScopesMineOfUserKey, TSummerCacheRoleScopesMineOfUserData>
{
  async getNative(
    key: TSummerCacheRoleScopesMineOfUserKey,
    _options?: TSummerCacheActionOptions<TSummerCacheRoleScopesMineOfUserKey, TSummerCacheRoleScopesMineOfUserData>,
    _keyHash?: string,
  ): Promise<TSummerCacheRoleScopesMineOfUserData | null | undefined> {
    return await this.app.bean.atomRightAux.__getRoleScopesMineOfUserRaw(key);
  }
}
