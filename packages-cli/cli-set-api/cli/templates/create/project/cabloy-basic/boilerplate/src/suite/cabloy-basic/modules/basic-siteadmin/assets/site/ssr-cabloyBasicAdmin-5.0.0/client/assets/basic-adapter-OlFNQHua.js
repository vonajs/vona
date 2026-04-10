import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { B as deepExtend, K as BeanSimple, h as BeanScopeBase, k as BeanInfo } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
//#region src/suite/cabloy-basic/modules/basic-adapter/src/monkeySys.ts
var MonkeySys;
var init_monkeySys = __esmMin((() => {
	init_src$1();
	init_asyncToGenerator();
	MonkeySys = class extends BeanSimple {
		sysInitialize() {
			var _this = this;
			return _asyncToGenerator(function* () {
				const configCustom = {
					provider: { components: {
						restPage: "basic-restpage:restPage",
						restPageEntry: "basic-restpage:restPageEntry",
						table: "basic-table:table"
					} },
					form: { provider: {
						components: {
							captcha: "basic-form:formFieldCaptcha",
							dateRange: "basic-date:formFieldDateRange"
						},
						behaviors: {
							formField: "basic-form:formField",
							formFieldLayout: "basic-form:formFieldLayout"
						}
					} },
					table: { provider: {
						components: {
							actionOperationsTable: "basic-table:actionOperationsTable",
							actionOperationsRow: "basic-table.tableCell.actionOperationsRow",
							actionView: "basic-table.tableCell.actionView"
						},
						actions: {
							actionCreate: "rest-actions:create",
							actionView: "rest-actions:view",
							actionEdit: "rest-actions:edit",
							actionDelete: "rest-actions:delete"
						}
					} }
				};
				const scopeRestConfig = _this.sys.util.getModuleConfigSafe("a-openapi");
				scopeRestConfig.resourceMeta = deepExtend({}, scopeRestConfig.resourceMeta, configCustom);
			})();
		}
	};
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-adapter/src/.metadata/index.ts
/** monkeySys: end */
/** scope: begin */
var _dec, _dec2, _class, ScopeModuleBasicAdapter;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_monkeySys();
	init_src$2();
	ScopeModuleBasicAdapter = (_dec = Scope(), _dec2 = BeanInfo({ module: "basic-adapter" }), _dec(_class = _dec2(_class = class ScopeModuleBasicAdapter extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/cabloy-basic/modules/basic-adapter/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
}));
//#endregion
export { ScopeModuleBasicAdapter as n, MonkeySys as r, init_src as t };
