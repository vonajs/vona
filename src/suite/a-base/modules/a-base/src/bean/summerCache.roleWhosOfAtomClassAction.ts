import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';
import { ScopeModule } from '../.metadata/this.js';

export type TSummerCacheRoleWhosOfAtomClassActionKey = any;
export type TSummerCacheRoleWhosOfAtomClassActionData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheRoleWhosOfAtomClassAction
  extends BeanSummerCacheBase<
    ScopeModule,
    TSummerCacheRoleWhosOfAtomClassActionKey,
    TSummerCacheRoleWhosOfAtomClassActionData
  >
  implements ISummerCacheGet<TSummerCacheRoleWhosOfAtomClassActionKey, TSummerCacheRoleWhosOfAtomClassActionData>
{
  async getNative(
    key: TSummerCacheRoleWhosOfAtomClassActionKey,
    _options: TSummerCacheActionOptions<
      TSummerCacheRoleWhosOfAtomClassActionKey,
      TSummerCacheRoleWhosOfAtomClassActionData
    >,
    _keyHash: string,
  ): Promise<TSummerCacheRoleWhosOfAtomClassActionData | null | undefined> {
    return await this.app.bean.atomRightAux.__getRoleWhosOfAtomClassActionRaw(key);
  }
}
