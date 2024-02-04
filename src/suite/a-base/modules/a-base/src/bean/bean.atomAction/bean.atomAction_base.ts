import { ScopeModule, __ThisModule__ } from '../../resource/this.js';
import { BeanModuleScopeBase } from '@cabloy/core';

export class BeanAtomActionBase extends BeanModuleScopeBase<ScopeModule> {
  get model() {
    return this.scope.model.atomAction;
  }

  async delete({ atomClassId, code }: any) {
    // delete roleRight
    await this.ctx.bean.role.deleteRoleRightByAction({
      atomClassId,
      action: code,
    });
    // delete
    await this.model.delete({ atomClassId, code });
  }

  async update(data) {
    await this.model.update(data);
  }

  async init({ atomClass, actions, action }: any) {
    // actions
    if (action) {
      actions = [action];
    } else if (typeof actions === 'string') {
      actions = actions.split(',');
    }
    // atomClassId
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassId = atomClass.id;
    // loop
    for (const _action of actions) {
      const code = this.parseActionCode({ action: _action, atomClass });
      await this.get({ atomClassId, code });
    }
  }

  async get({ id, atomClassId, code }: any) {
    const data = id ? { id } : { atomClassId, code };
    const res = await this.model.get(data);
    if (res) return res;
    // lock
    return await this.ctx.meta.util.lock({
      resource: `${__ThisModule__}.atomAction.register`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanModule: __ThisModule__,
          beanFullName: 'atomAction',
          context: { atomClassId, code },
          fn: '_registerLock',
        });
      },
    });
  }

  parseActionCode({ action, atomClass }: any) {
    // is number
    if (!isNaN(action)) return parseInt(action);
    // add role right
    const actionCode = this.ctx.constant.module('a-base').atom.action[action];
    if (actionCode) return actionCode;
    // atomClass
    if (!atomClass) throw new Error(`should specify the atomClass of action: ${action}`);
    const actions = this.ctx.bean.base.actions();
    const _action = actions[atomClass.module][atomClass.atomClassName][action];
    if (!_action) throw new Error(`atom action not found: ${atomClass.module}:${atomClass.atomClassName}.${action}`);
    return _action.code;
  }

  getCreateDelay({ atomClass }: any) {
    const actionBase = this.ctx.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      code: 1,
    });
    return actionBase.createDelay;
  }

  async _registerLock({ atomClassId, code }: any) {
    return await this._registerLock_inner({ atomClassId, code });
  }

  async _registerLock_inner({ atomClassId, code }: any) {
    // get
    const res = await this.model.get({ atomClassId, code });
    if (res) return res;
    const atomClass = await this.ctx.bean.atomClass.get({ id: atomClassId });
    const action = this.ctx.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      code,
    });
    const data: any = {
      atomClassId,
      code,
      name: action.name,
      bulk: action.bulk || 0,
    };
    // insert
    const res2 = await this.model.insert(data);
    data.id = res2.insertId;
    return data;
  }
}
