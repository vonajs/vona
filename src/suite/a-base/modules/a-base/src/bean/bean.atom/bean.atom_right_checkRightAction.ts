import { Cast } from '@cabloy/core';
import { BeanAtomRightActionsBulk } from './bean.atom_right_actionsBulk.js';
import { BeanAtomRightCheckRightActionBulk } from './bean.atom_right_checkRightActionBulk.js';
import { BeanAtomRightCheckRightActionEnable } from './bean.atom_right_checkRightActionEnable.js';
import { BeanAtomRightCheckRightFlowTask } from './bean.atom_right_checkRightFlowTask.js';
import { BeanAtomRightCheckRightFormAction } from './bean.atom_right_checkRightFormAction.js';
import { BeanAtomRightCheckRightFromViewHistory } from './bean.atom_right_checkRightFromViewHistory.js';
import { BeanAtomRightCheckRightRead } from './bean.atom_right_checkRightRead.js';
import { BeanAtomRightDetailRightInherit } from './bean.atom_right_detailRightInherit.js';
import { BeanAtomUtils } from './bean.atom_utils.js';

import * as ModuleInfo from '@cabloy/module-info';

export class BeanAtomRightCheckRightAction extends BeanAtomRightActionsBulk {
  async checkRightAction({
    atom: { id },
    atomClass: atomClassOuter,
    action,
    stage,
    user,
    checkFlow,
    disableAuthOpenCheck,
    options: optionsOuter,
  }: any) {
    const { key, atom, atomClass, /* atomClassBase,*/ options } = await this._prepareKeyAndAtomAndAtomClass({
      key: { atomId: id },
      atomClass: atomClassOuter,
      options: optionsOuter,
      throwWhenEmpty: false,
    });
    // parse action code
    action = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // special for write / createDelay
    //   need not check clone(key.atomId!==0)
    if (action === 3 && key.atomId === 0) {
      // need not check createDelay
      //  createDelay is just a ui behavior at front
      // const createDelay = this.ctx.bean.atomAction.getCreateDelay({ atomClass });
      // if (!createDelay) this.ctx.throw(403);
      // check if create
      return await Cast<BeanAtomRightCheckRightActionBulk>(this).checkRightActionBulk({
        atomClass,
        action: 1,
        user,
        options,
      });
    }
    // others
    if (!atom) this.ctx.throw(403);
    // inner
    return await this._checkRightAction_inner({
      atom,
      atomClass,
      action,
      stage,
      user,
      checkFlow,
      disableAuthOpenCheck,
      options,
    });
  }

  async _checkRightAction_inner({
    atom,
    atomClass,
    action,
    stage,
    user,
    checkFlow,
    disableAuthOpenCheck,
    options,
  }: any) {
    // parse action code
    action = this.ctx.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // normal check
    const res = await this._checkRightAction_inner2({ atom, atomClass, action, stage, user, checkFlow, options });
    if (!res) return res;
    // auth open check
    if (!disableAuthOpenCheck) {
      const resAuthOpenCheck = await this.ctx.bean.authOpen.checkRightAtomAction({ atomClass, action });
      if (!resAuthOpenCheck) return null;
    }
    // ok
    return res;
  }

  async _checkRightAction_inner2({ atom, atomClass, action, stage, user, checkFlow, options }: any) {
    // atom bean
    const _moduleInfo = ModuleInfo.parseInfo(atomClass.module)!;
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // check right
    options = {
      ...options,
      stage,
      checkFlow,
    };
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    return await this.ctx.meta.util.executeBeanAuto({
      beanFullName,
      context: { atom, atomClass, action, options, user },
      fn: 'checkRightAction',
    });
  }

