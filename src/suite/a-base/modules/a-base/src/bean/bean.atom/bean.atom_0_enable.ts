import { BeanAtom0Delete } from './bean.atom_0_delete.js';

import * as ModuleInfo from '@cabloy/module-info';

export class BeanAtom0Enable extends BeanAtom0Delete {
  async enable({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }: any) {
    // atomClass
    const { key, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    // atom bean
    const _moduleInfo = ModuleInfo.parseInfo(atomClass.module)!;
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, key, options, user },
      fn: 'enable',
    });
  }

  async disable({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }: any) {
    // atomClass
    const { key, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    // atom bean
    const _moduleInfo = ModuleInfo.parseInfo(atomClass.module)!;
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, key, options, user },
      fn: 'disable',
    });
  }
}
