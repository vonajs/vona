import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';

export type TSummerCacheAtomClassInnerKey = any;
export type TSummerCacheAtomClassInnerData = any;

@SummerCache({
  preset: 'all',
})
export class SummerCacheAtomClassInner
  extends BeanSummerCacheBase<TSummerCacheAtomClassInnerKey, TSummerCacheAtomClassInnerData>
  implements ISummerCacheGet<TSummerCacheAtomClassInnerKey, TSummerCacheAtomClassInnerData>
{
  // key: in/notin
  async getNative(
    key: TSummerCacheAtomClassInnerKey,
    _options?: TSummerCacheActionOptions<TSummerCacheAtomClassInnerKey, TSummerCacheAtomClassInnerData>,
    _keyHash?: string,
  ): Promise<TSummerCacheAtomClassInnerData | null | undefined> {
    const atomClasses = this.__getAtomClasses(key);
    return await this.app.bean.atomClass.model.mget(atomClasses);
  }

  private __getAtomClasses(clause) {
    const result: any[] = [];
    const _atomClasses = this.app.bean.base.atomClasses();
    for (const module in _atomClasses) {
      const _atomClassesModule = _atomClasses[module];
      for (const atomClassName in _atomClassesModule) {
        const _atomClass = _atomClassesModule[atomClassName];
        if (clause === 'in' && _atomClass.inner) {
          result.push({ module, atomClassName });
        } else if (clause === 'notin' && !_atomClass.inner) {
          result.push({ module, atomClassName });
        }
      }
    }
    return result;
  }
}
