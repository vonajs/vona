import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtom0Delete } from './bean.atom_0_delete.js';

export class BeanAtom0Enable extends BeanAtom0Delete {
  async enable({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }: any) {
    // atomClass
    const { key, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    if (!atomClassBase) this.ctx.throw(403);
    // atom bean
    const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
    await beanInstance.enable({ atomClass, key, options, user });
  }

  async disable({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }: any) {
    // atomClass
    const { key, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    if (!atomClassBase) this.ctx.throw(403);
    // atom bean
    const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
    await beanInstance.disable({ atomClass, key, options, user });
  }
}
