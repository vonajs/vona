import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtomPerformAction } from './bean.atom_performAction.js';

export class BeanAtomPerformActionBulk extends BeanAtomPerformAction {
  async performActionBulk({ keys, atomClass, action, item, options, user }: any) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // performAction
    const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName as any);
    return await beanInstance.performActionBulk({ keys, atomClass, action, item, options, user });
  }
}
