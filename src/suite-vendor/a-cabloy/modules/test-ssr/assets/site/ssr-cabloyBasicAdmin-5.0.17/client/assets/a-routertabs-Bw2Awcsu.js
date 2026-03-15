import { h as deepExtend, a7 as useComputed, am as mutate, Q as deepEqual, l as BeanInfo, U as Use, M as prepareComponentOptions, N as useController, v as BeanScopeBase } from "./zova-QgocPMzS.js";
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
let ModelTabs$1 = (_dec$2 = Model({
  enableSelector: true,
  max: -1,
  maxItems: -1,
  cache: false
}), _dec2$2 = BeanInfo({
  module: "a-routertabs"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class ModelTabs2 extends BeanModelBase {
  constructor(...args) {
    super(...args);
    this.tabsOptions = void 0;
    this.tabs = void 0;
    this.componentKeyCurrent = void 0;
    this.tabKeyCurrent = void 0;
    this.tabCurrentIndex = void 0;
    this.tabCurrent = void 0;
    this.keepAliveInclude = void 0;
    this._eventSsrHmrReload = void 0;
  }
  async __init__(scene, options) {
    await super.__init__(scene);
    this.bean._setBean("$$modelTabs", this);
    this.tabsOptions = deepExtend({}, this.$onionOptions, options);
    this.tabCurrentIndex = useComputed(() => {
      const [index] = this.findTab(this.tabKeyCurrent);
      return index;
    });
    this.tabCurrent = useComputed(() => {
      const [, tab] = this.findTab(this.tabKeyCurrent);
      return tab;
    });
    this.keepAliveInclude = useComputed(() => {
      return this._getKeepAliveInclude();
    });
    const queryOptionsComponentKeyCurrent = {
      queryKey: ["componentKeyCurrent"]
    };
    this.componentKeyCurrent = this.$useStateMem(queryOptionsComponentKeyCurrent);
    const queryOptionsTabKeyCurrent = {
      queryKey: ["tabKeyCurrent"]
    };
    this.tabKeyCurrent = this.$useStateMem(queryOptionsTabKeyCurrent);
    const queryOptionsTabs = {
      queryKey: ["tabs"],
      meta: {
        defaultData: this._getInitialTabs()
      }
    };
    if (this.tabsOptions.cache) {
      this.tabs = this.$useStateDb(queryOptionsTabs);
    } else {
      this.tabs = this.$useStateMem(queryOptionsTabs);
    }
    if (this.tabsOptions.cache) {
      await this.$loadStateDb(this.tabs);
    }
    if (this.$currentRoute) {
      this.forwardRoute(this.$currentRoute);
    }
    if (this.sys.env.SSR_HMR === "true") {
      this._eventSsrHmrReload = this.sys.meta.event.on("a-ssrhmr:reload", async (_data, next) => {
        this.updateAllTabInfos();
        return next();
      });
    }
    this.$watch(() => {
      return this.app.meta.locale.current;
    }, () => {
      this.updateAllTabInfos();
    });
  }
  __dispose__() {
    if (this._eventSsrHmrReload) {
      this._eventSsrHmrReload();
    }
  }
  get cache() {
    return this.tabsOptions.cache;
  }
  // need not async
  addTab(tab, affix) {
    const res = this._addTab(tab, affix);
    this.tabKeyCurrent = res ? tab.tabKey : void 0;
    this.componentKeyCurrent = res ? tab.componentKey : void 0;
    return res;
  }
  // need not async
  _addTab(tab, affix) {
    const tabKey = tab.tabKey;
    if (!tabKey) return false;
    const [index, tabOld] = this.findTab(tabKey);
    const tabInfo = this.tabsOptions.getTabInfo?.(tabKey) ?? tabOld?.info;
    if (!tabInfo) return false;
    if (index === -1) {
      const items = tab.componentKey ? [{
        componentKey: tab.componentKey,
        fullPath: tab.fullPath,
        keepAlive: tab.keepAlive,
        updatedAt: Date.now()
      }] : [];
      const tabNew = {
        tabKey,
        affix,
        items,
        updatedAt: Date.now(),
        info: tabInfo
      };
      if (this.tabCurrentIndex === -1) {
        this.tabs = mutate(this.tabs, (copyState) => {
          copyState.push(tabNew);
        });
      } else {
        this.tabs = mutate(this.tabs, (copyState) => {
          copyState.splice(this.tabCurrentIndex + 1, 0, tabNew);
        });
      }
      this.pruneTabs();
    } else {
      if (!deepEqual(tabInfo, tabOld?.info)) {
        this.updateTabInfo(tabKey);
      }
      if (!this._checkIfTabNeedUpdate(tabOld, tab)) {
        return true;
      }
      this.updateTab(tab);
      this.pruneTabItems(tabKey);
    }
    return true;
  }
  updateAllTabInfos(tabInitials) {
    for (const tab of this.tabs) {
      const tabInitial = tabInitials?.find((item) => item.tabKey === tab.tabKey);
      this.updateTabInfo(tab.tabKey, tabInitial);
    }
  }
  updateTabInfo(tabKey, tabInitial) {
    if (!tabKey) return;
    const [index, tabOld] = this.findTab(tabKey);
    if (index === -1) return;
    const tabInfo = this.tabsOptions.getTabInfo ? this.tabsOptions.getTabInfo(tabKey) : tabInitial?.info ?? tabOld?.info;
    if (!tabInfo) return;
    const tabNew = {
      ...tabOld,
      info: tabInfo
    };
    this.updateTab(tabNew);
  }
  updateTabItemPageMeta(tabKey, componentKey, pageMeta) {
    if (!tabKey || !componentKey) return false;
    const [index, tab] = this.findTab(tabKey);
    if (index === -1 || !tab) return false;
    if (!tab.items) return false;
    const indexItem = tab.items.findIndex((item) => item.componentKey === componentKey);
    if (indexItem === -1) return false;
    const tabItem = tab.items[indexItem];
    const pageMetaNew = {
      ...tabItem.pageMeta,
      ...pageMeta
    };
    const tabItemNew = {
      ...tabItem,
      pageMeta: pageMetaNew
    };
    const items = mutate(tab.items, (copyState) => {
      copyState.splice(indexItem, 1, tabItemNew);
    });
    const tabNew = {
      ...tab,
      items
    };
    this.tabs = mutate(this.tabs, (copyState) => {
      copyState.splice(index, 1, tabNew);
    });
    return true;
  }
  async deleteTab(tabKey, noActiveNext) {
    if (!tabKey) return;
    const [index] = this.findTab(tabKey);
    if (index === -1) return;
    let tabKeyActiveNext;
    if (!noActiveNext && index === this.tabCurrentIndex) {
      const tabCurrentIndex = index - 1 > -1 ? index - 1 : index + 1 < this.tabs.length ? index + 1 : -1;
      if (tabCurrentIndex > -1) {
        tabKeyActiveNext = this.tabs[tabCurrentIndex]?.tabKey;
      }
    }
    this.tabs = mutate(this.tabs, (copyState) => {
      copyState.splice(index, 1);
    });
    if (tabKeyActiveNext) {
      await this.activeTab(tabKeyActiveNext);
    }
  }
  async deleteTabItem(tabKey, componentKey, noActiveNext) {
    if (!tabKey || !componentKey) return false;
    if (tabKey === componentKey) return false;
    const [index, tab] = this.findTab(tabKey);
    if (index === -1 || !tab) return false;
    if (!tab.items) return false;
    const indexItem = tab.items.findIndex((item) => item.componentKey === componentKey);
    if (indexItem === -1) return false;
    if (tab.items.length === 1 && !tab.affix) {
      await this.deleteTab(tabKey, noActiveNext);
    } else {
      const items = mutate(tab.items, (copyState) => {
        copyState.splice(indexItem, 1);
      });
      const tabNew = {
        ...tab,
        items
      };
      this.tabs = mutate(this.tabs, (copyState) => {
        copyState.splice(index, 1, tabNew);
      });
    }
    return true;
  }
  findTabItemByFullPath(fullPath) {
    for (const tab of this.tabs) {
      if (!tab.items) continue;
      for (const item of tab.items) {
        if (item.fullPath === fullPath) {
          return [tab.tabKey, item.componentKey];
        }
      }
    }
    return [];
  }
  updateTab(tab) {
    const tabKey = tab.tabKey;
    const [index, tabOld] = this.findTab(tabKey);
    if (index === -1 || !tabOld) return;
    const items = tabOld.items ? [].concat(tabOld.items) : [];
    if (tab.componentKey) {
      const tabItem = {
        componentKey: tab.componentKey,
        fullPath: tab.fullPath,
        keepAlive: tab.keepAlive,
        updatedAt: Date.now()
      };
      const index2 = items.findIndex((item) => item.componentKey === tab.componentKey);
      if (index2 === -1) {
        items.push(tabItem);
      } else {
        const tabItemNew = {
          ...items[index2],
          ...tabItem
        };
        items.splice(index2, 1, tabItemNew);
      }
      items.sort((a, b) => (a.componentKey === tabKey ? 0 : 1) - (b.componentKey === tabKey ? 0 : 1));
    }
    const tabNew = {
      ...tabOld,
      ...tab,
      tabKey,
      items,
      updatedAt: Date.now()
    };
    this.tabs = mutate(this.tabs, (copyState) => {
      copyState.splice(index, 1, tabNew);
    });
  }
  async activeTab(tabKey) {
    if (!tabKey) return;
    const [_, tab] = this.findTab(tabKey);
    if (!tab) return;
    const tabItemFirst = tab.items?.[0];
    const path = tabItemFirst?.componentKey === tabKey ? tabItemFirst.fullPath : tabKey;
    await this.$router.push(path);
  }
  async activeTabItem(tabKey, componentKey) {
    if (!tabKey || !componentKey) return;
    const [_, tab] = this.findTab(tabKey);
    if (!tab) return;
    const tabItem = tab.items?.find((item) => item.componentKey === componentKey);
    if (!tabItem) return;
    const path = tabItem.fullPath;
    await this.$router.push(path);
  }
  findTab(tabKey) {
    if (!tabKey) return [-1, void 0];
    const index = this.tabs.findIndex((item) => item.tabKey === tabKey);
    if (index === -1) return [index, void 0];
    return [index, this.tabs[index]];
  }
  async pruneTabs() {
    let max = this.tabsOptions.max;
    if (max === void 0 || max === -1) return;
    if (max < 1) max = 1;
    while (true) {
      const affixCount = this.tabs.filter((item) => item.affix).length;
      if (this.tabs.length - affixCount <= max) break;
      let tabKey;
      let updatedAt = Date.now();
      for (const tab of this.tabs) {
        if (!tab.affix && tab.updatedAt < updatedAt) {
          tabKey = tab.tabKey;
          updatedAt = tab.updatedAt;
        }
      }
      if (!tabKey) break;
      await this.deleteTab(tabKey, true);
    }
  }
  async pruneTabItems(tabKey) {
    if (!tabKey) return;
    let maxItems = this.tabsOptions.maxItems;
    if (maxItems === void 0 || maxItems === -1) return;
    if (maxItems < 1) maxItems = 1;
    while (true) {
      const [_, tab] = this.findTab(tabKey);
      if (!tab || !tab.items) break;
      const ignoreCount = tab.items.filter((item) => item.componentKey === tabKey).length;
      if (tab.items.length - ignoreCount <= maxItems) break;
      let componentKey;
      let updatedAt = Date.now();
      for (const tabItem of tab.items) {
        if (tabItem.componentKey !== tabKey && tabItem.updatedAt < updatedAt) {
          componentKey = tabItem.componentKey;
          updatedAt = tabItem.updatedAt;
        }
      }
      if (!componentKey) break;
      await this.deleteTabItem(tabKey, componentKey, true);
    }
  }
  // special for _addTab
  _checkIfTabNeedUpdate(tabOld, tabNew) {
    for (const key in tabNew) {
      if (["fullPath", "keepAlive", "updatedAt"].includes(key)) continue;
      if (["componentKey"].includes(key)) {
        if (!tabOld.items) return true;
        const tabItemOld = tabOld.items.find((item) => item[key] === tabNew[key]);
        if (!tabItemOld) return true;
        for (const key2 of ["fullPath", "keepAlive"]) {
          if (tabItemOld[key2] !== tabNew[key2]) return true;
        }
        const recentItemIndex = tabOld.items.findIndex((item) => item[key] !== tabItemOld[key] && (item.updatedAt ?? 0) >= (tabItemOld.updatedAt ?? 0));
        if (recentItemIndex > -1) return true;
      } else if (tabNew[key] !== tabOld[key]) {
        return true;
      }
    }
    const recentTabIndex = this.tabs.findIndex((item) => item.tabKey !== tabOld.tabKey && (item.updatedAt ?? 0) >= (tabOld.updatedAt ?? 0));
    if (recentTabIndex > -1) return true;
    return false;
  }
  _getKeepAliveInclude() {
    const include = [];
    for (const tab of this.tabs) {
      if (!tab.items) continue;
      for (const item of tab.items) {
        if (item.keepAlive !== false && item.componentKey) {
          if (!include.includes(item.componentKey)) {
            include.push(item.componentKey);
          }
        }
      }
    }
    return include;
  }
  _getInitialTabs() {
    const tabs = this.tabsOptions.getInitialTabs?.() ?? [];
    if (!this.tabsOptions.getTabInfo) return tabs;
    return tabs.map((tab) => {
      return {
        ...tab,
        info: this.tabsOptions.getTabInfo?.(tab.tabKey) ?? tab.info
      };
    });
  }
  backRoute(route) {
    const [tabKey, componentKey] = this.findTabItemByFullPath(route.fullPath);
    this.deleteTabItem(tabKey, componentKey, true);
  }
  forwardRoute(route) {
    const routeMeta = this.prepareRouteMeta(route);
    this.addTab(routeMeta);
  }
  setPageMeta(route, pageMeta) {
    const [tabKey, componentKey] = this.findTabItemByFullPath(route.fullPath);
    this.updateTabItemPageMeta(tabKey, componentKey, pageMeta);
  }
  prepareRouteMeta(route) {
    const fullPath = route.fullPath;
    const componentKey = this.__handleRoutePropComponentKey(route);
    const tabKey = this._handleRouteProp(route, "tabKey") || componentKey;
    const keepAlive = this._handleRouteProp(route, "keepAlive");
    return {
      tabKey,
      componentKey,
      fullPath,
      keepAlive
    };
  }
  _handleRouteProp(route, prop) {
    let value = route.meta[prop];
    if (typeof value === "function") {
      value = value.call(this.app, route);
    }
    return value;
  }
  __handleRoutePropComponentKey(route) {
    const componentKey = this._handleRouteProp(route, "componentKey");
    if (componentKey) return componentKey;
    const name = this.$router.getRealRouteName(route.name);
    if (!name) return route.path;
    if (route.meta.componentKeyMode === "nameOnly") return name;
    return route.path;
  }
}) || _class$2) || _class$2);
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor, _ControllerRouterViewTabs;
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
let ControllerRouterViewTabs = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "a-routertabs"
}), _dec3 = Use({
  injectionScope: "skipSelf"
}), _dec4 = Reflect.metadata("design:type", typeof ModelTabs === "undefined" ? Object : ModelTabs), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = (_ControllerRouterViewTabs = class ControllerRouterViewTabs2 extends BeanRouterViewBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$modelTabs", _descriptor, this);
  }
  backRoute(route) {
    this.$$modelTabs.backRoute(route);
    return true;
  }
  forwardRoute(route) {
    this.$$modelTabs.forwardRoute(route);
    return true;
  }
  setPageMeta(route, pageMeta) {
    this.$$modelTabs.setPageMeta(route, pageMeta);
  }
  prepareRouteMeta(route) {
    return this.$$modelTabs.prepareRouteMeta(route);
  }
  getKeepAliveInclude() {
    return this.$$modelTabs.keepAliveInclude;
  }
}, _ControllerRouterViewTabs.$propsDefault = {}, _ControllerRouterViewTabs), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$modelTabs", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
const ZRouterViewTabs = defineComponent((_props) => {
  useController(ControllerRouterViewTabs, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec, _dec2, _class;
const components = {
  "routerViewTabs": ZRouterViewTabs
};
let ScopeModuleARoutertabs = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-routertabs"
}), _dec(_class = _dec2(_class = class ScopeModuleARoutertabs2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ControllerRouterViewTabs,
  ModelTabs$1 as ModelTabs,
  ScopeModuleARoutertabs,
  ZRouterViewTabs,
  components
};
