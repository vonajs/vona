import { BeanAtomRightCheckRightAction } from './bean.atom_right_checkRightAction.js';
import { BeanAtomRightCheckRightActionBulk } from './bean.atom_right_checkRightActionBulk.js';
import { BeanAtomRightPreferredRoles } from './bean.atom_right_preferredRoles.js';

export class BeanAtomRightActions extends BeanAtomRightPreferredRoles {
  // actions of atom
  async actions({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, basic, user }: any) {
    // atomClass
    const { /* key,*/ atom, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    // containerMode
    const containerMode = options.containerMode;
    // actions
    const actionsRes = await this.__actions_fetchActions({ atom, atomClass, atomClassBase, basic, user });
    // actions res
    const results: any[] = [];
    this.ctx.bean.stash.clear({ options, type: 'checkDetailRightInherit' });
    this.ctx.bean.stash.clear({ options, type: 'prepareAtomSchema' });
    for (const actionRes of actionsRes) {
      actionRes.module = atomClass.module;
      actionRes.atomClassName = atomClass.atomClassName;
      // flow action
      if (actionRes.code < 10000) {
        // just for listing check, not for right check
        const actionBase = this.ctx.bean.base.action({
          module: atomClass.module,
          atomClassName: atomClass.atomClassName,
          code: actionRes.code,
        });
        if (actionBase.mode && containerMode && actionBase.mode !== containerMode) {
          continue;
        }
      }
      // special check formAction
      const formAction = options.formAction;
      let formActionCode;
      if (formAction) {
        formActionCode = this.ctx.bean.atomAction.parseActionCode({
          action: formAction,
          atomClass,
        });
      } else {
        formActionCode = 0;
      }
      if (formActionCode === actionRes.code) {
        // not show the self action
        continue;
      }
      // right check
      const _resCheck = await (this as unknown as BeanAtomRightCheckRightAction)._checkRightAction_inner({
        atom,
        atomClass,
        action: actionRes.code,
        options: { ...options }, // new instance for isolate
        user,
      });
      if (_resCheck) {
        if (_resCheck.__task) {
          actionRes.__task = _resCheck.__task;
        }
        results.push(actionRes);
      }
    }
    this.ctx.bean.stash.clear({ options, type: 'checkDetailRightInherit' });
    this.ctx.bean.stash.clear({ options, type: 'prepareAtomSchema' });
    return results;
  }

  async __actions_fetchActions({ atom, atomClass, atomClassBase, basic, user }: any) {
    // enableRight
    const enableRight = atomClassBase.enableRight;
    if (enableRight) {
      // from db
      let actions = await this.__actions_fetchActions_fromDb({ atomClass, atomClassBase, basic, user });
      if (atom.atomStage === 0) {
        actions = this.__actions_fetchActions_patchDraft({ atomClass, actions });
      }
      return actions;
    }
    // from meta
    return await this.__actions_fetchActions_fromMeta({ atomClass, atomClassBase, basic, user });
  }

  __actions_fetchActions_patchDraft({ atomClass, actions }: any) {
    const checks = [
      { code: 3, name: 'write' },
      { code: 4, name: 'delete' },
    ];
    for (const check of checks) {
      let index = actions.findIndex(item => item.code === check.code);
      if (index > -1) continue;
      const action = {
        atomClassId: atomClass.id,
        action: check.code,
        name: check.name,
        code: check.code,
        bulk: false,
        actionMode: 0,
      };
      index = actions.findIndex(item => item.code > check.code);
      if (index === -1) {
        actions.push(action);
      } else {
        actions.splice(index, 0, action);
      }
    }
    return actions;
  }

  async __actions_fetchActions_fromDb({ atomClass, /* atomClassBase,*/ basic, user }: any) {
    // basic?
    const _basic = basic ? 'and b.code in (3,4)' : '';
    // actionMode=0: not flow action
    const sql = `
          select distinct a.atomClassId,a.action,b.id as actionId,b.name,b.code,b.bulk,b.actionMode from aViewUserRightAtomClass a
            inner join aAtomAction b on a.atomClassId=b.atomClassId and a.action=b.code
              where a.iid=? and a.atomClassId=? and a.userIdWho=? and b.deleted=0 and b.bulk=0 and b.actionMode=0 ${_basic}
                order by a.action asc
        `;
    const items = await this.ctx.model.query(sql, [this.ctx.instance.id, atomClass.id, user.id]);
    return items;
  }

  // async __actions_fetchActions_fromDb({ atomClass, /* atomClassBase,*/ basic, user }: any) {
  //   // basic?
  //   const _basic = basic ? 'and a.code in (3,4)' : '';
  //   // actionMode=0: not flow action
  //   const sql = `
  //     select a.*,b.module,b.atomClassName from aAtomAction a
  //       left join aAtomClass b on a.atomClassId=b.id
  //         where a.iid=? and a.deleted=0 and a.bulk=0 and a.actionMode=0 and a.atomClassId=? ${_basic}
  //           order by a.code asc
  //   `;
  //   return await this.ctx.model.query(sql, [this.ctx.instance.id, atomClass.id]);
  // }

  async __actions_fetchActions_fromMeta({ atomClass, atomClassBase, basic, user }: any) {
    // basic
    if (basic) {
      const actionsRes: any[] = [];
      for (const actionName of ['write', 'delete']) {
        const actionRes = await (
          this as unknown as BeanAtomRightCheckRightActionBulk
        ).__checkRightActionBulk_fetchActions_fromMeta({
          atomClass,
          atomClassBase,
          action: actionName,
          user,
          bulk: false,
        });
        if (actionRes) {
          actionsRes.push(actionRes);
        }
      }
      return actionsRes;
    }
    // all
    return await (this as unknown as BeanAtomRightCheckRightActionBulk).__checkRightActionBulk_fetchActions_fromMeta({
      atomClass,
      atomClassBase,
      user,
      bulk: false,
    });
  }
}
