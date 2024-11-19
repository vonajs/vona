import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtomSchema } from './bean.atom_schema.js';

export class BeanAtomPerformAction extends BeanAtomSchema {
  async performAction({ key, atomClass, action, item, options, user }: any) {
    // atomClass
    atomClass = await this.app.bean.atomClass.get(atomClass);
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // performAction
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName as any);
    return await beanInstance.performAction({ key, atomClass, action, item, options, user });
  }
}
