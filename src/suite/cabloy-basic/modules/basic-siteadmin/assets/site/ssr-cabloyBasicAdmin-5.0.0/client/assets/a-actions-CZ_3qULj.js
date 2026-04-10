import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { D as Preload, M as BeanBase, h as BeanScopeBase, k as BeanInfo } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
import { r as Action, t as init_src$3 } from "./a-action-DB97KZki.js";
//#region src/suite-vendor/a-zova/modules/a-actions/src/bean/action.log.tsx
var _dec$1, _dec2$1, _dec3, _class$1, ActionLog;
var init_action_log = __esmMin((() => {
	init_src$1();
	init_src$3();
	ActionLog = (_dec$1 = Action(), _dec2$1 = Preload(), _dec3 = BeanInfo({ module: "a-actions" }), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3(_class$1 = class ActionLog extends BeanBase {
		execute(options, _renderContext, next) {
			this.$logger.silly(options.message === void 0 ? "" : { message: options.message });
			return next();
		}
	}) || _class$1) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-actions/src/.metadata/index.ts
/** action: end */
/** scope: begin */
var _dec, _dec2, _class, ScopeModuleAActions;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_action_log();
	init_src$3();
	init_src$2();
	ScopeModuleAActions = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-actions" }), _dec(_class = _dec2(_class = class ScopeModuleAActions extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-actions/src/types/actions.ts
var init_actions = __esmMin((() => {
	init_src$3();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-actions/src/types/index.ts
var init_types = __esmMin((() => {
	init_actions();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-actions/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_types();
}));
//#endregion
export { ScopeModuleAActions as n, ActionLog as r, init_src as t };
