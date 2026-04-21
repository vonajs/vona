import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { n as init_vue_runtime_esm_bundler, t as init_jsx_runtime } from "./vue-CnyVupzE.js";
import { d as _objectSpread2, f as init_objectSpread2 } from "./fecha-DgbeIgox.js";
import { h as BeanScopeBase, k as BeanInfo } from "./zova-DlmeBQBK.js";
import { t as init_src$1 } from "./zova-B7GgTsx0.js";
import { o as Scope, t as init_src$2 } from "./a-bean-BnjLZzu4.js";
import { a as Behavior, d as BeanBehaviorBase, t as init_src$3 } from "./a-behavior-DxWXg3Nz.js";
//#region src/suite-vendor/a-zova/modules/a-behaviors/src/bean/behavior.focus.ts
var _dec$1, _dec2$1, _class$1, BehaviorFocus;
var init_behavior_focus = __esmMin((() => {
	init_objectSpread2();
	init_src$1();
	init_src$3();
	BehaviorFocus = (_dec$1 = Behavior(), _dec2$1 = BeanInfo({ module: "a-behaviors" }), _dec$1(_class$1 = _dec2$1(_class$1 = class BehaviorFocus extends BeanBehaviorBase {
		constructor(...args) {
			super(...args);
			this.inputRef = void 0;
		}
		render(props, next) {
			const refOuter = props === null || props === void 0 ? void 0 : props.ref;
			props = _objectSpread2(_objectSpread2({}, props), {}, { ref: (ref) => {
				if (this.$options.always || !this.inputRef) {
					var _ref$focus;
					(_ref$focus = ref.focus) === null || _ref$focus === void 0 || _ref$focus.call(ref);
				}
				this.inputRef = ref;
				refOuter === null || refOuter === void 0 || refOuter(ref);
			} });
			return next(props);
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-behaviors/src/.metadata/index.ts
/** behaviors: end */
/** scope: begin */
var _dec, _dec2, _class, ScopeModuleABehaviors;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_behavior_focus();
	init_src$3();
	init_vue_runtime_esm_bundler();
	init_jsx_runtime();
	init_src$2();
	ScopeModuleABehaviors = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-behaviors" }), _dec(_class = _dec2(_class = class ScopeModuleABehaviors extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-behaviors/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
}));
//#endregion
export { ScopeModuleABehaviors as n, BehaviorFocus as r, init_src as t };
