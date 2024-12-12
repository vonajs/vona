import { BeanAtomRightCheckRightRead } from './bean.atom_right_checkRightRead.js';

export class BeanAtomRightCheckRightSelect extends BeanAtomRightCheckRightRead {
  async checkRightSelect({ atomClass, user, options }: any) {
    options = options || {};
    const atomIdMain = options.atomIdMain;
    if (!atomClass) {
      if (!atomIdMain) return true;
      this.app.throw(403);
    }
    // atomClass
    atomClass = await this.app.bean.atomClass.get(atomClass);
    if (!atomClass) this.self.scope.error.ElementDoesNotExist.throw();
    // atomClassBase
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // check atom history
    const checkAtomHistory = await this._checkRightSelect_atomHistory({ atomClass, user, options });
    if (!checkAtomHistory) return false;
    // check detail
    const detailRightInherit = await this.self._checkDetailRightInherit({
      atomClass,
      atomClassBase,
      action: 'read',
      user,
      options,
    });
    if (!detailRightInherit) return false;
    return true;
  }

  async _checkRightSelect_atomHistory({ atomClass, user, options }: any) {
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

  _checkIfAtomHistory({ options }: any) {
    const whereAtomIdFormal = options.where?.['a.atomIdFormal'];
    const stage = this.app.bean.atomStage.toString({ atomStage: options.stage });
    if (stage === 'history' && !whereAtomIdFormal) {
      // no right
      this.app.throw(403);
    }
    if (stage === 'history' && whereAtomIdFormal) {
      return whereAtomIdFormal;
    }
    return false;
  }
}
