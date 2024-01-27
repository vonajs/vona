import { BeanAtomBasePerformAction } from './bean.atomBase_performAction.js';

export class BeanAtomBasePerformActionBulk extends BeanAtomBasePerformAction {
  async performActionBulk({ keys, atomClass, action, item, options, user, fnBefore, fnAfter }: any) {
    // actionBase
    const actionBase = this.ctx.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      name: action,
    });
    return await this._performActionBulk_policyHandle({
      actionBase,
      keys,
      atomClass,
      action,
      item,
      options,
      user,
      fnBefore,
      fnAfter,
    });
  }

  async _performActionBulk_policyHandle({
    actionBase,
    keys,
    atomClass,
    action,
    item,
    options,
    user,
    fnBefore,
    fnAfter,
  }) {
    // performAction
    const performActionConfig = this.ctx.bean.util.getProperty(actionBase, 'params.performAction');
    if (!performActionConfig) return null;
    // policy
    const performPolicy = performActionConfig.policy;
    const performActionItem = performActionConfig.actionItem;
    if (performPolicy === 'loop') {
      return await this.performActionBulk_policyLoop({
        keys,
        atomClass,
        action,
        item,
        options,
        user,
        actionItem: performActionItem,
        fnBefore,
        fnAfter,
      });
    }
    return null;
  }

  async performActionBulk_policyLoop({
    keys,
    atomClass,
    action: _action,
    item,
    options,
    user,
    actionItem,
    fnBefore,
    fnAfter,
  }) {
    const resKeys: any[] = [];
    for (const key of keys) {
      // check right action
      const right = await this.ctx.bean.atom.checkRightAction({
        atom: { id: key.atomId },
        atomClass,
        action: actionItem,
        user,
      });
      if (!right) continue;
      // fnBefore
      if (fnBefore) {
        await fnBefore({ key, actionItem });
      }
      // over
      await this.performAction({ key, atomClass, action: actionItem, item, options, user });
      // fnAfter
      if (fnAfter) {
        await fnAfter({ key, actionItem });
      }
      // ok
      resKeys.push(key);
    }
    return { keys: resKeys };
  }
}
