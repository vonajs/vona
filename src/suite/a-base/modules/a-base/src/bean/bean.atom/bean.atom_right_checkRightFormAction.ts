import { BeanAtomRightCheckRightFlowTask } from './bean.atom_right_checkRightFlowTask.js';

import objectHash from 'object-hash';

export class BeanAtomRightCheckRightFormAction extends BeanAtomRightCheckRightFlowTask {
  async _checkRightFormAction({
    key,
    atomClass,
    atomClassBase,
    action,
    user,
    /* stage,
       checkFlow,
      disableAuthOpenCheck,*/
    options,
  }) {
    const actionCode = this.app.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // atomClassBase
    if (!atomClassBase) {
      atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    }
    // actionBase
    const actionBase = this.app.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      code: actionCode,
    });
    // x // only support read/write,
    // x //   for flowTaskId is special right channel for read/write,
    // x //     that provide schema to filter data which user can access
    // x // if (![2, 3].includes(actionCode)) return false;
    // other action same as read
    // return :null(ignore) :false(reject) :true(pass)
    // formAction
    const formAction = options?.formAction;
    let formActionCode;
    if (formAction) {
      formActionCode = this.app.bean.atomAction.parseActionCode({
        action: formAction,
        atomClass,
      });
    } else {
      formActionCode = 0;
    }
    if (![2, 3].includes(actionCode)) {
      // enableOnFormAction
      const enableOnFormAction = this.app.bean.util.ensureArray(actionBase.enableOnFormAction);
      if (formActionCode === actionCode) {
        // donot effect right check
        return null;
      }
      if (formAction) {
        if (!enableOnFormAction || !enableOnFormAction.includes(formAction)) {
          return false;
        }
      } else {
        if (enableOnFormAction) {
          return false;
        }
      }
      // donot effect right check
      return null;
    }
    // check formAction
    if (!formAction) {
      // donot effect right check
      return null;
    }
    // not check for detail here
    if (atomClassBase.detail) return null;
    //
    // formAction: similar as flowTaskId
    const mode = actionCode === 3 ? 'edit' : 'view';
    const formActionInfo = await this._checkRightFormAction_prepareAtomSchema({
      atomId: key.atomId,
      options,
      mode,
      formAction,
      atomClass,
      user,
      throwError: false,
    });
    if (!formActionInfo) return false;
    return { action, formAction, formActionInfo };
  }

  async _checkRightFormAction_prepareAtomSchema({
    atomId,
    options,
    mode,
    formAction,
    atomClass,
    user,
    throwError,
  }: any) {
    const hint = {
      atomId,
      mode,
      formAction,
      atomClass,
      userId: user.id,
      throwError,
    };
    const hintHash = objectHash(hint, { respectType: false });
    let res = this.app.bean.stash.get({ options, type: 'prepareAtomSchema', key: hintHash });
    if (res === undefined) {
      // console.log(hintHash);
      res = await this._checkRightFormAction_prepareAtomSchema_stash({
        atomId,
        mode,
        formAction,
        atomClass,
        user,
        throwError,
      });
      this.app.bean.stash.set({ options, type: 'prepareAtomSchema', key: hintHash, value: res });
    }
    return res;
  }

  async _checkRightFormAction_prepareAtomSchema_stash({ atomId, mode, formAction, atomClass, user, throwError }: any) {
    // check right: formAction
    // const options = Object.assign({}, options, {
    //   formAction: undefined,
    //   flowTaskId: undefined,
    // });
    const checkRight = await this.checkRightAction({
      atom: { id: atomId },
      atomClass,
      action: formAction,
      user,
      options: null, // use pure options
    });
    if (!checkRight) return null;
    // schema
    return await this.app.bean.formAction._prepareAtomSchema({
      mode,
      formAction,
      atomClass,
      user,
      throwError,
    });
  }
}
