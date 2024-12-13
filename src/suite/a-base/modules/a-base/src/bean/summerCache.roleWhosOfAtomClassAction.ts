import { BeanSummerCacheBase, ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona-module-a-summer';

export type TSummerCacheRoleWhosOfAtomClassActionKey = any;
export type TSummerCacheRoleWhosOfAtomClassActionData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheRoleWhosOfAtomClassAction
  extends BeanSummerCacheBase<TSummerCacheRoleWhosOfAtomClassActionKey, TSummerCacheRoleWhosOfAtomClassActionData>
  implements ISummerCacheGet<TSummerCacheRoleWhosOfAtomClassActionKey, TSummerCacheRoleWhosOfAtomClassActionData>
{
  async getNative(
    key: TSummerCacheRoleWhosOfAtomClassActionKey,
    _options?: TSummerCacheActionOptions<
      TSummerCacheRoleWhosOfAtomClassActionKey,
      TSummerCacheRoleWhosOfAtomClassActionData
    >,
    _keyHash?: string,
  ): Promise<TSummerCacheRoleWhosOfAtomClassActionData | null | undefined> {
    return await this.app.bean.atomRightAux.__getRoleWhosOfAtomClassActionRaw(key);
  }
}
