import { BeanAtomRightCheckRightFormAction } from './bean.atom_right_checkRightFormAction.js';
import objectHash from 'object-hash';

export class BeanAtomRightCheckRightFromViewHistory extends BeanAtomRightCheckRightFormAction {
  async _checkRightFromViewHistory({
    key: _key,
    atom,
    atomClass,
    atomClassBase,
    action,
    user,
    /* stage,
       checkFlow,
      disableAuthOpenCheck,*/
    options,
  }) {
    const actionCode = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // atomClassBase
    if (!atomClassBase) {
      atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    }
    // not check for detail here
    if (atomClassBase.detail) return null;
    // atomStage
    if (atom.atomStage !== 2) {
      // donot effect right check
      return null;
    }
    if (actionCode === 17) {
      // viewHistory disabled on stage:history
      return false;
    }
    // similar as formAction
    const fromViewHistory = true;
    const mode = 'view';
    const fromViewHistoryInfo = await this._checkRightFromViewHistory_prepareAtomSchema({
      // atomId: key.atomId,
      atomId: atom.atomIdFormal,
      options,
      mode,
      fromViewHistory,
      atomClass,
      user,
      throwError: false,
    });
    if (!fromViewHistoryInfo) return false;
    return { action, fromViewHistory, fromViewHistoryInfo };
  }

  async _checkRightFromViewHistory_prepareAtomSchema({
    atomId,
    options,
    mode,
    fromViewHistory,
    atomClass,
    user,
    throwError,
  }) {
    const hint = {
      atomId,
      mode,
      fromViewHistory,
      atomClass,
      userId: user.id,
      throwError,
    };
    const hintHash = objectHash(hint, { respectType: false });
    let res = this.ctx.bean.stash.get({ options, type: 'prepareAtomSchema', key: hintHash });
    if (res === undefined) {
      // console.log(hintHash);
      res = await this._checkRightFromViewHistory_prepareAtomSchema_stash({
        atomId,
        mode,
        fromViewHistory,
        atomClass,
        user,
        throwError,
      });
      this.ctx.bean.stash.set({ options, type: 'prepareAtomSchema', key: hintHash, value: res });
    }
    return res;
  }

  async _checkRightFromViewHistory_prepareAtomSchema_stash({
    atomId,
    mode,
    fromViewHistory: _fromViewHistory,
    atomClass,
    user,
    throwError: _throwError,
  }) {
    // check right: formAction
    // const options = Object.assign({}, options, {
    //   formAction: undefined,
    //   flowTaskId: undefined,
    // });
    const checkRight = await this.checkRightAction({
      atom: { id: atomId },
      atomClass,
      action: 17, // viewHistory
      user,
      options: null, // use pure options
    });
    if (!checkRight) return null;
    // schema: use stage:formal fieldsRight
    return await this.self._prepareAtomSchema({
      mode,
      atomClass,
      options: {},
      user,
    });
  }
}
