import { n as BeanBase, V as Virtual, l as BeanInfo, B as BeanSimple, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { Bean, Service, Scope } from "./a-bean-Bxu0OKjI.js";
import { c as createPinia } from "./pinia-BolmCbMV.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$2, _dec2$2, _dec3, _class$2;
const SymbolPiniaStore = /* @__PURE__ */ Symbol("SymbolPiniaStore");
let BeanPiniaStoreBase = (_dec$2 = Bean(), _dec2$2 = Virtual(), _dec3 = BeanInfo({
  module: "a-pinia"
}), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3(_class$2 = class BeanPiniaStoreBase2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this[SymbolPiniaStore] = void 0;
  }
  __get__(prop) {
    return this[SymbolPiniaStore][prop];
  }
  __set__(prop, value) {
    if (prop in this[SymbolPiniaStore]) {
      this[SymbolPiniaStore][prop] = value;
      return true;
    } else {
      return false;
    }
  }
  async __init__(useStore) {
    this[SymbolPiniaStore] = useStore();
  }
}) || _class$2) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let ServicePinia = (_dec$1 = Service(), _dec2$1 = BeanInfo({
  module: "a-pinia"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ServicePinia2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this.pinia = void 0;
  }
  async __init__() {
    this.pinia = createPinia();
    this.app.vue.use(this.pinia);
    if (this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      this.pinia.state.value = this.ctx.meta.$ssr.stateDefer.pinia;
    }
  }
}) || _class$1) || _class$1);
class Monkey extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.pinia = void 0;
  }
  async appInitialize() {
    this.pinia = await this.bean._newBean(ServicePinia, false);
  }
  async beanInit(bean, beanInstance) {
    const self = this;
    bean.defineProperty(beanInstance, "$pinia", {
      enumerable: false,
      configurable: true,
      get() {
        return self.pinia.pinia;
      }
    });
  }
}
var _dec, _dec2, _class;
let ScopeModuleAPinia = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-pinia"
}), _dec(_class = _dec2(_class = class ScopeModuleAPinia2 extends BeanScopeBase {
}) || _class) || _class);
export {
  BeanPiniaStoreBase,
  Monkey,
  ScopeModuleAPinia,
  ServicePinia
};
