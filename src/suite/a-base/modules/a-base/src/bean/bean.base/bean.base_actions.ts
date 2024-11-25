import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanBase0 } from './bean.base_0.js';

const _actions: any = {};

export class BeanBaseActions extends BeanBase0 {
  actions() {
    if (!_actions[this.ctx.locale]) {
      _actions[this.ctx.locale] = this._prepareActions();
    }
    return _actions[this.ctx.locale];
  }

  actionsBase({ module, atomClassName }: any) {
    const _actions = this.actions();
    return _actions[module] && _actions[module][atomClassName];
  }

  action({ module, atomClassName, code, name }: any) {
    // prepare
    if (name && !isNaN(name)) {
      code = parseInt(name);
      name = null;
    } else if (code && isNaN(code)) {
      name = code;
      code = null;
    }
    // actions
    const actions = this.actionsBase({ module, atomClassName });
    if (name) return actions[name];
    const key = Object.keys(actions).find(key => actions[key].code === code);
    return actions[key!];
  }

  _prepareActions() {
    const actions: any = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      if (module.meta && module.meta.base && module.meta.base.atoms) {
        const res: any = {};
        for (const atomClassName in module.meta.base.atoms) {
          const res2 = this._prepareActionsAtomClass(module, module.meta.base.atoms[atomClassName]);
          if (Object.keys(res2).length > 0) {
            res[atomClassName] = res2;
          }
        }
        if (Object.keys(res).length > 0) {
          actions[relativeName] = res;
        }
      }
    }
    return actions;
  }

  _prepareActionsAtomClass_actionsSystemMetaAtom(atomClass) {
    const constantAtom = this.scope.constant.atom;
    return atomClass.info.itemOnly ? constantAtom.actionMetaItemOnly : constantAtom.actionMeta;
  }

  _prepareActionsAtomClass_actionsSystemMetaDetail(atomClass) {
    if (!atomClass.info.detail) return null;
    const constantDetail = this.$scope.detail.constant.detail;
    return atomClass.info.detail.inline ? constantDetail.actionMeta : constantDetail.actionMetaNotInline;
  }

  _prepareActionsAtomClass(_module, atomClass) {
    const actions: any = {};
    const _actions = atomClass.actions;
    const _actionsSystem = this.scope.constant.atom.action;
    const _actionsSystemMeta = this._prepareActionsAtomClass_actionsSystemMetaAtom(atomClass);
    const _actionsSystemMetaDetail = this._prepareActionsAtomClass_actionsSystemMetaDetail(atomClass);
    const _actionsAll = this.app.bean.util.extend({}, _actionsSystemMeta, _actionsSystemMetaDetail, _actions);
    for (const key in _actionsAll) {
      if (key === 'custom') continue;
      const action = _actionsAll[key];
      if (!action.code) action.code = _actionsSystem[key];
      action.name = key;
      action.titleLocale = this.app.text(action.title);
      actions[key] = action;
    }
    return actions;
  }
}
