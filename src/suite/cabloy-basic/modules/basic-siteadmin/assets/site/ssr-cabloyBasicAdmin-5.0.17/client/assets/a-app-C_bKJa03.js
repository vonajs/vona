import { L as BeanControllerBase, l as BeanInfo, U as Use, M as prepareComponentOptions, N as useController, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { P as createVNode, o as defineComponent } from "./vue-CRNsYCTs.js";
import { R as RouterView } from "./vue-router-DwxCgNw3.js";
import { Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor, _ControllerApp;
function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ControllerApp = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "a-app"
}), _dec3 = Use("a-behavior.bean.behaviorsHolder"), _dec4 = Reflect.metadata("design:type", typeof BeanBehaviorsHolder === "undefined" ? Object : BeanBehaviorsHolder), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = (_ControllerApp = class ControllerApp2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$beanBehaviorsHolder", _descriptor, this);
  }
  async __init__() {
    this._initMeta();
    await this._initBehaviors();
  }
  _initMeta() {
    this.$useMeta(() => {
      return {
        title: this.sys.env.APP_TITLE,
        meta: {
          description: {
            name: "description",
            content: this.sys.env.APP_DESCRIPTION
          },
          viewport: {
            name: "viewport",
            content: this.sys.env.APP_META_VIEWPORT
          }
        },
        htmlAttr: {
          lang: this.app.meta.locale.current
        }
      };
    });
  }
  async _initBehaviors() {
    await this.$$beanBehaviorsHolder.initialize({
      behaviorTag: void 0,
      behaviors: () => {
        return this._getAppBehaviors();
      }
    });
  }
  _getAppBehaviors() {
    return this.scope.config.behaviors;
  }
  render() {
    return this.$$beanBehaviorsHolder.render(() => {
      return createVNode(RouterView, null, null);
    });
  }
}, _ControllerApp.$componentOptions = {
  inheritAttrs: false
}, _ControllerApp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$beanBehaviorsHolder", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
const ZApp = defineComponent((_props) => {
  useController(ControllerApp, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerApp.$componentOptions));
const config = (_sys) => {
  return {
    behaviors: {}
  };
};
var _dec, _dec2, _class;
const components = {
  "app": ZApp
};
let ScopeModuleAApp = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-app"
}), _dec(_class = _dec2(_class = class ScopeModuleAApp2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ControllerApp,
  ScopeModuleAApp,
  ZApp,
  components,
  config
};
