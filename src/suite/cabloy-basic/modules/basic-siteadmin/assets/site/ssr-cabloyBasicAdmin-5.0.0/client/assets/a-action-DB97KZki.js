import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { B as deepExtend, K as BeanSimple, L as beanFullNameFromOnionName, O as createBeanDecorator, X as cast, h as BeanScopeBase, k as BeanInfo } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
//#region src/suite-vendor/a-zova/modules/a-action/src/lib/performAction.ts
function $performAction(sys, actionName, options, renderContext, next) {
	if (!next) next = (actionRes) => {
		return actionRes;
	};
	const beanFullName = beanFullNameFromOnionName(actionName, "action");
	const beanInstance = sys.bean._getBeanSyncOnly(beanFullName);
	if (beanInstance) return _renderEventActionNormal_inner(beanInstance, options, renderContext, next);
	return sys.bean._getBean(beanFullName, false).then((beanInstance) => {
		return _renderEventActionNormal_inner(beanInstance, options, renderContext, next);
	});
}
function _renderEventActionNormal_inner(beanInstance, options, renderContext, next) {
	const onionOptions = beanInstance.$onionOptions;
	const props = onionOptions ? deepExtend({}, onionOptions, options) : options !== null && options !== void 0 ? options : {};
	return beanInstance.execute(props, renderContext, next);
}
var init_performAction$1 = __esmMin((() => {
	init_src$1();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-action/src/monkey.ts
var Monkey;
var init_monkey = __esmMin((() => {
	init_src$1();
	init_performAction$1();
	init_asyncToGenerator();
	Monkey = class extends BeanSimple {
		beanInit(bean, beanInstance) {
			var _this = this;
			return _asyncToGenerator(function* () {
				const self = _this;
				bean.defineProperty(beanInstance, "$performAction", {
					enumerable: false,
					configurable: true,
					get() {
						return function(actionName, options, renderContext, next) {
							renderContext = Object.assign({
								app: cast(beanInstance).app,
								ctx: cast(beanInstance).ctx,
								$host: beanInstance
							}, renderContext);
							return $performAction(self.sys, actionName, options, renderContext, next);
						};
					}
				});
			})();
		}
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-action/src/.metadata/index.ts
/** monkey: end */
/** scope: begin */
var _dec, _dec2, _class, ScopeModuleAAction;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_monkey();
	init_src$2();
	ScopeModuleAAction = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-action" }), _dec(_class = _dec2(_class = class ScopeModuleAAction extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-action/src/lib/action.ts
function Action(options) {
	return createBeanDecorator("action", "sys", true, options);
}
var init_action$1 = __esmMin((() => {
	init_src$1();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-action/src/lib/index.ts
var init_lib = __esmMin((() => {
	init_action$1();
	init_performAction$1();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-action/src/types/action.ts
var SymbolActionResult;
var init_action = __esmMin((() => {
	SymbolActionResult = Symbol("SymbolActionResult");
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-action/src/types/performAction.ts
var init_performAction = __esmMin((() => {
	init_src$1();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-action/src/types/index.ts
var init_types = __esmMin((() => {
	init_action();
	init_performAction();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-action/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_lib();
	init_types();
}));
//#endregion
export { Monkey as a, ScopeModuleAAction as i, SymbolActionResult as n, $performAction as o, Action as r, init_src as t };
