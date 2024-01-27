import { __ThisModule__ } from '../../resource/this.js';
import { BeanAtomRightCheckRightActionBulk } from './bean.atom_right_checkRightActionBulk.js';

export class BeanAtomRightCheckRightActionEnable extends BeanAtomRightCheckRightActionBulk {
  // _atom/null/true
  // _atom: means ready
  // null: means no right
  // true: means ignore

  _checkRightAction_checkStage({ _atom, actionBase }: any) {
    const _checkPoint = actionBase.stage;
    if (_checkPoint === undefined || _checkPoint === null) return true;
    // check
    const _checkPoints = this.ctx.bean.util.ensureArray(_checkPoint);
    const __atomStages = this.ctx.constant.module(__ThisModule__).atom.stage;
    const bingo = _checkPoints.some(item => __atomStages[item] === _atom.atomStage);
    if (!bingo) {
      return null;
    }
    return true;
  }

  _checkRightAction_enableOnAtomState({ _atom, actionBase }: any) {
    const _checkPoint = actionBase.enableOnAtomState;
    if (_checkPoint === undefined || _checkPoint === null) return true;
    // check
    const _checkPoints = this.ctx.bean.util.ensureArray(_checkPoint);
    const bingo = _checkPoints.some(item => {
      // eslint-disable-next-line
      return item == _atom.atomState;
    });
    if (!bingo) {
      return null;
    }
    return true;
  }

  _checkRightAction_enableOnAtomStateReverse({ _atom, actionBase }: any) {
    const _checkPoint = actionBase.enableOnAtomStateReverse;
    if (_checkPoint === undefined || _checkPoint === null) return true;
    // check
    const _checkPoints = this.ctx.bean.util.ensureArray(_checkPoint);
    const bingo = _checkPoints.some(item => {
      // eslint-disable-next-line
      return item == _atom.atomState;
    });
    if (bingo) {
      return null;
    }
    return true;
  }

  _checkRightAction_enableOnAtomDisabled({ _atom, actionBase }: any) {
    const _checkPoint = actionBase.enableOnAtomDisabled;
    if (_checkPoint === undefined || _checkPoint === null) return true;
    if (_checkPoint === true && _atom.atomDisabled === 0) return null;
    if (_checkPoint === false && _atom.atomDisabled === 1) return null;
    return true;
  }

  _checkRightAction_enableOnStatic({ _atom, action, actionBase, user }: any) {
    const _checkPoint = actionBase.enableOnStatic;
    if (_checkPoint === undefined || _checkPoint === null) return true;
    // check true
    if (_checkPoint === true && _atom.atomStatic === 0) {
      return null;
    }
    // check false
    if (_checkPoint === false && _atom.atomStatic === 1) {
      // self
      const bSelf = _atom.userIdUpdated === user.id;
      // except action=4 and atomStage===0
      if (action === 4 && _atom.atomStage === 0 && _atom.atomClosed === 0 && bSelf) {
        return _atom;
      }
      return null;
    }
    return true;
  }

  _checkRightAction_enableOnOpened({ _atomDraft, actionBase }: any) {
    const _checkPoint = actionBase.enableOnOpened;
    if (_checkPoint === undefined || _checkPoint === null) return true;
    // ignore when no draft
    if (!_atomDraft) return true;
    // check true
    if (_checkPoint === true && _atomDraft.atomClosed) return null;
    // check false
    if (_checkPoint === false && !_atomDraft.atomClosed) return null;
    return true;
  }

  async _checkRightAction_enableOnFlowing({ actionBase, atomClassBase, _atom, _atomAnother }: any) {
    const _checkPoint = actionBase.enableOnFlowing;
    if (_checkPoint === undefined || _checkPoint === null) return true;
    const isFlowing = await this._checkRightAction_isFlowing({
      atomClassBase,
      atom: _atom,
      atomAnother: _atomAnother,
    });
    if (_checkPoint === true && !isFlowing) return null;
    if (_checkPoint === false && isFlowing) return null;
    return true;
  }
}
