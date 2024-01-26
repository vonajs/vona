import { __ThisModule__ } from '../../resource/this.js';
import { BeanBaseActions } from './bean.base_actions.js';

const _atomClasses = {};

export class BeanBaseAtomClasses extends BeanBaseActions {
  atomClasses() {
    if (!_atomClasses[this.ctx.locale]) {
      // prepare
      const atomClassesAll = this._prepareAtomClasses();
      // hold
      _atomClasses[this.ctx.locale] = atomClassesAll;
    }
    return _atomClasses[this.ctx.locale];
  }

  atomClass({ module, atomClassName }) {
    const _atomClasses = this.atomClasses();
    return _atomClasses[module] && _atomClasses[module][atomClassName];
  }

  _prepareAtomClasses() {
    const atomClasses = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      if (module.main.meta && module.main.meta.base && module.main.meta.base.atoms) {
        const res = this._prepareAtomClassesModule(module, module.main.meta.base.atoms);
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

  _prepareAtomClassesModule_atomClassMeta(_atomClass) {
    if (_atomClass.itemOnly) {
      if (_atomClass.detail) {
        return this.ctx.constant.module(__ThisModule__).atomClass.metaDetail;
      }
      return this.ctx.constant.module(__ThisModule__).atomClass.metaItemOnly;
    }
    return this.ctx.constant.module(__ThisModule__).atomClass.meta;
  }

  _prepareAtomClassesModule(_module, _atoms) {
    const atomClasses = {};
    for (const key in _atoms) {
      const _atomClass = _atoms[key].info;
      const _atomClassMeta = this._prepareAtomClassesModule_atomClassMeta(_atomClass);
      // info
      const atomClass = this.ctx.bean.util.extend({ name: key }, _atomClassMeta, _atomClass);
      // model
      if (atomClass.tableName && !atomClass.model) {
        atomClass.model = key;
      }
      // titleLocale
      atomClass.titleLocale = this.ctx.text(atomClass.title);
      // ok
      atomClasses[key] = atomClass;
    }
    return atomClasses;
  }
}
