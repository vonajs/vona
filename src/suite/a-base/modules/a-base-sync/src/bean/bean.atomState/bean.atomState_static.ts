import { BeanAtomState0 } from './bean.atomState_0.js';

export class BeanAtomStateStatic extends BeanAtomState0 {
  static_getDictKey({ atomClass, atomClassBase, atomStage }: any) {
    // atomClassBase
    if (!atomClassBase) {
      atomClassBase = this.ctx.bean.base.atomClass(atomClass);
    }
    // atomStage
    atomStage = this.ctx.bean.atomStage.toString({ atomStage });
    if (!atomStage) return null;
    // dictKey
    const dictKey = this.ctx.bean.util.getProperty(atomClassBase, `fields.dicts.atomState.${atomStage}.dictKey`);
    if (!dictKey) return null;
    // ok
    return dictKey;
  }
}
