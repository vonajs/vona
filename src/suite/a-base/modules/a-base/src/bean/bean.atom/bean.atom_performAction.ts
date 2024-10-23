import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtomSchema } from './bean.atom_schema.js';

export class BeanAtomPerformAction extends BeanAtomSchema {
  async performAction({ key, atomClass, action, item, options, user }: any) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // performAction
    const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
    return await beanInstance.performAction({ key, atomClass, action, item, options, user });
  }
}
