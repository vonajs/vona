import { Bean, BeanBase } from 'vona';
import type { IModuleConfigSummerCacheBase } from 'vona-module-a-summer';

@Bean({ scene: 'summer.cache' })
export class SummerCacheAtomClassInner extends BeanBase {
  _cacheBase: IModuleConfigSummerCacheBase;

  constructor(cacheBase: IModuleConfigSummerCacheBase) {
    super();
    this._cacheBase = cacheBase;
  }

  // key: in/notin
  async get(key) {
    const atomClasses = this.__getAtomClasses(key);
    return await this.app.bean.atomClass.model.mget(atomClasses);
  }

  __getAtomClasses(clause) {
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
