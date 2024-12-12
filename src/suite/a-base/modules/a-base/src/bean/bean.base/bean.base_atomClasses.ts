import { AtomClassBase, AtomClassBaseRecord, AtomClassMeta } from '../../types.js';
import { BeanBaseActions } from './bean.base_actions.js';

const _atomClasses: Record<string, Record<string, AtomClassBaseRecord>> = {};

export class BeanBaseAtomClasses extends BeanBaseActions {
  atomClasses(): Record<string, AtomClassBaseRecord> {
    if (!_atomClasses[this.ctx.locale]) {
      // prepare
      const atomClassesAll = this._prepareAtomClasses();
      // hold
      _atomClasses[this.ctx.locale] = atomClassesAll;
    }
    return _atomClasses[this.ctx.locale];
  }

  atomClass({ module, atomClassName }: any): AtomClassBase {
    const _atomClasses = this.atomClasses();
    return _atomClasses[module] && _atomClasses[module][atomClassName];
  }

  _prepareAtomClasses(): Record<string, AtomClassBaseRecord> {
    const atomClasses: Record<string, AtomClassBaseRecord> = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      if (module.meta && module.meta.base && module.meta.base.atoms) {
        const res = this._prepareAtomClassesModule(relativeName, module.meta.base.atoms);
        if (Object.keys(res).length > 0) {
          atomClasses[relativeName] = res;
        }
      }
    }
    this._prepareAtomClassesDetails(atomClasses);
    return atomClasses;
  }

  _prepareAtomClassesDetails(atomClassesAll) {
    for (const relativeName in atomClassesAll) {
      const atomClasses = atomClassesAll[relativeName];
      for (const atomClassName in atomClasses) {
        const atomClass = atomClasses[atomClassName];
        if (!atomClass.detail) continue;
        const atomClassMain = atomClass.detail.atomClassMain;
        const atomClassMainBase = atomClassesAll[atomClassMain.module][atomClassMain.atomClassName];
        if (!atomClassMainBase.details) {
          atomClassMainBase.details = [];
        }
        atomClassMainBase.details.push({ module: relativeName, atomClassName });
      }
    }
  }

  _prepareAtomClassesModule_atomClassMeta(_atomClass: AtomClassMeta): Partial<AtomClassMeta> {
    if (_atomClass.itemOnly) {
      if (_atomClass.detail) {
        return this.self.scope.constant.atomClass.metaDetail;
      }
      return this.self.scope.constant.atomClass.metaItemOnly;
    }
    return this.self.scope.constant.atomClass.meta;
  }

  _prepareAtomClassesModule(moduleName, _atoms): Record<string, AtomClassBase> {
    const atomClasses: Record<string, AtomClassBase> = {};
    for (const key in _atoms) {
      const _atomClass: AtomClassMeta = _atoms[key].info;
      const _atomClassMeta: Partial<AtomClassMeta> = this._prepareAtomClassesModule_atomClassMeta(_atomClass);
      // info
      const atomClass: AtomClassBase = this.app.bean.util.extend({ name: key }, _atomClassMeta, _atomClass);
      // model
      if (atomClass.tableName && !atomClass.model) {
        atomClass.model = key;
      }
      // titleLocale
      atomClass.titleLocale = this.app.text(atomClass.title);
      // beanFullName
      atomClass.beanFullName = this.bean.util.combineBeanFullName({
        module: moduleName,
        scene: 'atom',
        bean: atomClass.bean,
      });
      // ok
      atomClasses[key] = atomClass;
    }
    return atomClasses;
  }
}
