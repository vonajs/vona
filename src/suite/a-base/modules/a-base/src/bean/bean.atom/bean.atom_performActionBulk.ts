import { BeanAtomPerformAction } from './bean.atom_performAction.js';

import * as ModuleInfo from '@cabloy/module-info';

export class BeanAtomPerformActionBulk extends BeanAtomPerformAction {
  async performActionBulk({ keys, atomClass, action, item, options, user }: any) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // performAction
    const _moduleInfo = ModuleInfo.parseInfo(atomClass.module)!;
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    return await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { keys, atomClass, action, item, options, user },
      fn: 'performActionBulk',
    });
  }
}
