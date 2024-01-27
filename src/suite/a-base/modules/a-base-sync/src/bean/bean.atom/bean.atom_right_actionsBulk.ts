import { BeanAtomRightActions } from './bean.atom_right_actions.js';

export class BeanAtomRightActionsBulk extends BeanAtomRightActions {
  // actionsBulk of atomClass
  async actionsBulk({ atomClass, options, user }: any) {
    options = options || {};
    const stage = options.stage;
    const containerMode = options.containerMode;
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    const actionsRes = await this.__checkRightActionBulk_fetchActions({ atomClass, atomClassBase, user });
    const results: any[] = [];
    this.ctx.bean.stash.clear({ options, type: 'checkDetailRightInherit' });
    for (const actionRes of actionsRes) {
      // just for listing check, not for right check
      const actionBase = this.ctx.bean.base.action({
        module: actionRes.module,
        atomClassName: actionRes.atomClassName,
        code: actionRes.code,
      });
      if (actionBase.mode && containerMode && actionBase.mode !== containerMode) {
        continue;
      }
      // right check
      const _resCheck = await this.__checkRightActionBulk_check({
        atomClass,
        atomClassBase,
        actionRes,
        stage,
        options: { ...options }, // new instance for isolate
        user,
      });
      if (_resCheck) {
        results.push(_resCheck);
      }
    }
    this.ctx.bean.stash.clear({ options, type: 'checkDetailRightInherit' });
    return results;
  }
}
