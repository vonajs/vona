import { BeanAtom0Create } from './bean.atom_0_create.js';

import * as ModuleInfo from '@cabloy/module-info';

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
    const _moduleInfo = ModuleInfo.parseInfo(atomClass.module)!;
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    item = await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, item, options, user },
      fn: 'default',
    });
    // ok
    const returnSchema = options.returnSchema;
    if (!returnSchema) return item;
    return { item, schema: options.schema };
  }
}
