import { cast } from 'vona';
import { BeanBase } from 'vona';
import { BeanAtomState } from '../bean.atomState.js';

export class BeanAtomState0 extends BeanBase {
  dictKeyDefault: any;

  constructor() {
    super();
    this.dictKeyDefault = 'a-dictbooster:dictAtomStateDefault';
  }

  get self() {
    return Cast<BeanAtomState>(this);
  }

  async findDictItem({ atomClass, atomClassBase, atomStage, atomState }: any) {
    // atomClassBase
    if (!atomClassBase) {
      atomClassBase = this.app.bean.base.atomClass(atomClass);
    }
    // check flow stage: maybe not set
    const flowStage = atomClassBase.flow?.stage;
    atomStage = this.app.bean.atomStage.toString({ atomStage });
    const flowStageSame = flowStage === atomStage;
    // dictKey: static
    let dictKey = this.self.static_getDictKey({ atomClass, atomClassBase, atomStage });
    if (!dictKey) {
      // dictKey: dynamic
      if (flowStageSame) {
        const dictKeyInfo = await this.self.dynamic_getDictKeyInfo({ atomClass });
        dictKey = dictKeyInfo?.dictKey;
      }
    }
    if (!dictKey) return null;
    // dictItem
    const dictItem = await this.app.bean.dict.findItem({
      dictKey,
      code: atomState,
    });
    if (dictItem) return dictItem;
    // check flow stage: maybe not set
    if (flowStageSame) {
      // try default
      return await this.app.bean.dict.findItem({
        dictKey: this.dictKeyDefault,
        code: atomState,
      });
    }
    // not found
    return null;
  }
}
