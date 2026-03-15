import { n as BeanBase, S as SymbolErrorInstanceInfo, m as cast, h as deepExtend, l as BeanInfo, U as Use, V as Virtual, B as BeanSimple, v as BeanScopeBase, d as createBeanDecorator } from "./zova-QgocPMzS.js";
import { m as markRaw } from "./vue-CRNsYCTs.js";
import { a as axios, A as Axios } from "./axios-hebYYykT.js";
import { Service, Bean, Scope } from "./a-bean-Bxu0OKjI.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$3, _dec2$3, _dec3$1, _dec4$1, _class$3, _class2, _descriptor;
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
let ServiceComposer = (_dec$3 = Service(), _dec2$3 = BeanInfo({
  module: "a-fetch"
}), _dec3$1 = Use("a-bean.sys.onion"), _dec4$1 = Reflect.metadata("design:type", typeof SysOnion === "undefined" ? Object : SysOnion), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2 = class ServiceComposer2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this.$beanFetch = void 0;
    _initializerDefineProperty(this, "$$sysOnion", _descriptor, this);
    this._composerRequest = void 0;
    this._composerRequestError = void 0;
    this._composerResponse = void 0;
    this._composerResponseError = void 0;
  }
  async __init__(beanFetch, onionItems) {
    this.$beanFetch = beanFetch;
    await this._createComposer(onionItems);
  }
  executeRequest(config2) {
    return this._composerRequest(config2);
  }
  executeRequestError(error) {
    return this._composerRequestError(error);
  }
  executeResponse(response) {
    return this._composerResponse(response);
  }
  async executeResponseError(error) {
    error = await this._composerResponseError(error);
    if (error instanceof Error) {
      error[SymbolErrorInstanceInfo] = {
        instance: this.ctx.instance,
        info: "executeResponseError"
      };
    }
    return error;
  }
  async _createComposer(onionItems) {
    let onionSlices;
    if (onionItems) {
      onionSlices = await this.$$sysOnion.interceptor.loadOnions(onionItems);
    } else {
      onionSlices = await this.$$sysOnion.interceptor.loadOnionsFromPackage();
    }
    for (const onionSlice of onionSlices) {
      onionSlice.beanInstance = await this.bean._newBean(onionSlice.beanFullName, true, this.$beanFetch, onionSlice.options);
    }
    this._composerRequest = this.$$sysOnion.interceptor.compose(onionSlices, (onionSlice, config2, next) => {
      const options = this._combineOnionOptions(onionSlice, config2);
      if (!this.$$sysOnion.checkOnionOptionsEnabled(options, config2.url)) {
        return next(config2);
      }
      const beanInstance = cast(onionSlice.beanInstance);
      if (!beanInstance.onRequest) return next(config2);
      return beanInstance.onRequest(config2, options, next);
    });
    this._composerRequestError = this.$$sysOnion.interceptor.compose(onionSlices, (onionSlice, error, next) => {
      const config2 = error.config;
      const options = this._combineOnionOptions(onionSlice, config2);
      if (!this.$$sysOnion.checkOnionOptionsEnabled(options, config2?.url)) {
        return next(error);
      }
      const beanInstance = cast(onionSlice.beanInstance);
      if (!beanInstance.onRequestError) return next(error);
      return beanInstance.onRequestError(error, options, next);
    });
    this._composerResponse = this.$$sysOnion.interceptor.compose(onionSlices, (onionSlice, response, next) => {
      const config2 = response.config;
      const options = this._combineOnionOptions(onionSlice, config2);
      if (!this.$$sysOnion.checkOnionOptionsEnabled(options, config2?.url)) {
        return next(response);
      }
      const beanInstance = cast(onionSlice.beanInstance);
      if (!beanInstance.onResponse) return next(response);
      return beanInstance.onResponse(response, options, next);
    });
    this._composerResponseError = this.$$sysOnion.interceptor.compose(onionSlices, (onionSlice, error, next) => {
      const config2 = error.config;
      const options = this._combineOnionOptions(onionSlice, config2);
      if (!this.$$sysOnion.checkOnionOptionsEnabled(options, config2?.url)) {
        return next(error);
      }
      const beanInstance = cast(onionSlice.beanInstance);
      if (!beanInstance.onResponseError) return next(error);
      return beanInstance.onResponseError(error, options, next);
    });
  }
  _combineOnionOptions(item, config2) {
    let optionsDynamic;
    if (config2?.interceptors) {
      optionsDynamic = config2?.interceptors[item.name];
    }
    const options = optionsDynamic ? deepExtend({}, item.options, optionsDynamic) : item.options;
    return options;
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$sysOnion", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$3) || _class$3);
var _dec$2, _dec2$2, _class$2;
const SymbolFetch = /* @__PURE__ */ Symbol("SymbolFetch");
let BeanFetch$1 = (_dec$2 = Bean(), _dec2$2 = BeanInfo({
  module: "a-fetch"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class BeanFetch2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this._composer = void 0;
    this[SymbolFetch] = void 0;
  }
  async __init__(options) {
    patchAxios(Axios);
    const axiosConfig = deepExtend({}, {
      baseURL: this.sys.util.getApiBaseURL()
    }, this.scope.config.axios.config, options?.axiosConfig);
    this._composer = await this.bean._newBean(ServiceComposer, true, this, options?.onionItems);
    this[SymbolFetch] = markRaw(axios.create(axiosConfig));
    this._addInterceptors(this[SymbolFetch]);
  }
  __get__(prop) {
    return this[SymbolFetch] && this[SymbolFetch][prop];
  }
  _addInterceptors(api) {
    api.interceptors.request.use(async (config2) => {
      return await this._composer.executeRequest(config2);
    }, async (_error) => {
      if (!(_error instanceof Error)) return Promise.reject(_error);
      const error = await this._composer.executeRequestError(_error);
      return Promise.reject(error);
    });
    api.interceptors.response.use(async (response) => {
      return await this._composer.executeResponse(response);
    }, async (_error) => {
      if (!(_error instanceof Error)) return Promise.reject(_error);
      const error = await this._composer.executeResponseError(_error);
      return Promise.reject(error);
    });
  }
}) || _class$2) || _class$2);
function patchAxios(_Axios) {
  if (_Axios.__requestPatched) return;
  _Axios.__requestPatched = true;
  const requestPrev = _Axios.prototype.request;
  _Axios.prototype.request = async function(...args) {
    try {
      return await requestPrev.call(this, ...args);
    } catch (err) {
      if (err instanceof Error) throw err;
      return err;
    }
  };
}
var _dec$1, _dec2$1, _dec3, _dec4, _dec5, _class$1;
let BeanInterceptorBase = (_dec$1 = Bean(), _dec2$1 = Virtual(), _dec3 = BeanInfo({
  module: "a-fetch"
}), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof BeanFetch === "undefined" ? Object : BeanFetch, typeof T === "undefined" ? Object : T]), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3(_class$1 = _dec4(_class$1 = _dec5(_class$1 = class BeanInterceptorBase2 extends BeanBase {
  constructor(beanFetch, options) {
    super();
    this.$beanFetch = void 0;
    this.$options = void 0;
    this.$beanFetch = beanFetch;
    this.$options = options;
  }
}) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1);
const config = (_sys) => {
  return {
    axios: {
      config: {}
    }
  };
};
class Monkey extends BeanSimple {
  async appInitialize() {
    this.app.meta.$fetch = await this.bean._getBean(BeanFetch$1, false);
  }
  async beanInit(bean, beanInstance) {
    const self = this;
    bean.defineProperty(beanInstance, "$fetch", {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.meta.$fetch;
      }
    });
  }
}
var _dec, _dec2, _class;
let ScopeModuleAFetch = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-fetch"
}), _dec(_class = _dec2(_class = class ScopeModuleAFetch2 extends BeanScopeBase {
}) || _class) || _class);
const SymbolInterceptorBodyResponseFlag = /* @__PURE__ */ Symbol("SymbolInterceptorBodyResponseFlag");
function Interceptor(options) {
  return createBeanDecorator("interceptor", "new", true, options);
}
export {
  BeanFetch$1 as BeanFetch,
  BeanInterceptorBase,
  Interceptor,
  Monkey,
  ScopeModuleAFetch,
  ServiceComposer,
  SymbolInterceptorBodyResponseFlag,
  config
};
