import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtom0Export } from './bean.atom_0_export.js';

export class BeanAtom0Import extends BeanAtom0Export {
  async importBulk({ atomClass, options, file, user }: any) {
    // atomClass
    atomClass = await this.app.bean.atomClass.get(atomClass);
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // importBulk
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName as any);
    return await beanInstance.importBulk({ atomClass, options, file, user });
  }
}