  async _checkRightAction_base({ atom, atomClass, action, options, user }: any) {
    let { stage, checkFlow } = options || {};
    // atom
    const _atom = atom;
    if (!_atom) this.scope.error.ElementDoesNotExist.throw();
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // check fromViewHistory
    const rightFromViewHistory = await (
      this as unknown as BeanAtomRightCheckRightFromViewHistory
    )._checkRightFromViewHistory({
      key: { atomId: atom.atomId },
      atom,
      atomClass,
      atomClassBase,
      action,
      user,
      options,
    });
    if (rightFromViewHistory === false) {
      return null;
    }
    if (rightFromViewHistory && [2].includes(action)) {
      // fromViewHistory is special right channel for read
      return rightFromViewHistory;
    }
    // check formActionRight
    const rightFormAction = await Cast<BeanAtomRightCheckRightFormAction>(this)._checkRightFormAction({
      key: { atomId: atom.atomId },
      atomClass,
      atomClassBase,
      action,
      user,
      options,
    });
    if (rightFormAction === false) {
      return null;
    }
    if (rightFormAction && [2, 3].includes(action)) {
      // form action is special right channel for read/write
      return rightFormAction;
    }
    // check flowTaskRight
    const rightFlowTask = await Cast<BeanAtomRightCheckRightFlowTask>(this)._checkRightFlowTask({
      key: { atomId: atom.atomId },
      atomClass,
      atomClassBase,
      action,
      user,
      options,
    });
    if (rightFlowTask === false) {
      // flowTaskId is not valid
      return null;
    }
    if (rightFlowTask && [2, 3].includes(action)) {
      // flowTaskId is special right channel for read/write
      return rightFlowTask;
    }
    // check detail
    const detailRightInherit = await Cast<BeanAtomRightDetailRightInherit>(this)._checkDetailRightInherit({
      atomClass,
      atomClassBase,
      action,
      user,
      options,
    });
    if (!detailRightInherit) return null;
    // special for read
    if (action === 2) {
      return await Cast<BeanAtomRightCheckRightRead>(this)._checkRightRead_normal({
        _atom,
        atomClass,
        user,
        checkFlow,
        options,
      });
    }
    // check if itemOnly
    if (atomClassBase.itemOnly) {
      // check basic
      return await this._checkRightAction_itemOnly({ atomClass, _atom, action, user });
    }
    // adjust for simple
    if (stage === 'draft' && _atom.atomSimple === 1) stage = 'formal';
    // action.stage
    if (
      (stage === 'draft' && _atom.atomStage > 0) ||
      ((stage === 'formal' || stage === 'history') && _atom.atomStage === 0)
    ) {
      return null;
    }
    // flow action
    if (action >= 10000) {
      const task = await this._checkRightAction_flowAction({ _atom, atomClass, action, user });
      if (!task) return null;
      _atom.__task = task;
      return _atom;
    }
    // actionBase
    const actionBase = this.ctx.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      code: action,
    });
    // if (!actionBase) throw new Error(`action not found: ${atomClass.module}:${atomClass.atomClassName}:${action}`);
    if (!actionBase) {
      if (action < 10000) {
        await this.ctx.bean.atomAction.delete({ atomClassId: atomClass.id, code: action });
      }
      return null;
    }
    // stage
    const _checkStage = Cast<BeanAtomRightCheckRightActionEnable>(this)._checkRightAction_checkStage({
      _atom,
      actionBase,
    });
    if (_checkStage !== true) {
      return _checkStage;
    }
    // actionBase.enableOnStatic
    const _enableOnStatic = Cast<BeanAtomRightCheckRightActionEnable>(this)._checkRightAction_enableOnStatic({
      _atom,
      action,
      actionBase,
      user,
    });
    if (_enableOnStatic !== true) {
      return _enableOnStatic;
    }
    // viewWorkflow
    if (action === 16 && _atom.atomFlowId === 0) return null;
    // actionBase.enableOnAtomState
    const _enableOnAtomState = (
      this as unknown as BeanAtomRightCheckRightActionEnable
    )._checkRightAction_enableOnAtomState({ _atom, actionBase });
    if (_enableOnAtomState !== true) {
      return _enableOnAtomState;
    }
    // actionBase.enableOnAtomStateReverse
    const _enableOnAtomStateReverse = (
      this as unknown as BeanAtomRightCheckRightActionEnable
    )._checkRightAction_enableOnAtomStateReverse({ _atom, actionBase });
    if (_enableOnAtomStateReverse !== true) {
      return _enableOnAtomStateReverse;
    }
    // draft
    if (_atom.atomStage === 0) {
      return await this._checkRightAction_draft({
        atomClass,
        atomClassBase,
        actionBase,
        _atom,
        action,
        user,
        checkFlow,
        options,
      });
    }
    // not draft
    return await this._checkRightAction_not_draft({
      atomClass,
      atomClassBase,
      actionBase,
      _atom,
      action,
      user,
      checkFlow,
    });
  }

  async _checkRightAction_flowAction({ _atom, atomClass, action, user }: any) {
    // actionItem
    const actionItem = await this.ctx.bean.atomAction.model.get({ atomClassId: atomClass.id, code: action });
    if (!actionItem) return null;
    // flowTask
    const task = await this.ctx.bean.flowTask.get({
      options: {
        where: {
          'b.flowNodeDefId': actionItem.nodeDefId,
          'c.flowDefKey': actionItem.flowKey,
          'c.flowAtomId': _atom.id,
          'c.flowAtomClassId': _atom.atomClassId,
        },
        history: 0,
      },
      user,
    });
    return task;
  }

  async _checkRightAction_draft({
    atomClass,
    atomClassBase,
    actionBase,
    _atom,
    action,
    user,
    checkFlow,
    options,
  }: any) {
    // _atomFormal
    let _atomFormal;
    if (_atom.atomIdFormal) {
      _atomFormal = await this.modelAtom.get({ id: _atom.atomIdFormal });
    }
    // self
    const bSelf = _atom.userIdUpdated === user.id;
    // checkFlow: special for comment/stats,etcs.
    if (_atom.atomFlowId > 0 && checkFlow) {
      const flow = await this.ctx.bean.flow.get({ flowId: _atom.atomFlowId, history: true, user });
      if (flow) return _atom;
    }
    // only self or flowTaskId
    if (!bSelf && !options.flowTaskId) return null;
    // viewWorkflow: whether or not closed
    if (action === 16) {
      // should check right
      return await this._checkRightAction_basic({ atomClass, _atom, action, user });
      // return _atom;
    }
    // 1. closed
    if (_atom.atomClosed) {
      // enable on 'self and write', not including 'delete'
      if (bSelf && action === 3) {
        if (_atomFormal) {
          return await this._checkRightAction_base({
            atom: _atomFormal,
            atomClass,
            action,
            stage: 'formal',
            user,
            checkFlow: false,
          });
        }
        return _atom;
      }
      if (![3, 4].includes(action)) {
        return await this._checkRightAction_basic({ atomClass, _atom, action, user });
      }
      return null;
    }
    // 2. flow
    const _enableOnFlowing = await (
      this as unknown as BeanAtomRightCheckRightActionEnable
    )._checkRightAction_enableOnFlowing({
      actionBase,
      atomClassBase,
      _atom,
      _atomAnother: _atomFormal,
    });
    if (_enableOnFlowing !== true) {
      return _enableOnFlowing;
    }
    // 3. write/delete
    if ([3, 4].includes(action)) {
      if (bSelf) {
        return _atom;
      }
      return null;
    }
    // 4. check right
    return await this._checkRightAction_basic({ atomClass, _atom, action, user });
  }

  async _checkRightAction_isFlowing({ atomClassBase, atom, atomAnother }: any) {
    const flowStage = atomClassBase.flow?.stage || 'draft';
    const atomStage = flowStage === 'draft' ? 0 : 1;
    let _atomCheck;
    if (atom?.atomStage === atomStage) {
      _atomCheck = atom;
    } else if (atomAnother?.atomStage === atomStage) {
      _atomCheck = atomAnother;
    }
    if (!_atomCheck) {
      let _atomId;
      if (atomStage === 0) {
        _atomId = atom?.atomIdDraft || atomAnother?.atomIdDraft;
      } else if (atomStage === 1) {
        _atomId = atom?.atomIdFormal || atomAnother?.atomIdFormal;
      }
      if (_atomId) {
        _atomCheck = await this.modelAtom.get({ id: _atomId });
      }
    }
    return _atomCheck && _atomCheck.atomFlowId > 0 && _atomCheck.atomClosed === 0;
  }

  async _checkRightAction_not_draft({ atomClass, atomClassBase, actionBase, _atom, action, user, checkFlow }: any) {
    // draft: must closed
    let _atomDraft;
    if (_atom.atomIdDraft) {
      _atomDraft = await this.modelAtom.get({ id: _atom.atomIdDraft });
    }
    // check draft for ( action 3 + atomStage 1)
    //   not handle for history
    if (
      action === 3 &&
      _atom.atomStage === 1 &&
      _atomDraft &&
      !_atomDraft.atomClosed &&
      _atomDraft.userIdUpdated === user.id
    ) {
      return await this._checkRightAction_base({
        atom: _atomDraft,
        atomClass,
        action,
        stage: 'draft',
        user,
        checkFlow: false,
      });
    }
    // checkFlow
    if (_atom.atomFlowId > 0 && !_atom.atomClosed && checkFlow) {
      const flow = await this.ctx.bean.flow.get({ flowId: _atom.atomFlowId, history: true, user });
      if (flow) return _atom;
    }
    // check enableOnOpened
    const _enableOnOpened = Cast<BeanAtomRightCheckRightActionEnable>(this)._checkRightAction_enableOnOpened({
      _atomDraft,
      actionBase,
    });
    if (_enableOnOpened !== true) {
      return _enableOnOpened;
    }
    // flow
    const _enableOnFlowing = await (
      this as unknown as BeanAtomRightCheckRightActionEnable
    )._checkRightAction_enableOnFlowing({
      actionBase,
      atomClassBase,
      _atom,
      _atomAnother: _atomDraft,
    });
    if (_enableOnFlowing !== true) {
      return _enableOnFlowing;
    }
    // enable/disable
    const _enableOnAtomDisabled = (
      this as unknown as BeanAtomRightCheckRightActionEnable
    )._checkRightAction_enableOnAtomDisabled({ _atom, actionBase });
    if (_enableOnAtomDisabled !== true) {
      return _enableOnAtomDisabled;
    }
    // check basic
    return await this._checkRightAction_basic({ atomClass, _atom, action, user });
  }

  async _checkRightAction_itemOnly({ atomClass, _atom, action, user }: any) {
    // check basic
    return await this._checkRightAction_basic({ atomClass, _atom, action, user });
  }

  async _checkRightAction_basic({ atomClass, _atom, action, user }: any) {
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // special check for itemOnly/enableRight=false
    if (atomClassBase.itemOnly && !atomClassBase.enableRight) {
      return true;
    }
    // forAtomUser
    const forAtomUser = Cast<BeanAtomUtils>(this)._checkForAtomUser(atomClass);
    // check formal/history
    return await this._checkRightAction_sql({
      userIdWho: user.id,
      atomClass,
      atomClassBase,
      atom: _atom,
      action,
      forAtomUser,
    });
  }

  async _checkRightAction_sql({ userIdWho, atomClass, atomClassBase, atom, action, forAtomUser }: any) {
    const sql = await this.sqlProcedure.checkRightAction({
      iid: this.ctx.instance.id,
      userIdWho,
      atomClass,
      atomClassBase,
      atom,
      action,
      forAtomUser,
    });
    if (sql === false) return null;
    if (sql === true) return atom;
    const debug = this.ctx.app.bean.debug.get('atom:right');
    debug('checkRightAction sql: atomId: ', atom.id);
    const res = await this.ctx.model.queryOne(sql);
    debug('checkRightAction sql end: atomId: ', atom.id);
    return res;
  }
}
