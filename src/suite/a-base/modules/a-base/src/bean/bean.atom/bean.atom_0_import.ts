import { BeanAtomBase } from '../virtual.atomBase.js';
import { BeanAtom0Export } from './bean.atom_0_export.js';

export class BeanAtom0Import extends BeanAtom0Export {
  async importBulk({ atomClass, options, file, user }: any) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // importBulk
    const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
    return await beanInstance.importBulk({ atomClass, options, file, user });
  }
}
