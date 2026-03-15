import { d as createBeanDecorator, B as BeanSimple, g as getOnionScenesMeta, h as deepExtend, i as swapDeps, j as appResource, k as compose, P as ProxyDisable, l as BeanInfo, m as cast, n as BeanBase, o as isNil, p as checkMeta, q as matchSelector, u as appMetadata, U as Use, v as BeanScopeBase, w as registerMappedClassMetadataKey } from "./zova-QgocPMzS.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
function Sys() {
  return createBeanDecorator("sys", "sys");
}
function Bean() {
  return createBeanDecorator("bean", "ctx");
}
function Service() {
  return createBeanDecorator("service", "ctx");
}
function Store() {
  return createBeanDecorator("store", "app");
}
function Tool() {
  return createBeanDecorator("tool", "app");
}
function Data() {
  return createBeanDecorator("data", "new");
}
function Controller() {
  return createBeanDecorator("controller", "ctx");
}
function Render() {
  return createBeanDecorator("render", "ctx");
}
function Style() {
  return createBeanDecorator("style", "ctx");
}
function Aop(options) {
  return createBeanDecorator("aop", "sys", true, options);
}
function AopMethod(options) {
  return createBeanDecorator("aopMethod", "sys", true, options);
}
var _dec$3, _dec2$3, _dec3$2, _class$3;
let ServiceOnion = (_dec$3 = ProxyDisable(), _dec2$3 = Service(), _dec3$2 = BeanInfo({
  module: "a-bean"
}), _dec$3(_class$3 = _dec2$3(_class$3 = _dec3$2(_class$3 = class ServiceOnion2 extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.sysOnion = void 0;
    this.sceneName = void 0;
    this.sceneMeta = void 0;
    this.onionsAll = void 0;
  }
  // private [SymbolOnionsEnabled]: Record<string, IOnionSlice<OPTIONS, ONIONNAME>[]> = {};
  // private [SymbolOnionsEnabledWrapped]: Record<string, Function[]> = {};
  __init__(sceneName, sysOnion) {
    this.sysOnion = sysOnion;
    this.sceneName = sceneName;
    this.sceneMeta = getOnionScenesMeta(this.sys.meta.module.modulesMeta.modules)[this.sceneName];
    if (this.sceneMeta.optionsPackage) {
      this._initOnionsAll();
      this._swapOnions(this.onionsAll);
    }
  }
  _initOnionsAll() {
    this.onionsAll = [];
    for (const moduleName in this.sys.meta.module.modulesMeta.modules) {
      const module = this.sys.meta.module.modulesMeta.modules[moduleName];
      const nodeItems = module.info.onionsMeta?.onionsConfig?.[this.sceneName];
      if (!nodeItems) continue;
      for (const itemName in nodeItems) {
        let itemOptions = nodeItems[itemName];
        const onionName = `${moduleName}:${itemName}`;
        const optionsConfig = this.sys.config.onions[this.sceneName]?.[onionName];
        if (optionsConfig) {
          itemOptions = deepExtend({}, itemOptions, optionsConfig);
        }
        this.onionsAll.push({
          name: onionName,
          options: itemOptions
        });
      }
    }
  }
  _swapOnions(onions) {
    swapDeps(onions, {
      name: "name",
      dependencies: (item) => {
        const onionOptions = cast(item).options;
        return onionOptions.dependencies;
      },
      dependents: (item) => {
        const onionOptions = cast(item).options;
        return onionOptions.dependents;
      }
    });
  }
  // getOnionsEnabled(selector?: string) {
  //   if (!selector) selector = '';
  //   if (!this[SymbolOnionsEnabled][selector]) {
  //     this[SymbolOnionsEnabled][selector] = this.onionsGlobal.filter(onionSlice => {
  //       const onionOptions = onionSlice.beanOptions.options as IOnionOptionsEnable & IOnionOptionsMatch<string>;
  //       return this.sysOnion.checkOnionOptionsEnabled(onionOptions, selector);
  //     }) as unknown as IOnionSlice<OPTIONS, ONIONNAME>[];
  //   }
  //   return this[SymbolOnionsEnabled][selector];
  // }
  // getOnionsEnabledOfMeta(beanName: string, selector?: string) {
  //   return this.getOnionsEnabled(selector).filter(item => item.beanOptions.name === beanName);
  // }
  // getOnionsEnabledWrapped(wrapFn: Function, selector?: string) {
  //   if (!selector) selector = '';
  //   if (!this[SymbolOnionsEnabledWrapped][selector]) {
  //     const onions = this.getOnionsEnabled(selector);
  //     this[SymbolOnionsEnabledWrapped][selector] = onions.map(item => {
  //       return wrapFn(item);
  //     });
  //   }
  //   return this[SymbolOnionsEnabledWrapped][selector];
  // }
  // getOnionSlice(onionName: ONIONNAME): IOnionSlice<OPTIONS, ONIONNAME> {
  //   return this.onionsNormal[onionName];
  // }
  // getOnionOptions<OPTIONS>(onionName: ONIONNAME): OPTIONS | undefined {
  //   return this.getOnionSlice(onionName).beanOptions.options as OPTIONS | undefined;
  // }
  async loadOnionsFromPackage(selector, matchThis, ...matchArgs) {
    const onionItems = this.getOnionsEnabled(this.onionsAll, selector, matchThis, ...matchArgs);
    return await this.loadOnions(onionItems, selector, matchThis, ...matchArgs);
  }
  async loadOnions(onionItems, selector, matchThis, ...matchArgs) {
    if (!Array.isArray(onionItems)) onionItems = [onionItems];
    if (onionItems.length === 0) return [];
    const moduleNames = onionItems.map((item) => item.name.split(":")[0]);
    await this._loadModules(moduleNames);
    const onionSlices = [];
    for (const item of onionItems) {
      const beanFullName = item.name.replace(":", `.${this.sceneName}.`);
      const beanOptions = appResource.getBean(beanFullName);
      if (!beanOptions) throw new Error(`behavior not found: ${beanFullName}`);
      let options;
      if (beanOptions.optionsPrimitive) {
        options = item.options !== void 0 ? item.options : beanOptions.options;
      } else {
        options = item.options !== void 0 ? deepExtend({}, beanOptions.options, item.options) : beanOptions.options;
      }
      onionSlices.push({
        name: item.name,
        options,
        beanFullName
      });
    }
    if (this.sceneMeta.optionsPackage) return onionSlices;
    this._swapOnions(onionSlices);
    return this.getOnionsEnabled(onionSlices, selector, matchThis, ...matchArgs);
  }
  getOnionsEnabled(onions, selector, matchThis, ...matchArgs) {
    if (!onions) return [];
    return onions.filter((onionItem) => {
      const onionOptions = onionItem.options;
      return this.sysOnion.checkOnionOptionsEnabled(onionOptions, selector, matchThis, ...matchArgs);
    });
  }
  compose(onions, executeCustom) {
    const fns = [];
    for (const item of onions) {
      fns.push(this._wrapOnion(item, executeCustom));
    }
    return compose(fns);
  }
  async _loadModules(moduleNames) {
    moduleNames = Array.from(new Set(moduleNames)).filter((item) => !this.sys.meta.module.get(item));
    await this.sys.meta.module.loadModules(moduleNames);
  }
  /** internal */
  _wrapOnion(item, executeCustom) {
    const fn = (data, next) => {
      return executeCustom(item, data, next);
    };
    fn._name = item.name;
    return fn;
  }
}) || _class$3) || _class$3) || _class$3);
var _dec$2, _dec2$2, _dec3$1, _class$2;
let SysOnion = (_dec$2 = ProxyDisable(), _dec2$2 = Sys(), _dec3$1 = BeanInfo({
  module: "a-bean"
}), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$1(_class$2 = class SysOnion2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this.__instances = {};
  }
  __get__(prop) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.bean._newBeanSimple(ServiceOnion, false, prop, this);
    }
    return this.__instances[prop];
  }
  checkOnionOptionsEnabled(options, selector, matchThis, ...matchArgs) {
    if (options.enable === false) return false;
    if (!this.checkOnionOptionsMeta(options.meta)) return false;
    if (isNil(selector) || selector === false) return true;
    if (isNil(options.match) && isNil(options.ignore)) return true;
    return !isNil(options.match) && __onionMatchSelector(options.match, selector, matchThis, ...matchArgs) || !isNil(options.ignore) && !__onionMatchSelector(options.ignore, selector, matchThis, ...matchArgs);
  }
  checkOnionOptionsMeta(meta) {
    return checkMeta(meta, this.sys.config.meta);
  }
}) || _class$2) || _class$2) || _class$2);
function __onionMatchSelector(match, selector, matchThis, ...matchArgs) {
  return matchSelector(match, selector, matchThis, ...matchArgs);
}
const SymbolDecoratorUseAopMethod = /* @__PURE__ */ Symbol("SymbolDecoratorUseAopMethod");
var _dec$1, _dec2$1, _dec3, _dec4, _dec5, _class$1, _class2, _descriptor;
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
let ServiceAop = (_dec$1 = ProxyDisable(), _dec2$1 = Service(), _dec3 = BeanInfo({
  module: "a-bean"
}), _dec4 = Use(), _dec5 = Reflect.metadata("design:type", typeof SysOnion === "undefined" ? Object : SysOnion), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3(_class$1 = (_class2 = class ServiceAop2 extends BeanBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$sysOnion", _descriptor, this);
  }
  async findAopsMatched(beanFullName) {
    const beanOptions = appResource.getBean(beanFullName);
    if (!beanOptions) return;
    return await this.$$sysOnion.aop.loadOnionsFromPackage(beanOptions.beanFullName);
  }
  async findAopMethodsMatched(beanFullName) {
    const beanOptions = appResource.getBean(beanFullName);
    if (!beanOptions) return;
    const aopMethodsMatchedAll = {};
    const uses = appMetadata.getMetadata(SymbolDecoratorUseAopMethod, beanOptions.beanClass.prototype);
    for (const prop in uses) {
      const onionItems = [];
      const aopMethods = uses[prop];
      for (const aopMethod of aopMethods) {
        onionItems.push({
          name: aopMethod.onionName,
          options: aopMethod.options
        });
      }
      const onionSlices = await this.$$sysOnion.aopMethod.loadOnions(onionItems);
      const aopMethodsMatched = [];
      for (const onionSlice of onionSlices) {
        const beanInstance = await this.sys.bean._getBean(onionSlice.beanFullName, true);
        aopMethodsMatched.push({
          onionName: onionSlice.name,
          beanInstance,
          options: onionSlice.options
        });
      }
      aopMethodsMatchedAll[prop] = aopMethodsMatched;
    }
    return Object.keys(aopMethodsMatchedAll).length === 0 ? void 0 : aopMethodsMatchedAll;
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$sysOnion", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1) || _class$1);
class MonkeySys extends BeanSimple {
  async sysInitialize() {
    let beansPreload = [];
    for (const moduleName in this.sys.meta.module.modulesMeta.modules) {
      const module = this.sys.meta.module.modulesMeta.modules[moduleName];
      if (!module.info.onionsMeta?.beansPreload) continue;
      beansPreload = beansPreload.concat(module.info.onionsMeta?.beansPreload);
    }
    const promises = beansPreload.map((item) => {
      return this.sys.bean._getBean(item, false);
    });
    await Promise.all(promises);
  }
}
function Scope() {
  return createBeanDecorator("scope", "app", false);
}
var _dec, _dec2, _class;
let ScopeModuleABean = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-bean"
}), _dec(_class = _dec2(_class = class ScopeModuleABean2 extends BeanScopeBase {
}) || _class) || _class);
function UseAopMethod(aopMethodName, options) {
  return function(target, prop, descriptor) {
    registerMappedClassMetadataKey(target, SymbolDecoratorUseAopMethod);
    const uses = appMetadata.getOwnMetadataMap(true, SymbolDecoratorUseAopMethod, target);
    if (!uses[prop]) uses[prop] = [];
    uses[prop].push({
      onionName: aopMethodName,
      options
    });
    return descriptor;
  };
}
const SymbolUseOnionLocal = /* @__PURE__ */ Symbol("SymbolUseOnionLocal");
const SymbolUseOnionOptions = /* @__PURE__ */ Symbol("SymbolUseOnionOptions");
export {
  Aop,
  AopMethod,
  Bean,
  Controller,
  Data,
  MonkeySys,
  Render,
  Scope,
  ScopeModuleABean,
  Service,
  ServiceAop,
  ServiceOnion,
  Store,
  Style,
  SymbolDecoratorUseAopMethod,
  SymbolUseOnionLocal,
  SymbolUseOnionOptions,
  Sys,
  SysOnion,
  Tool,
  UseAopMethod
};
