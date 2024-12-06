import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';
import { ScopeModule } from '../.metadata/this.js';

export type TSummerCacheRoleParentsOfUserKey = any;
export type TSummerCacheRoleParentsOfUserData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheRoleParentsOfUser
  extends BeanSummerCacheBase<ScopeModule, TSummerCacheRoleParentsOfUserKey, TSummerCacheRoleParentsOfUserData>
  implements ISummerCacheGet<TSummerCacheRoleParentsOfUserKey, TSummerCacheRoleParentsOfUserData>
{
  async getNative(
    key: TSummerCacheRoleParentsOfUserKey,
    _options: TSummerCacheActionOptions<TSummerCacheRoleParentsOfUserKey, TSummerCacheRoleParentsOfUserData>,
    _keyHash: string,
  ): Promise<TSummerCacheRoleParentsOfUserData | null | undefined> {
    return await this.app.bean.atomRightAux.__getRoleParentsOfUserRaw(key);
  }
}
