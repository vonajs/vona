import { Cast } from '@cabloy/core';
import { BeanAtomRightCheckRightAction } from './bean.atom_right_checkRightAction.js';
import { BeanAtomRightDetailRightInherit } from './bean.atom_right_detailRightInherit.js';

export class BeanAtomRightCheckRightActionBulk extends BeanAtomRightCheckRightAction {
  // atomClass: { id, module, atomClassName }
  async checkRightActionBulk({ atomClass, action, stage, user, options }: any) {
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // normal check
    const res = await this._checkRightActionBulk_normal({ atomClass, action, stage, user, options });
    if (!res) return res;
    // auth open check
    const resAuthOpenCheck = await this.ctx.bean.authOpen.checkRightAtomAction({ atomClass, action });
    if (!resAuthOpenCheck) return null;
    // ok
    return res;
  }

  async _checkRightActionBulk_normal({ atomClass, action, stage, user, options }: any) {
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    const actionRes = await this.__checkRightActionBulk_fetchActions({ atomClass, atomClassBase, action, user });
    return await this.__checkRightActionBulk_check({ atomClass, atomClassBase, actionRes, stage, user, options });
  }

  async __checkRightActionBulk_fetchActions({ atomClass, atomClassBase, action, user }: any) {
    // enableRight
    const enableRight = atomClassBase.enableRight;
    if (enableRight) {
      // from db
      return await this.__checkRightActionBulk_fetchActions_fromDb({ atomClass, atomClassBase, action, user });
    }
    // from meta
    return await this.__checkRightActionBulk_fetchActions_fromMeta({
      atomClass,
      atomClassBase,
      action,
      user,
      bulk: true,
    });
  }

  async __checkRightActionBulk_fetchActions_fromMeta({
    atomClass,
    /* atomClassBase,*/ action,
    user: _user,
    bulk,
  }: any) {
    // meta
    const _module = this.ctx.app.meta.modules[atomClass.module];
    const metaAtomClass = _module.meta.base.atoms[atomClass.atomClassName];
    const metaActions = metaAtomClass.actions;
    // actions
    let actionsRes: any[] = [];
    if (action) {
      const actionBase = this.ctx.bean.base.action({
        module: atomClass.module,
        atomClassName: atomClass.atomClassName,
        code: action,
      });
      if (actionBase && Boolean(actionBase.bulk) === Boolean(bulk) && metaActions[actionBase.name]) {
        actionsRes.push(actionBase);
      }
    } else {
      for (const actionName in metaActions) {
        const actionBase = this.ctx.bean.base.action({
          module: atomClass.module,
          atomClassName: atomClass.atomClassName,
          name: actionName,
        });
        if (actionBase && Boolean(actionBase.bulk) === Boolean(bulk)) {
          actionsRes.push(actionBase);
        }
      }
    }
    // map
    actionsRes = actionsRes.map(item => {
      return {
        id: item.code,
        iid: this.ctx.instance.id,
        atomClassId: atomClass.id,
        code: item.code,
        name: item.name,
        bulk: item.bulk,
        actionMode: 0,
        module: atomClass.module,
        atomClassName: atomClass.atomClassName,
      };
    });
    // ok
    if (action) return actionsRes[0];
    return actionsRes;
  }

  async __checkRightActionBulk_fetchActions_fromDb({ atomClass, atomClassBase, action, user }: any) {
    const params: any = {
      iid: this.ctx.instance.id,
      userIdWho: user.id,
      atomClass,
      atomClassBase,
    };
    if (action) {
      // parse action code
      action = this.ctx.bean.atomAction.parseActionCode({
        action,
        atomClass,
      });
      params.action = action;
    }
    // sql
    const sql = this.sqlProcedure.checkRightActionBulk(params);
    if (action) {
      return await this.ctx.model.queryOne(sql);
    }
    return await this.ctx.model.query(sql);
  }

  async __checkRightActionBulk_check({ atomClass, atomClassBase, actionRes, stage, user, options }: any) {
    if (!actionRes) return actionRes;
    // check detail
    const detailRightInherit = await Cast<BeanAtomRightDetailRightInherit>(this)._checkDetailRightInherit({
      atomClass,
      atomClassBase,
      action: actionRes.name,
      user,
      options,
    });
    if (!detailRightInherit) return null;
    // check if itemOnly
    if (atomClassBase.itemOnly) return actionRes;
    // not care about stage
    if (!stage) return actionRes;
    // action base
    const actionBase = this.ctx.bean.base.action({
      module: actionRes.module,
      atomClassName: actionRes.atomClassName,
      code: actionRes.code,
    });
    if (!actionBase) {
      if (actionRes.code < 10000) {
        await this.ctx.bean.atomAction.delete({ atomClassId: actionRes.atomClassId, code: actionRes.code });
      }
      return null;
    }
    if (actionBase.stage) {
      const stages = actionBase.stage.split(',');
      if (!stages.some(item => item === stage)) return null;
    }
    return actionRes;
  }
}
