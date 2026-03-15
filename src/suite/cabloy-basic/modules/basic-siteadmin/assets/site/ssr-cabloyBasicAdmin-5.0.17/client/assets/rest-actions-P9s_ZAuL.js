import { Action } from "./a-action-8vTCicfl.js";
import { n as BeanBase, l as BeanInfo, m as cast, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$8, _dec2$8, _class$8;
let ActionAlert = (_dec$8 = Action({
  wait: true
}), _dec2$8 = BeanInfo({
  module: "rest-actions"
}), _dec$8(_class$8 = _dec2$8(_class$8 = class ActionAlert2 extends BeanBase {
  execute(options, _renderContext, next) {
    if (options.wait) {
      window.alert(options.message);
    } else {
      setTimeout(() => {
        window.alert(options.message);
      }, 0);
    }
    return next();
  }
}) || _class$8) || _class$8);
var _dec$7, _dec2$7, _class$7;
let ActionConfirm = (_dec$7 = Action(), _dec2$7 = BeanInfo({
  module: "rest-actions"
}), _dec$7(_class$7 = _dec2$7(_class$7 = class ActionConfirm2 extends BeanBase {
  execute(options, _renderContext, next) {
    const res = window.confirm(options.message);
    return next(res);
  }
}) || _class$7) || _class$7);
var _dec$6, _dec2$6, _class$6;
let ActionCopy = (_dec$6 = Action(), _dec2$6 = BeanInfo({
  module: "rest-actions"
}), _dec$6(_class$6 = _dec2$6(_class$6 = class ActionCopy2 extends BeanBase {
  execute(options, _renderContext, next) {
    const res = navigator.clipboard.writeText(options.text);
    return next(res);
  }
}) || _class$6) || _class$6);
var _dec$5, _dec2$5, _class$5;
let ActionCreate = (_dec$5 = Action(), _dec2$5 = BeanInfo({
  module: "rest-actions"
}), _dec$5(_class$5 = _dec2$5(_class$5 = class ActionCreate2 extends BeanBase {
  execute(options, renderContext, next) {
    const {
      $host
    } = renderContext;
    let resource;
    if (renderContext.$scene === "page") {
      const {
        $celScope
      } = renderContext;
      resource = options.resource ?? $celScope.resource;
    }
    if (!resource) throw new Error(`should specify resource in scene: ${renderContext.$scene}`);
    const url = $host.$router.getPagePath("/rest/resource/:resource/create", {
      params: {
        resource
      }
    });
    $host.$router.push(url);
    return next();
  }
}) || _class$5) || _class$5);
var _dec$4, _dec2$4, _class$4;
let ActionDelete = (_dec$4 = Action(), _dec2$4 = BeanInfo({
  module: "rest-actions"
}), _dec$4(_class$4 = _dec2$4(_class$4 = class ActionDelete2 extends BeanBase {
  async execute(options, renderContext, next) {
    if (renderContext.$scene === "tableCell") {
      const {
        $celScope,
        cellContext
      } = renderContext;
      const id = options.id ?? cellContext.row.id;
      await $celScope.onActionRow?.("delete", id);
    }
    return next();
  }
}) || _class$4) || _class$4);
var _dec$3, _dec2$3, _class$3;
let ActionEdit = (_dec$3 = Action(), _dec2$3 = BeanInfo({
  module: "rest-actions"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class ActionEdit2 extends BeanBase {
  execute(options, renderContext, next) {
    const {
      $host
    } = renderContext;
    let resource;
    let id;
    if (renderContext.$scene === "tableCell") {
      const {
        $celScope,
        cellContext
      } = renderContext;
      resource = options.resource ?? $celScope.resource;
      id = options.id ?? cellContext.row.id;
    }
    if (!resource || !id) throw new Error(`should specify resource or id in scene: ${renderContext.$scene}`);
    const url = $host.$router.getPagePath("/rest/resource/:resource/:id/:formScene?", {
      params: {
        resource,
        id,
        formScene: "edit"
      }
    });
    $host.$router.push(url);
    return next();
  }
}) || _class$3) || _class$3);
var _dec$2, _dec2$2, _class$2;
let ActionSetValue = (_dec$2 = Action(), _dec2$2 = BeanInfo({
  module: "rest-actions"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class ActionSetValue2 extends BeanBase {
  execute(options, renderContext, next) {
    if (renderContext.$scene === "formField") {
      const {
        $celScope,
        $jsx,
        $$form
      } = renderContext;
      const name = options.name ?? $celScope.name;
      const value = options.value !== void 0 ? options.value : cast($jsx.event?.target)?.value;
      $$form.setFieldValue(name, value, options.disableNotifyChanged);
    }
    return next();
  }
}) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let ActionView = (_dec$1 = Action(), _dec2$1 = BeanInfo({
  module: "rest-actions"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ActionView2 extends BeanBase {
  execute(options, renderContext, next) {
    const {
      $host
    } = renderContext;
    let resource;
    let id;
    if (renderContext.$scene === "tableCell") {
      const {
        $celScope,
        cellContext
      } = renderContext;
      resource = options.resource ?? $celScope.resource;
      id = options.id ?? cellContext.row.id;
    }
    if (!resource || !id) throw new Error(`should specify resource or id in scene: ${renderContext.$scene}`);
    const url = $host.$router.getPagePath("/rest/resource/:resource/:id/:formScene?", {
      params: {
        resource,
        id
      }
    });
    $host.$router.push(url);
    return next();
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
let ScopeModuleRestActions = (_dec = Scope(), _dec2 = BeanInfo({
  module: "rest-actions"
}), _dec(_class = _dec2(_class = class ScopeModuleRestActions2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ActionAlert,
  ActionConfirm,
  ActionCopy,
  ActionCreate,
  ActionDelete,
  ActionEdit,
  ActionSetValue,
  ActionView,
  ScopeModuleRestActions
};
