const objectHash = require('object-hash');

module.exports = class Atom {
  async _checkDetailRightInherit({ atomClass, atomClassBase, action, user, options }) {
    // atomIdMain
    const atomIdMain = options?.atomIdMain;
    // atomClassBase
    if (!atomClassBase) {
      atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    }
    // detail
    if (!atomClassBase.detail) return true;
    // atomClassMain
    const atomClassMain = atomClassBase.detail.atomClassMain;
    // action
    const actionBase = this.ctx.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      name: action,
    });
    const rightInherit = actionBase.rightInherit;
    if (!rightInherit) {
      // do nothing
      return true;
    }
    // atomIdMain should exists, so throw error better than return false
    if (!atomIdMain) this.ctx.throw(403);
    // check
    const rightInheritStage = actionBase.rightInheritStage;
    return await this._checkDetailRightInherit_checkRightInherit({
      atomIdMain,
      atomClassMain,
      rightInherit,
      rightInheritStage,
      atomClass,
      atomClassBase,
      user,
      options,
    });
  }

  async _checkDetailRightInherit_checkRightInherit({
    atomIdMain,
    atomClassMain,
    rightInherit,
    rightInheritStage,
    atomClass,
    atomClassBase,
    user,
    options,
  }) {
    const hint = {
      atomIdMain,
      atomClassMain,
      rightInherit,
      rightInheritStage,
      atomClass,
      userId: user.id,
      flowTaskId: options.flowTaskId,
      formActionMain: options.formActionMain,
    };
    const hintHash = objectHash(hint, { respectType: false });
    let res = this.ctx.bean.stash.get({ options, type: 'checkDetailRightInherit', key: hintHash });
    if (res === undefined) {
      // console.log(hintHash);
      res = await this._checkDetailRightInherit_checkRightInherit_stash({
        atomIdMain,
        atomClassMain,
        rightInherit,
        rightInheritStage,
        atomClass,
        atomClassBase,
        user,
        options,
      });
      this.ctx.bean.stash.set({ options, type: 'checkDetailRightInherit', key: hintHash, value: res });
    }
    return res;
  }

  async _checkDetailRightInherit_checkRightInherit_stash({
    atomIdMain,
    atomClassMain,
    rightInherit,
    rightInheritStage,
    atomClass,
    atomClassBase,
    user,
    options,
  }) {
    // check
    const detailRightInherit = { atomIdMain, atomClassMain, rightInherit, rightInheritStage };
    const res = await this._checkDetailRightInherit_perform({
      detailRightInherit,
      user,
      options,
    });
    if (!res) return false;
    // check schema
    // 1. check if inline mode
    if (!atomClassBase.detail.inline) return res;
    // 2. check schema
    let schemaMain;
    const fromViewHistoryInfo = res?.fromViewHistoryInfo;
    const formActionInfo = res?.formActionInfo;
    const flowTaskInfo = res?.flowTaskInfo;
    if (fromViewHistoryInfo) {
      schemaMain = fromViewHistoryInfo.schema;
    } else if (formActionInfo) {
      schemaMain = formActionInfo.schema;
    } else if (flowTaskInfo) {
      schemaMain = flowTaskInfo.schema;
    } else {
      const res = await this.ctx.bean.atom._prepareAtomSchema_atomClass({ atomClass: atomClassMain, user });
      schemaMain = res.schema;
    }
    return this._checkDetailRightInherit_schemaValid({
      action: rightInherit,
      schema: schemaMain.schema,
      atomClass,
      atomClassBase,
    });
  }

  _checkDetailRightInherit_schemaValid({ action, schema, atomClass /* , atomClassBase*/ }) {
    for (const key in schema.properties) {
      const property = schema.properties[key];
      if (
        property.ebType === 'details' &&
        property.ebParams.atomClass.module === atomClass.module &&
        property.ebParams.atomClass.atomClassName === atomClass.atomClassName
      ) {
        if (action === 'write' && property.ebReadOnly) {
          // ignore this
          continue;
        }
        // bingo
        return true;
      }
    }
    return false;
  }

  async _checkDetailRightInherit_perform({ detailRightInherit, user, options }) {
    const { atomIdMain, atomClassMain, rightInherit, rightInheritStage } = detailRightInherit;
    const formActionMain = options.formActionMain;
    // options
    options = {
      ...options, //
      atomIdMain: undefined,
      formAction: formActionMain,
      formActionMain: undefined,
    };
    // check rightInherit
    return await this.checkRightAction({
      atom: { id: atomIdMain },
      atomClass: atomClassMain,
      action: rightInherit,
      user,
      stage: rightInheritStage,
      options,
    });
  }

  // async _checkDetailRightInherit_detailInlineMode({ atomClass, atomClassMain }) {
  //   const schemaMain = await this.ctx.bean.atom._prepareAtomSchema_default({ atomClass: atomClassMain });
  //   for (const key in schemaMain.schema.properties) {
  //     const property = schemaMain.schema.properties[key];
  //     if (
  //       property.ebType === 'details' &&
  //       property.ebParams.atomClass.module === atomClass.module &&
  //       property.ebParams.atomClass.atomClassName === atomClass.atomClassName
  //     ) {
  //       // bingo
  //       return true;
  //     }
  //   }
  //   return false;
  // }
};
