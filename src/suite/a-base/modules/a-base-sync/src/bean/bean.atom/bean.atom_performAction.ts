import { BeanAtomSchema } from './bean.atom_schema.js';

const mparse = require('@cabloy/module-parse').default;

export class BeanAtomPerformAction extends BeanAtomSchema {
  async performAction({ key, atomClass, action, item, options, user }: any) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // performAction
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    return await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { key, atomClass, action, item, options, user },
      fn: 'performAction',
    });
  }
}
