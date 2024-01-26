import { BeanBase0 } from './bean.base_0.js';

const _actions = {};

export class BeanBaseActions extends BeanBase0 {
  actions() {
    if (!_actions[this.ctx.locale]) {
      _actions[this.ctx.locale] = this._prepareActions();
    }
    return _actions[this.ctx.locale];
  }

  actionsBase({ module, atomClassName }) {
    const _actions = this.actions();
    return _actions[module] && _actions[module][atomClassName];
  }

  action({ module, atomClassName, code, name }) {
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
    return actions[key];
  }

  _prepareActions() {
    const actions = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      if (module.main.meta && module.main.meta.base && module.main.meta.base.atoms) {
        const res = {};
        for (const atomClassName in module.main.meta.base.atoms) {
          const res2 = this._prepareActionsAtomClass(module, module.main.meta.base.atoms[atomClassName]);
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
    const constantAtom = this.ctx.constant.module().atom;
    return atomClass.info.itemOnly ? constantAtom.actionMetaItemOnly : constantAtom.actionMeta;
  }

  _prepareActionsAtomClass_actionsSystemMetaDetail(atomClass) {
    if (!atomClass.info.detail) return null;
    const constantDetail = this.ctx.constant.module('a-detail').detail;
    return atomClass.info.detail.inline ? constantDetail.actionMeta : constantDetail.actionMetaNotInline;
  }

  _prepareActionsAtomClass(module, atomClass) {
    const actions = {};
    const _actions = atomClass.actions;
    const _actionsSystem = this.ctx.constant.module().atom.action;
    const _actionsSystemMeta = this._prepareActionsAtomClass_actionsSystemMetaAtom(atomClass);
    const _actionsSystemMetaDetail = this._prepareActionsAtomClass_actionsSystemMetaDetail(atomClass);
    const _actionsAll = this.ctx.bean.util.extend({}, _actionsSystemMeta, _actionsSystemMetaDetail, _actions);
    for (const key in _actionsAll) {
      if (key === 'custom') continue;
      const action = _actionsAll[key];
      if (!action.code) action.code = _actionsSystem[key];
      action.name = key;
      action.titleLocale = this.ctx.text(action.title);
      actions[key] = action;
    }
    return actions;
  }
}
