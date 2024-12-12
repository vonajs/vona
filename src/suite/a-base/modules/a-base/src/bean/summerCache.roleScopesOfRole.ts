import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';

export type TSummerCacheRoleScopesOfRoleKey = any;
export type TSummerCacheRoleScopesOfRoleData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheRoleScopesOfRole
  extends BeanSummerCacheBase<TSummerCacheRoleScopesOfRoleKey, TSummerCacheRoleScopesOfRoleData>
  implements ISummerCacheGet<TSummerCacheRoleScopesOfRoleKey, TSummerCacheRoleScopesOfRoleData>
{
  async getNative(
    key: TSummerCacheRoleScopesOfRoleKey,
    _options?: TSummerCacheActionOptions<TSummerCacheRoleScopesOfRoleKey, TSummerCacheRoleScopesOfRoleData>,
    _keyHash?: string,
  ): Promise<TSummerCacheRoleScopesOfRoleData | null | undefined> {
    return await this.app.bean.atomRightAux.__getRoleScopesOfRoleRaw(key);
  }
}
