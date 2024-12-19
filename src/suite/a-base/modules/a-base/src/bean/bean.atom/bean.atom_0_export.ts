import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtom0Enable } from './bean.atom_0_enable.js';

export class BeanAtom0Export extends BeanAtom0Enable {
  async exportBulk({ atomClass, options, fields, user }: any) {
    // atomClass
    let atomClassBase;
    if (atomClass) {
      atomClass = await this.app.bean.atomClass.get(atomClass);
      atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    }
    // export
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName);
    const resExport = await beanInstance.exportBulk({ atomClass, options, fields, user });
    // file
    const resFile = await this.app.bean.file._upload({
      fileContent: resExport.data,
      meta: resExport.meta,
      user,
    });
    // ok
    return resFile;
  }
}
