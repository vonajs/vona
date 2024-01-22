const objectHash = require('object-hash');

// const moduleInfo = module.info;
module.exports = class Atom {
  async _checkRightFlowTask({
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
    const actionCode = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // x // only support read/write,
    // x //   for flowTaskId is special right channel for read/write,
    // x //     that provide schema to filter data which user can access
    // x // if (![2, 3].includes(actionCode)) return false;
    // other action same as read
    // return :null(ignore) :false(reject) :true(pass)
    // flowTaskId
    const flowTaskId = options?.flowTaskId;
    if (!flowTaskId) {
      // donot effect right check
      return null;
    }
    // atomClassBase
    if (!atomClassBase) {
      atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    }
    if (![2, 3].includes(actionCode)) {
      //  will check enableOnFlowing on the next codes, whether or not options.flowTaskId
      // donot effect right check
      return null;
    }
    // not check for detail here
    if (atomClassBase.detail) return null;
    // flowTaskInfo: other action same as read
    const mode = actionCode === 3 ? 'edit' : 'view';
    const flowTaskInfo = await this._checkRightFlowTask_prepareAtomSchema({
      options,
      mode,
      flowTaskId,
      atomClass,
      user,
      throwError: false,
    });
    if (!flowTaskInfo) return false;
    if (flowTaskInfo.item.atomId !== key.atomId) {
      // flowTaskId and atomId are not conformable
      return false;
    }
    return { action, flowTaskId, flowTaskInfo };
  }

  async _checkRightFlowTask_prepareAtomSchema({ options, mode, flowTaskId, atomClass, user, throwError }) {
    const hint = {
      mode,
      flowTaskId,
      atomClass,
      userId: user.id,
      throwError,
    };
    const hintHash = objectHash(hint, { respectType: false });
    let res = this.ctx.bean.stash.get({ options, type: 'prepareAtomSchema', key: hintHash });
    if (res === undefined) {
      // console.log(hintHash);
      res = await this._checkRightFlowTask_prepareAtomSchema_stash({
        mode,
        flowTaskId,
        atomClass,
        user,
        throwError,
      });
      this.ctx.bean.stash.set({ options, type: 'prepareAtomSchema', key: hintHash, value: res });
    }
    return res;
  }

  async _checkRightFlowTask_prepareAtomSchema_stash({ mode, flowTaskId, atomClass, user, throwError }) {
    return await this.ctx.bean.flowTask._prepareAtomSchema({
      mode,
      flowTaskId,
      atomClass,
      user,
      throwError,
    });
  }
};
