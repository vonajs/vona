import { BeanAtomRightCheckRightCreate } from './bean.atom_right_checkRightCreate.js';

export class BeanAtomRightCheckRightRead extends BeanAtomRightCheckRightCreate {
  async checkRoleRightRead({ atom: { id }, atomClass, options, roleId }: any) {
    return await this.checkRoleRightAction({
      atom: { id },
      atomClass,
      action: 2,
      roleId,
      options,
    });
  }

  async checkRoleRightAction({ atom: { id }, atomClass: atomClassOuter, action, options: optionsOuter, roleId }) {
    // not check draft
    // atomClass
    const { atom, atomClass, atomClassBase } = await this._prepareKeyAndAtomAndAtomClass({
      key: { atomId: id },
      atomClass: atomClassOuter,
      options: optionsOuter,
      throwWhenEmpty: false,
    });
    if (!atom || !atomClass || !atomClassBase) return null;
    // parse action code
    action = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // special check for itemOnly/enableRight=false
    if (atomClassBase.itemOnly && !atomClassBase.enableRight) {
      return atom;
    }
    // forAtomUser
    const forAtomUser = this.self._checkForAtomUser(atomClass);
    // formal/history
    const res = await this.sqlProcedure.checkRoleRightAction({
      iid: this.ctx.instance.id,
      roleIdWho: roleId,
      atomClass,
      atomClassBase,
      atom,
      action,
      forAtomUser,
    });
    if (res === false) return null;
    if (res === true) return atom;
    return res;
  }

  async checkRightRead({ atom: { id }, atomClass, options, user, checkFlow, disableAuthOpenCheck }: any) {
    return await this.checkRightAction({
      atom: { id },
      atomClass,
      action: 2,
      stage: null,
      user,
      checkFlow,
      disableAuthOpenCheck,
      options,
    });
  }

  async _checkRightRead_normal({ _atom, atomClass, user, checkFlow, options: _options }: any) {
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // draft: only userIdUpdated
    // check right
    if (!atomClassBase.itemOnly) {
      if (_atom.atomStage === 0) {
        // self
        const bSelf = _atom.userIdUpdated === user.id;
        // checkFlow
        if (_atom.atomFlowId > 0 && checkFlow) {
          const flow = await this.ctx.bean.flow.get({ flowId: _atom.atomFlowId, history: true, user });
          if (!flow) return null;
          return _atom;
        }
        // 1. closed
        if (_atom.atomClosed) {
          if (bSelf) return _atom;
          return null;
        }
        // // 2. flow
        // if (_atom.atomFlowId > 0) return null;
        // 3. self
        if (bSelf) return _atom;
        // others
        return null;
      }
    }
    // special check for itemOnly/enableRight=false
    if (atomClassBase.itemOnly && !atomClassBase.enableRight) {
      return true;
    }
    // forAtomUser
    const forAtomUser = this.self._checkForAtomUser(atomClass);
    // formal/history
    return await this._checkRightAction_sql({
      userIdWho: user.id,
      atomClass,
      atomClassBase,
      atom: _atom,
      action: 2,
      forAtomUser,
    });
  }
}
