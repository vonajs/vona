import { h as deepExtend, a7 as useComputed, am as mutate, l as BeanInfo, U as Use, M as prepareComponentOptions, N as useController, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { BeanModelBase, Model } from "./a-model-DdQjWvuo.js";
import { Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import { BeanRouterViewBase } from "./a-router-CjBFMDNv.js";
import { o as defineComponent } from "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
import "./vue-router-DwxCgNw3.js";
var _dec$2, _dec2$2, _class$2;
let ModelStack$1 = (_dec$2 = Model({
  enableSelector: true,
  max: -1
}), _dec2$2 = BeanInfo({
  module: "a-routerstack"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class ModelStack2 extends BeanModelBase {
  constructor(...args) {
    super(...args);
    this.stackOptions = void 0;
    this.tabs = void 0;
    this.keepAliveInclude = void 0;
  }
  async __init__(scene, options) {
    await super.__init__(scene);
    this.bean._setBean("$$modelStack", this);
    this.stackOptions = deepExtend({}, this.$onionOptions, options);
    this.tabs = [];
    this.keepAliveInclude = useComputed(() => {
      return this._getKeepAliveInclude();
    });
    if (this.$currentRoute) {
      this.forwardRoute(this.$currentRoute);
    }
  }
  addTab(tab) {
    return this._addTab(tab);
  }
  _addTab(tab) {
    const tabKey = tab.tabKey;
    if (!tabKey) return false;
    const [index, tabOld] = this.findTab(tabKey);
    if (index === -1) {
      const tabNew = {
        tabKey,
        updatedAt: Date.now()
      };
      this.tabs = mutate(this.tabs, (copyState) => {
        copyState.push(tabNew);
      });
      this.pruneTabs();
    } else {
      if (!this._checkIfTabNeedUpdate(tabOld, tab)) {
        return false;
      }
      this.updateTab(tab);
    }
    return true;
  }
  findTab(tabKey) {
    if (!tabKey) return [-1, void 0];
    const index = this.tabs.findIndex((item) => item.tabKey === tabKey);
    if (index === -1) return [index, void 0];
    return [index, this.tabs[index]];
  }
  deleteTab(tabKey) {
    if (!tabKey) return false;
    const [index] = this.findTab(tabKey);
    if (index === -1) return false;
    this.tabs = mutate(this.tabs, (copyState) => {
      copyState.splice(index, 1);
    });
    return true;
  }
  updateTab(tab) {
    const tabKey = tab.tabKey;
    const [index, tabOld] = this.findTab(tabKey);
    if (index === -1 || !tabOld) return;
    const tabNew = {
      ...tabOld,
      tabKey,
      updatedAt: Date.now()
    };
    this.tabs = mutate(this.tabs, (copyState) => {
      copyState.splice(index, 1, tabNew);
    });
  }
  async pruneTabs() {
    let max = this.stackOptions.max;
    if (max === void 0 || max === -1) return;
    if (max < 1) max = 1;
    while (true) {
      if (this.tabs.length <= max) break;
      let tabKey;
      let updatedAt = Date.now();
      for (const tab of this.tabs) {
        if (tab.updatedAt < updatedAt) {
          tabKey = tab.tabKey;
          updatedAt = tab.updatedAt;
        }
      }
      if (!tabKey) break;
      this.deleteTab(tabKey);
    }
  }
  // special for _addTab
  _checkIfTabNeedUpdate(tabOld, _tabNew) {
    const recentTabIndex = this.tabs.findIndex((item) => item.tabKey !== tabOld.tabKey && (item.updatedAt ?? 0) >= (tabOld.updatedAt ?? 0));
    if (recentTabIndex > -1) return true;
    return false;
  }
  _getKeepAliveInclude() {
    const include = [];
    for (const tab of this.tabs) {
      if (!include.includes(tab.tabKey)) {
        include.push(tab.tabKey);
      }
    }
    return include;
  }
  backRoute(route) {
    this.deleteTab(route.fullPath);
  }
  forwardRoute(route) {
    const componentMeta = this.prepareRouteMeta(route);
    this.addTab(componentMeta);
  }
  prepareRouteMeta(route) {
    const fullPath = route.fullPath;
    return {
      tabKey: fullPath,
      componentKey: fullPath,
      fullPath
    };
  }
}) || _class$2) || _class$2);
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor, _ControllerRouterViewStack;
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
let ControllerRouterViewStack = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "a-routerstack"
}), _dec3 = Use({
  injectionScope: "skipSelf"
}), _dec4 = Reflect.metadata("design:type", typeof ModelStack === "undefined" ? Object : ModelStack), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = (_ControllerRouterViewStack = class ControllerRouterViewStack2 extends BeanRouterViewBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$modelStack", _descriptor, this);
  }
  backRoute(route) {
    this.$$modelStack.backRoute(route);
    return true;
  }
  forwardRoute(route) {
    this.$$modelStack.forwardRoute(route);
    return true;
  }
  prepareRouteMeta(route) {
    return this.$$modelStack.prepareRouteMeta(route);
  }
  getKeepAliveInclude() {
    return this.$$modelStack.keepAliveInclude;
  }
}, _ControllerRouterViewStack.$propsDefault = {}, _ControllerRouterViewStack), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$modelStack", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
const ZRouterViewStack = defineComponent((_props) => {
  useController(ControllerRouterViewStack, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec, _dec2, _class;
const components = {
  "routerViewStack": ZRouterViewStack
};
let ScopeModuleARouterstack = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-routerstack"
}), _dec(_class = _dec2(_class = class ScopeModuleARouterstack2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ControllerRouterViewStack,
  ModelStack$1 as ModelStack,
  ScopeModuleARouterstack,
  ZRouterViewStack,
  components
};
