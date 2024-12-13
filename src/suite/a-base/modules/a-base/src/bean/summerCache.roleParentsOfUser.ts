import { BeanSummerCacheBase, ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona-module-a-summer';

export type TSummerCacheRoleParentsOfUserKey = any;
export type TSummerCacheRoleParentsOfUserData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheRoleParentsOfUser
  extends BeanSummerCacheBase<TSummerCacheRoleParentsOfUserKey, TSummerCacheRoleParentsOfUserData>
  implements ISummerCacheGet<TSummerCacheRoleParentsOfUserKey, TSummerCacheRoleParentsOfUserData>
{
  async getNative(
    key: TSummerCacheRoleParentsOfUserKey,
    _options?: TSummerCacheActionOptions<TSummerCacheRoleParentsOfUserKey, TSummerCacheRoleParentsOfUserData>,
    _keyHash?: string,
  ): Promise<TSummerCacheRoleParentsOfUserData | null | undefined> {
    return await this.app.bean.atomRightAux.__getRoleParentsOfUserRaw(key);
  }
}
