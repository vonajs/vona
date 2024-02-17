import { BeanAtomBase } from '../virtual.atomBase.js';
import { BeanAtom0Create } from './bean.atom_0_create.js';

export class BeanAtom0Default extends BeanAtom0Create {
  async default({ atomClass, atomStage, roleIdOwner, item, options, user }: any) {
    options = options || {};
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // atomSimple
    const atomSimple = Number(Boolean(atomClassBase.simple));
    // item
    item = item || {};
    if (!atomClassBase.itemOnly) {
      item.atomStage = atomStage !== undefined ? atomStage : atomSimple;
      item.roleIdOwner = roleIdOwner;
    }
    // atom bean
    const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
    item = await beanInstance.default({ atomClass, item, options, user });
    // ok
    const returnSchema = options.returnSchema;
    if (!returnSchema) return item;
    return { item, schema: options.schema };
  }
}
