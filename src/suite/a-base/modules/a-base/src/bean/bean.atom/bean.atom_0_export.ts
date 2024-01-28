import { BeanAtom0Enable } from './bean.atom_0_enable.js';

import * as ModuleInfo from '@cabloy/module-info';

export class BeanAtom0Export extends BeanAtom0Enable {
  async exportBulk({ atomClass, options, fields, user }: any) {
    // atomClass
    let atomClassBase;
    if (atomClass) {
      atomClass = await this.ctx.bean.atomClass.get(atomClass);
      atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    }
    // export
    const _moduleInfo = ModuleInfo.parseInfo(atomClass.module)!;
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    const resExport = await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, options, fields, user },
      fn: 'exportBulk',
    });
    // file
    const resFile = await this.ctx.bean.file._upload({
      fileContent: resExport.data,
      meta: resExport.meta,
      user,
    });
    // ok
    return resFile;
  }
}
