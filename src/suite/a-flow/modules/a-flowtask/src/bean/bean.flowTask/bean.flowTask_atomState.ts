import { BeanFlowTask1 } from './bean.flowTask_1.js';

export class BeanFlowTaskAtomState extends BeanFlowTask1 {
  async _setAtomState({ context, options }) {
    const atomState = options.atomState;
    if (atomState !== undefined && atomState !== null) {
      // set
      await this._setAtomState_changed({ context, atomState });
    }
  }

  async _setAtomState_changed({ context, atomState }) {
    const atomId = context._atom.atomId;
    await this.ctx.bean.atom.atomState({
      key: { atomId },
      atom: { atomState },
    });
    context._atom.atomState = atomState;
  }

  // async _setAtomState({ context, options }) {
  //   const atomState = options.atomState;
  //   if (atomState === -3) {
  //     const check = await this._setAtomState_check_cancelled({ context, options });
  //     if (check) {
  //       // set
  //       await this._setAtomState_changed({ context, atomState });
  //     }
  //   } else if (atomState !== undefined && atomState !== null) {
  //     // set
  //     await this._setAtomState_changed({ context, atomState });
  //   }
  // }

  // async _setAtomState_check_cancelled({ context }) {
  //   const atom = context._atom;
  //   // atomClass
  //   const atomClassBase = this.ctx.bean.base.atomClass({
  //     module: atom.module,
  //     atomClassName: atom.atomClassName,
  //   });
  //   const atomStage = atom.atomStage === 0 ? 'draft' : atom.atomStage === 1 ? 'formal' : null;
  //   if (!atomStage) return false;
  //   // dictKey
  //   const dictKey = this.ctx.bean.util.getProperty(atomClassBase, `fields.dicts.atomState.${atomStage}.dictKey`);
  //   if (!dictKey) return false;
  //   // ok
  //   return true;
  // }
}
