import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-DgbeIgox.js";
import { S as Virtual, U as BeanSimple, h as BeanScopeBase, j as BeanBase, k as BeanInfo } from "./zova-DlmeBQBK.js";
import { t as init_src$1 } from "./zova-B7GgTsx0.js";
import { m as Bean, o as Scope, t as init_src$2, v as Service } from "./a-bean-BnjLZzu4.js";
import { n as init_pinia$1, t as createPinia } from "./pinia-BX2Cm6Hk.js";
//#region src/suite-vendor/a-zova/modules/a-pinia/src/bean/bean.piniaStoreBase.ts
var _dec$2, _dec2$2, _dec3, _class$2, SymbolPiniaStore, BeanPiniaStoreBase;
var init_bean_piniaStoreBase = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	SymbolPiniaStore = Symbol("SymbolPiniaStore");
	BeanPiniaStoreBase = (_dec$2 = Bean(), _dec2$2 = Virtual(), _dec3 = BeanInfo({ module: "a-pinia" }), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3(_class$2 = class BeanPiniaStoreBase extends BeanBase {
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
			} else return false;
		}
		__init__(useStore) {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this[SymbolPiniaStore] = useStore();
			})();
		}
	}) || _class$2) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-pinia/src/service/pinia.ts
var _dec$1, _dec2$1, _class$1, ServicePinia;
var init_pinia = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_pinia$1();
	init_src$2();
	ServicePinia = (_dec$1 = Service(), _dec2$1 = BeanInfo({ module: "a-pinia" }), _dec$1(_class$1 = _dec2$1(_class$1 = class ServicePinia extends BeanBase {
		constructor(...args) {
			super(...args);
			this.pinia = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.pinia = createPinia();
				_this.app.vue.use(_this.pinia);
				if (_this.ctx.meta.$ssr.isRuntimeSsrPreHydration) _this.pinia.state.value = _this.ctx.meta.$ssr.stateDefer.pinia;
			})();
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-pinia/src/monkey.ts
var Monkey;
var init_monkey = __esmMin((() => {
	init_src$1();
	init_pinia();
	init_asyncToGenerator();
	Monkey = class extends BeanSimple {
		constructor(...args) {
			super(...args);
			this.pinia = void 0;
		}
		appInitialize() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.pinia = yield _this.bean._newBean(ServicePinia, false);
			})();
		}
		beanInit(bean, beanInstance) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				const self = _this2;
				bean.defineProperty(beanInstance, "$pinia", {
					enumerable: false,
					configurable: true,
					get() {
						return self.pinia.pinia;
					}
				});
			})();
		}
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-pinia/src/.metadata/index.ts
/** bean: end */
/** bean: begin */
/** monkey: end */
/** scope: begin */
var _dec, _dec2, _class, ScopeModuleAPinia;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_bean_piniaStoreBase();
	init_pinia();
	init_src$2();
	init_monkey();
	ScopeModuleAPinia = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-pinia" }), _dec(_class = _dec2(_class = class ScopeModuleAPinia extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-pinia/src/types.ts
var init_types = __esmMin((() => {
	init_src$1();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-pinia/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_types();
}));
//#endregion
export { BeanPiniaStoreBase as a, ServicePinia as i, ScopeModuleAPinia as n, Monkey as r, init_src as t };
