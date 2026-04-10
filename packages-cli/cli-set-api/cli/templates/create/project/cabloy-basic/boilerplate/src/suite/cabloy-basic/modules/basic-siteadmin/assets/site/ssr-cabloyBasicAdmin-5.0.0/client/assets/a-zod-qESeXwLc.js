import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { M as BeanBase, Y as useComputed, h as BeanScopeBase, k as BeanInfo, s as useApp } from "./zova-BXlOOlVL.js";
import { n as zod_default, t as init_zod } from "./zod-Xas5f9JK.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { S as Tool, o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
//#region src/suite-vendor/a-zova/modules/a-zod/src/bean/tool.v.ts
var _dec$1, _dec2$1, _class$1, ToolV;
var init_tool_v = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_zod();
	init_src$2();
	ToolV = (_dec$1 = Tool(), _dec2$1 = BeanInfo({ module: "a-zod" }), _dec$1(_class$1 = _dec2$1(_class$1 = class ToolV extends BeanBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		required(schema, params) {
			params = params || this.scope.locale.ZodErrorRequired();
			schema._zod.def.error = zod_default.util.normalizeParams(params).error;
			return schema;
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-zod/src/.metadata/index.ts
/** tool: end */
/** locale: begin */
/** locale: end */
/** scope: begin */
function locale(key) {
	return `a-zod::${key}`;
}
var _dec, _dec2, _class, ScopeModuleAZod;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_tool_v();
	init_src$2();
	ScopeModuleAZod = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-zod" }), _dec(_class = _dec2(_class = class ScopeModuleAZod extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-zod/src/config/locale/en-us.ts
var en_us_default;
var init_en_us = __esmMin((() => {
	en_us_default = { ZodErrorRequired: "Required" };
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-zod/src/config/locale/zh-cn.ts
var zh_cn_default;
var init_zh_cn = __esmMin((() => {
	zh_cn_default = { ZodErrorRequired: "必填项" };
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-zod/src/.metadata/locales.ts
function $useLocale(key, ...args) {
	const app = useApp();
	const str = `a-zod::${key}`;
	return useComputed(() => {
		return app.meta.text(str, ...args);
	});
}
var locales;
var init_locales = __esmMin((() => {
	init_src$1();
	init_en_us();
	init_zh_cn();
	locales = {
		"en-us": en_us_default,
		"zh-cn": zh_cn_default
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-zod/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_locales();
}));
//#endregion
export { locale as a, ScopeModuleAZod as i, $useLocale as n, ToolV as o, locales as r, init_src as t };
