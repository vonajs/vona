import { __ThisModule__ } from '../../resource/this.js';
import { BeanAtomRightCheckRightRead } from './bean.atom_right_checkRightRead.js';

export class BeanAtomRightCheckRightSelect extends BeanAtomRightCheckRightRead {
  async checkRightSelect({ atomClass, user, options }) {
    options = options || {};
    const atomIdMain = options.atomIdMain;
    if (!atomClass) {
      if (!atomIdMain) return true;
      this.ctx.throw(403);
    }
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    if (!atomClass) this.ctx.throw.module(__ThisModule__, 1002);
    // atomClassBase
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // check atom history
    const checkAtomHistory = await this._checkRightSelect_atomHistory({ atomClass, user, options });
    if (!checkAtomHistory) return false;
    // check detail
    const detailRightInherit = await this._checkDetailRightInherit({
      atomClass,
      atomClassBase,
      action: 'read',
      user,
      options,
    });
    if (!detailRightInherit) return false;
    return true;
  }

  async _checkRightSelect_atomHistory({ atomClass, user, options }) {
    // right check of select of hisotry contains two steps:
    //   1. check viewHistory action right
    //   2. check other action right (options.formAction)
    // 1. always check viewHistory right, no matter what options.formAction is
    // 2. so, if stage===history, whereAtomIdFormal must exists
    const whereAtomIdFormal = this._checkIfAtomHistory({ options });
    if (!whereAtomIdFormal) {
      return true;
    }
    // check right: viewHistory
    return await this.checkRightAction({
      atom: { id: whereAtomIdFormal },
      atomClass,
      action: 17,
      user,
      options,
    });
  }

  _checkIfAtomHistory({ options }) {
    const whereAtomIdFormal = options.where?.['a.atomIdFormal'];
    const stage = this.ctx.bean.atomStage.toString({ atomStage: options.stage });
    if (stage === 'history' && !whereAtomIdFormal) {
      // no right
      this.ctx.throw(403);
    }
    if (stage === 'history' && whereAtomIdFormal) {
      return whereAtomIdFormal;
    }
    return false;
  }
}
