import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { c as createTextVNode, l as createVNode } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { M as BeanBase, c as createZovaComponentPage, h as BeanScopeBase, k as BeanInfo, v as BeanControllerPageBase, w as Use } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { h as Controller, o as Scope, t as init_src$2, v as Service } from "./a-bean-BQjv0q8B.js";
import { n as Log, t as init_src$3 } from "./a-logger-N5ETn7zO.js";
import { n as TableCell, t as init_src$4 } from "./a-table-BKsW9IA9.js";
//#region src/suite/a-c/modules/a-c/src/service/data.ts
var _dec$6, _dec2$6, _class$6, ServiceData;
var init_data = __esmMin((() => {
	init_src$1();
	init_src$2();
	ServiceData = (_dec$6 = Service(), _dec2$6 = BeanInfo({ module: "a-c" }), _dec$6(_class$6 = _dec2$6(_class$6 = class ServiceData extends BeanBase {
		constructor(...args) {
			super(...args);
			this.count = 0;
		}
		increment() {
			this.count++;
		}
		decrement() {
			this.count--;
		}
	}) || _class$6) || _class$6);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/service/test.ts
var _dec$5, _dec2$5, _class$5, ServiceTest;
var init_test$1 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ServiceTest = (_dec$5 = Service(), _dec2$5 = BeanInfo({ module: "a-c" }), _dec$5(_class$5 = _dec2$5(_class$5 = class ServiceTest extends BeanBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}) || _class$5) || _class$5);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/page/counter/controller.tsx
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$4, _dec2$4, _dec3$1, _dec4$1, _dec5$1, _class$4, _class2$1, ControllerPageCounter;
var init_controller$2 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	init_src$3();
	ControllerPageCounter = (_dec$4 = Controller(), _dec2$4 = BeanInfo({ module: "a-c" }), _dec3$1 = Log(), _dec4$1 = Reflect.metadata("design:type", Function), _dec5$1 = Reflect.metadata("design:paramtypes", []), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2$1 = class ControllerPageCounter extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			this.count = 0;
		}
		increment() {
			this.count++;
		}
		decrement() {
			this.count--;
		}
		render() {
			return createVNode("div", null, [
				createVNode("div", null, [createTextVNode("count: "), this.count]),
				createVNode("button", { "onClick": () => this.increment() }, [createTextVNode("Increment")]),
				createVNode("button", { "onClick": () => this.decrement() }, [createTextVNode("Decrement")])
			]);
		}
	}, _applyDecoratedDescriptor$1(_class2$1.prototype, "render", [
		_dec3$1,
		_dec4$1,
		_dec5$1
	], Object.getOwnPropertyDescriptor(_class2$1.prototype, "render"), _class2$1.prototype), _class2$1)) || _class$4) || _class$4);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/page/test/controller.tsx
function _initializerDefineProperty(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$3, _dec2$3, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _class$3, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, ControllerPageTest;
var init_controller$1 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	init_src$3();
	init_data();
	ControllerPageTest = (_dec$3 = Controller(), _dec2$3 = BeanInfo({ module: "a-c" }), _dec3 = Use(), _dec4 = Reflect.metadata("design:type", typeof ServiceData === "undefined" ? Object : ServiceData), _dec5 = Use({ injectionScope: "host" }), _dec6 = Reflect.metadata("design:type", typeof ServiceData === "undefined" ? Object : ServiceData), _dec7 = Use({ injectionScope: "app" }), _dec8 = Reflect.metadata("design:type", typeof ServiceData === "undefined" ? Object : ServiceData), _dec9 = Use({ injectionScope: "sys" }), _dec0 = Reflect.metadata("design:type", typeof ServiceData === "undefined" ? Object : ServiceData), _dec1 = Log(), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2 = class ControllerPageTest extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty(this, "$$serviceData", _descriptor, this);
			_initializerDefineProperty(this, "$$serviceData2", _descriptor2, this);
			_initializerDefineProperty(this, "$$serviceData3", _descriptor3, this);
			_initializerDefineProperty(this, "$$serviceData4", _descriptor4, this);
		}
		render() {
			return createVNode("div", null, [createTextVNode("ss!")]);
		}
	}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$serviceData", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "$$serviceData2", [_dec5, _dec6], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "$$serviceData3", [_dec7, _dec8], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "$$serviceData4", [_dec9, _dec0], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _applyDecoratedDescriptor(_class2.prototype, "render", [
		_dec1,
		_dec10,
		_dec11
	], Object.getOwnPropertyDescriptor(_class2.prototype, "render"), _class2.prototype), _class2)) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/page/test3/controller.tsx
var _dec$2, _dec2$2, _class$2, ControllerPageTest3;
var init_controller = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerPageTest3 = (_dec$2 = Controller(), _dec2$2 = BeanInfo({ module: "a-c" }), _dec$2(_class$2 = _dec2$2(_class$2 = class ControllerPageTest3 extends BeanControllerPageBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			return null;
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/.metadata/page/counter.ts
var ZPageCounter;
var init_counter = __esmMin((() => {
	init_src$1();
	init_controller$2();
	ZPageCounter = createZovaComponentPage(ControllerPageCounter, void 0, void 0);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/.metadata/page/test.ts
var ZPageTest;
var init_test = __esmMin((() => {
	init_src$1();
	init_controller$1();
	ZPageTest = createZovaComponentPage(ControllerPageTest, void 0, void 0);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/.metadata/page/test3.ts
var ZPageTest3;
var init_test3 = __esmMin((() => {
	init_src$1();
	init_controller();
	ZPageTest3 = createZovaComponentPage(ControllerPageTest3, void 0, void 0);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/routes.ts
var routes;
var init_routes = __esmMin((() => {
	init_counter();
	init_test();
	init_test3();
	routes = [
		{
			path: "test",
			component: ZPageTest
		},
		{
			path: "test3",
			component: ZPageTest3
		},
		{
			path: "counter",
			component: ZPageCounter
		}
	];
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/bean/tableCell.test.tsx
var _dec$1, _dec2$1, _class$1, TableCellTest;
var init_tableCell_test = __esmMin((() => {
	init_src$1();
	init_src$4();
	TableCellTest = (_dec$1 = TableCell(), _dec2$1 = BeanInfo({ module: "a-c" }), _dec$1(_class$1 = _dec2$1(_class$1 = class TableCellTest extends BeanBase {
		render(_options, _renderContext, next) {
			return next();
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/a-c/modules/a-c/src/.metadata/index.ts
/** tableCell: end */
/** scope: begin */
var _dec, _dec2, _class, pagePathSchemas, pageNameSchemas, ScopeModuleAC;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_data();
	init_test$1();
	init_src$2();
	init_controller$2();
	init_controller$1();
	init_controller();
	init_counter();
	init_test();
	init_test3();
	init_routes();
	init_tableCell_test();
	init_src$4();
	pagePathSchemas = {};
	pageNameSchemas = {};
	ScopeModuleAC = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-c" }), _dec(_class = _dec2(_class = class ScopeModuleAC extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/a-c/modules/a-c/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
}));
//#endregion
export { TableCellTest as a, ZPageTest as c, ControllerPageTest as d, ControllerPageCounter as f, pagePathSchemas as i, ZPageCounter as l, ServiceData as m, ScopeModuleAC as n, routes as o, ServiceTest as p, pageNameSchemas as r, ZPageTest3 as s, init_src as t, ControllerPageTest3 as u };
