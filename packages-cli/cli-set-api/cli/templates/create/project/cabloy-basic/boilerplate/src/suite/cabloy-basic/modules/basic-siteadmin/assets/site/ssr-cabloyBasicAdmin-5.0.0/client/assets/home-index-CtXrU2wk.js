import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { c as createTextVNode, l as createVNode } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { c as createZovaComponentPage, h as BeanScopeBase, k as BeanInfo, v as BeanControllerPageBase } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
//#region src/suite/a-home/modules/home-index/src/page/home/controller.tsx
var _dec$1, _dec2$1, _class$1, ControllerPageHome;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerPageHome = (_dec$1 = Controller(), _dec2$1 = BeanInfo({ module: "home-index" }), _dec$1(_class$1 = _dec2$1(_class$1 = class ControllerPageHome extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			this.message = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.message = "Hello Zova";
			})();
		}
		render() {
			return createVNode("div", { "style": "text-align: center;" }, [createVNode("div", null, [createVNode("div", { "style": "font-size: 36px;" }, [this.message]), createVNode("div", { "style": "font-size: 24px;opacity:.4;" }, [createTextVNode("Less is more, while more is less")])])]);
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/a-home/modules/home-index/src/.metadata/page/home.ts
var ZPageHome;
var init_home = __esmMin((() => {
	init_src$1();
	init_controller();
	ZPageHome = createZovaComponentPage(ControllerPageHome, void 0, void 0);
}));
//#endregion
//#region src/suite/a-home/modules/home-index/src/routes.ts
var routes;
var init_routes = __esmMin((() => {
	init_home();
	routes = [{
		path: "",
		component: ZPageHome
	}];
}));
//#endregion
//#region src/suite/a-home/modules/home-index/src/.metadata/index.ts
/** pages: end */
/** scope: begin */
var _dec, _dec2, _class, pagePathSchemas, pageNameSchemas, ScopeModuleHomeIndex;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller();
	init_home();
	init_routes();
	init_src$2();
	pagePathSchemas = {};
	pageNameSchemas = {};
	ScopeModuleHomeIndex = (_dec = Scope(), _dec2 = BeanInfo({ module: "home-index" }), _dec(_class = _dec2(_class = class ScopeModuleHomeIndex extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/a-home/modules/home-index/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
}));
//#endregion
export { routes as a, pagePathSchemas as i, ScopeModuleHomeIndex as n, ZPageHome as o, pageNameSchemas as r, ControllerPageHome as s, init_src as t };
