import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { c as createTextVNode, d as defineComponent, l as createVNode } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { C as UseScope, K as BeanSimple, M as BeanBase, Y as useComputed, _ as BeanRenderBase, b as BeanControllerBase, c as createZovaComponentPage, g as BeanStyleBase, h as BeanScopeBase, j as BeanAopBase, k as BeanInfo, l as prepareComponentOptions, m as createZovaComponentAsync, s as useApp, u as useController, v as BeanControllerPageBase, w as Use, x as ModelValue } from "./zova-BXlOOlVL.js";
import { a as number, o as object, s as string } from "./zod-DXuNtoi4.js";
import { t as init_zod } from "./zod-Xas5f9JK.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { _ as Render, b as Style, f as Aop, h as Controller, m as Bean, o as Scope, t as init_src$2, v as Service, y as Store } from "./a-bean-BQjv0q8B.js";
import { i as Model, l as BeanModelBase, t as init_src$3 } from "./a-model-B9Gmxi-X.js";
import { c as BeanApiBase, n as Api, t as init_src$4 } from "./a-api-Qf8gYaua.js";
import { n as Log, t as init_src$5 } from "./a-logger-N5ETn7zO.js";
//#region src/module/demo-student/src/config/locale/en-us.ts
var en_us_default;
var init_en_us = __esmMin((() => {
	en_us_default = {};
}));
//#endregion
//#region src/module/demo-student/src/config/locale/zh-cn.ts
var zh_cn_default;
var init_zh_cn = __esmMin((() => {
	zh_cn_default = {};
}));
//#endregion
//#region src/module/demo-student/src/.metadata/locales.ts
function $useLocale(key, ...args) {
	const app = useApp();
	const str = `demo-student::${key}`;
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
//#region src/module/demo-student/src/model/menu.ts
var _dec$21, _dec2$21, _class$21, ModelMenu;
var init_menu$1 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	ModelMenu = (_dec$21 = Model(), _dec2$21 = BeanInfo({ module: "demo-student" }), _dec$21(_class$21 = _dec2$21(_class$21 = class ModelMenu extends BeanModelBase {
		retrieveMenus() {
			var _this = this;
			return this.$useStateData({
				queryKey: ["retrieveMenus"],
				queryFn: function() {
					var _ref = _asyncToGenerator(function* () {
						return yield _this.$api.homeBaseMenu.retrieveMenus({ params: { publicPath: "" } });
					});
					return function queryFn() {
						return _ref.apply(this, arguments);
					};
				}()
			});
		}
	}) || _class$21) || _class$21);
}));
//#endregion
//#region src/module/demo-student/src/model/test.ts
var _dec$20, _dec2$20, _class$20, ModelTest;
var init_test$2 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	ModelTest = (_dec$20 = Model(), _dec2$20 = BeanInfo({ module: "demo-student" }), _dec$20(_class$20 = _dec2$20(_class$20 = class ModelTest extends BeanModelBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}) || _class$20) || _class$20);
}));
//#endregion
//#region src/module/demo-student/src/api/menu.ts
var _dec$19, _dec2$19, _class$19, ApiMenu;
var init_menu = __esmMin((() => {
	init_src$1();
	init_src$4();
	ApiMenu = (_dec$19 = Api(), _dec2$19 = BeanInfo({ module: "demo-student" }), _dec$19(_class$19 = _dec2$19(_class$19 = class ApiMenu extends BeanApiBase {
		retrieveMenus() {
			return this.$fetch.get("/home/base/menu/");
		}
	}) || _class$19) || _class$19);
}));
//#endregion
//#region src/module/demo-student/src/api/test.ts
var _dec$18, _dec2$18, _class$18, ApiTest;
var init_test$1 = __esmMin((() => {
	init_src$1();
	init_src$4();
	ApiTest = (_dec$18 = Api(), _dec2$18 = BeanInfo({ module: "demo-student" }), _dec$18(_class$18 = _dec2$18(_class$18 = class ApiTest extends BeanApiBase {
		echo() {
			return this.$fetch.get("/test/echo");
		}
	}) || _class$18) || _class$18);
}));
//#endregion
//#region src/module/demo-student/src/api/test3.ts
var _dec$17, _dec2$17, _class$17, ApiTest3;
var init_test3 = __esmMin((() => {
	init_src$1();
	init_src$4();
	ApiTest3 = (_dec$17 = Api(), _dec2$17 = BeanInfo({ module: "demo-student" }), _dec$17(_class$17 = _dec2$17(_class$17 = class ApiTest3 extends BeanApiBase {
		echo() {
			return this.$fetch.get("/test3/echo");
		}
	}) || _class$17) || _class$17);
}));
//#endregion
//#region src/module/demo-student/src/bean/bean.test.ts
var _dec$16, _dec2$16, _class$16, BeanTest;
var init_bean_test = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	BeanTest = (_dec$16 = Bean(), _dec2$16 = BeanInfo({ module: "demo-student" }), _dec$16(_class$16 = _dec2$16(_class$16 = class BeanTest extends BeanBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}) || _class$16) || _class$16);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/service.counter.ts
var _dec$15, _dec2$15, _class$15, ServiceCounter;
var init_service_counter = __esmMin((() => {
	init_src$1();
	init_src$2();
	ServiceCounter = (_dec$15 = Service(), _dec2$15 = BeanInfo({ module: "demo-student" }), _dec$15(_class$15 = _dec2$15(_class$15 = class ServiceCounter extends BeanBase {
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
	}) || _class$15) || _class$15);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/service.test.ts
var _dec$14, _dec2$14, _class$14, ServiceTest;
var init_service_test = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ServiceTest = (_dec$14 = Service(), _dec2$14 = BeanInfo({ module: "demo-student" }), _dec$14(_class$14 = _dec2$14(_class$14 = class ServiceTest extends BeanBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}) || _class$14) || _class$14);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/service.test3.ts
var _dec$13, _dec2$13, _class$13, ServiceTest3;
var init_service_test3 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ServiceTest3 = (_dec$13 = Service(), _dec2$13 = BeanInfo({ module: "demo-student" }), _dec$13(_class$13 = _dec2$13(_class$13 = class ServiceTest3 extends BeanBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}) || _class$13) || _class$13);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/service.test4.ts
var _dec$12, _dec2$12, _class$12, ServiceTest4;
var init_service_test4 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ServiceTest4 = (_dec$12 = Service(), _dec2$12 = BeanInfo({ module: "demo-student" }), _dec$12(_class$12 = _dec2$12(_class$12 = class ServiceTest4 extends BeanBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}) || _class$12) || _class$12);
}));
//#endregion
//#region src/module/demo-student/src/bean/store.test.ts
var _dec$11, _dec2$11, _class$11, StoreTest;
var init_store_test = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	StoreTest = (_dec$11 = Store(), _dec2$11 = BeanInfo({ module: "demo-student" }), _dec$11(_class$11 = _dec2$11(_class$11 = class StoreTest extends BeanBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}) || _class$11) || _class$11);
}));
//#endregion
//#region src/module/demo-student/src/component/card/controller.tsx
function _initializerDefineProperty$3(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor$4(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$10, _dec2$10, _dec3$4, _dec4$4, _class$10, _class2$4, _descriptor$3, _ControllerCard, ControllerCard;
var init_controller$2 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerCard = (_dec$10 = Controller(), _dec2$10 = BeanInfo({ module: "demo-student" }), _dec3$4 = ModelValue(), _dec4$4 = Reflect.metadata("design:type", Number), _dec$10(_class$10 = _dec2$10(_class$10 = (_class2$4 = (_ControllerCard = class ControllerCard extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty$3(this, "modelValue", _descriptor$3, this);
			this.modelTitle = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.modelTitle = _this.$useModel("title", { set: (value) => {
					var _this$$props$titleMod;
					if ((_this$$props$titleMod = _this.$props.titleModifiers) === null || _this$$props$titleMod === void 0 ? void 0 : _this$$props$titleMod.capitalize) {
						if (!value) return value;
						return value.charAt(0).toUpperCase() + value.slice(1);
					}
					return value;
				} });
			})();
		}
		_render() {
			var _this$$props$slotHead, _this$$props, _this$$slotDefault;
			return createVNode("div", null, [
				createVNode("div", null, [(_this$$props$slotHead = (_this$$props = this.$props).slotHeader) === null || _this$$props$slotHead === void 0 ? void 0 : _this$$props$slotHead.call(_this$$props)]),
				createVNode("div", null, [(_this$$slotDefault = this.$slotDefault) === null || _this$$slotDefault === void 0 ? void 0 : _this$$slotDefault.call(this, "tom")]),
				createVNode("div", null, [this.$props.content]),
				createVNode("button", { "onClick": () => {
					var _this$$props$onReset, _this$$props2;
					(_this$$props$onReset = (_this$$props2 = this.$props).onReset) === null || _this$$props$onReset === void 0 || _this$$props$onReset.call(_this$$props2);
				} }, [createTextVNode("Reset")])
			]);
		}
	}, _ControllerCard.$propsDefault = {
		title: "",
		modelValue: 0,
		content: "no content"
	}, _ControllerCard), _descriptor$3 = _applyDecoratedDescriptor$4(_class2$4.prototype, "modelValue", [_dec3$4, _dec4$4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$4)) || _class$10) || _class$10);
}));
//#endregion
//#region src/module/demo-student/src/component/test/controller.tsx
function _initializerDefineProperty$2(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor$3(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$9, _dec2$9, _dec3$3, _dec4$3, _class$9, _class2$3, _descriptor$2, ControllerTest;
var init_controller$1 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerTest = (_dec$9 = Controller(), _dec2$9 = BeanInfo({ module: "demo-student" }), _dec3$3 = UseScope("home-base"), _dec4$3 = Reflect.metadata("design:type", typeof ScopeModuleHomeBase === "undefined" ? Object : ScopeModuleHomeBase), _dec$9(_class$9 = _dec2$9(_class$9 = (_class2$3 = class ControllerTest extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty$2(this, "$$scopeHomeBase", _descriptor$2, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				yield _this.retrieveMenus();
			})();
		}
		retrieveMenus() {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				const menus = yield _this2.$api.homeBaseMenu.retrieveMenus({ params: { publicPath: "" } });
				console.log(menus);
			})();
		}
		render() {
			return createVNode("div", null, [createTextVNode("test")]);
		}
	}, _descriptor$2 = _applyDecoratedDescriptor$3(_class2$3.prototype, "$$scopeHomeBase", [_dec3$3, _dec4$3], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$3)) || _class$9) || _class$9);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/controller.tsx
function _applyDecoratedDescriptor$2(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$8, _dec2$8, _dec3$2, _dec4$2, _dec5, _class$8, _class2$2, ZCard$2, ControllerPageCounterSchemaQuery, ControllerPageCounterSchemaParams, ControllerPageCounter;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_zod();
	init_src$2();
	init_src$5();
	ZCard$2 = createZovaComponentAsync("demo-student", "card");
	ControllerPageCounterSchemaQuery = object({
		name: string().optional(),
		age: number().optional()
	});
	ControllerPageCounterSchemaParams = object({ id: number().optional().default(0) });
	ControllerPageCounter = (_dec$8 = Controller(), _dec2$8 = BeanInfo({ module: "demo-student" }), _dec3$2 = Log(), _dec4$2 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", []), _dec$8(_class$8 = _dec2$8(_class$8 = (_class2$2 = class ControllerPageCounter extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			this.count = 0;
			this.title = void 0;
			this.cardRef = void 0;
		}
		increment() {
			this.count++;
		}
		decrement() {
			this.count--;
		}
		_render() {
			return createVNode("div", null, [
				createVNode(ZCard$2, {
					"title": this.title,
					"titleModifiers": { "capitalize": true },
					"onUpdate:title": ($event) => this.title = $event
				}, null),
				createVNode(ZCard$2, {
					"content": "custom content",
					"onReset": () => {
						console.log("onReset is invoked");
					},
					"slotHeader": () => {
						return createVNode("div", null, [createTextVNode("custom header")]);
					},
					"slotDefault": (name) => {
						return createVNode("div", null, [name]);
					}
				}, null),
				createVNode("div", null, [createTextVNode("count: "), this.count]),
				createVNode("button", { "onClick": () => this.increment() }, [createTextVNode("Increment")]),
				createVNode("button", { "onClick": () => this.decrement() }, [createTextVNode("Decrement")])
			]);
		}
	}, _applyDecoratedDescriptor$2(_class2$2.prototype, "_render", [
		_dec3$2,
		_dec4$2,
		_dec5
	], Object.getOwnPropertyDescriptor(_class2$2.prototype, "_render"), _class2$2.prototype), _class2$2)) || _class$8) || _class$8);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/render.more.tsx
var _dec$7, _dec2$7, _class$7, RenderPageMore;
var init_render_more = __esmMin((() => {
	init_src$1();
	init_src$2();
	RenderPageMore = (_dec$7 = Render(), _dec2$7 = BeanInfo({ module: "demo-student" }), _dec$7(_class$7 = _dec2$7(_class$7 = class RenderPageMore extends BeanRenderBase {
		render() {}
	}) || _class$7) || _class$7);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/render.tsx
function _initializerDefineProperty$1(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$6, _dec2$6, _dec3$1, _dec4$1, _class$6, _class2$1, _descriptor$1, ZTest$1, ZCard$1, RenderPageCounter;
var init_render$2 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	init_render_more();
	ZTest$1 = createZovaComponentAsync("demo-student", "test");
	ZCard$1 = createZovaComponentAsync("demo-student", "card");
	RenderPageCounter = (_dec$6 = Render(), _dec2$6 = BeanInfo({ module: "demo-student" }), _dec3$1 = Use(), _dec4$1 = Reflect.metadata("design:type", typeof RenderPageMore === "undefined" ? Object : RenderPageMore), _dec$6(_class$6 = _dec2$6(_class$6 = (_class2$1 = class RenderPageCounter extends BeanRenderBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty$1(this, "$$renderMore", _descriptor$1, this);
		}
		render() {
			return createVNode("div", { "class": this.cTextCenter }, [
				createVNode(ZTest$1, null, null),
				createVNode(ZCard$1, { "controllerRef": (ref) => {
					this.cardRef = ref;
				} }, null),
				createVNode("div", null, [createTextVNode("count: "), this.count]),
				createVNode("button", { "onClick": () => this.increment() }, [createTextVNode("Increment")]),
				createVNode("button", { "onClick": () => this.decrement() }, [createTextVNode("Decrement")])
			]);
		}
	}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$renderMore", [_dec3$1, _dec4$1], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$1)) || _class$6) || _class$6);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/style.more.ts
var _dec$5, _dec2$5, _class$5, StylePageMore;
var init_style_more = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	StylePageMore = (_dec$5 = Style(), _dec2$5 = BeanInfo({ module: "demo-student" }), _dec$5(_class$5 = _dec2$5(_class$5 = class StylePageMore extends BeanStyleBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}) || _class$5) || _class$5);
}));
//#endregion
//#region src/module/demo-student/src/page/counter/style.ts
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
var _dec$4, _dec2$4, _dec3, _dec4, _class$4, _class2, _descriptor, StylePageCounter;
var init_style = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	init_style_more();
	StylePageCounter = (_dec$4 = Style(), _dec2$4 = BeanInfo({ module: "demo-student" }), _dec3 = Use(), _dec4 = Reflect.metadata("design:type", typeof StylePageMore === "undefined" ? Object : StylePageMore), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2 = class StylePageCounter extends BeanStyleBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty(this, "$$styleMore", _descriptor, this);
			this.cTextCenter = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.cTextCenter = _this.$style({ textAlign: "center" });
			})();
		}
	}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$styleMore", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$4) || _class$4);
}));
//#endregion
//#region src/module/demo-student/src/.metadata/page/counter.ts
var NSControllerPageCounter, ZPageCounter;
var init_counter = __esmMin((() => {
	init_src$1();
	init_controller();
	init_render$2();
	init_style();
	(function(_NSControllerPageCounter) {
		_NSControllerPageCounter.paramsSchema = ControllerPageCounterSchemaParams;
		_NSControllerPageCounter.querySchema = ControllerPageCounterSchemaQuery;
	})(NSControllerPageCounter || (NSControllerPageCounter = {}));
	ZPageCounter = createZovaComponentPage(ControllerPageCounter, RenderPageCounter, StylePageCounter);
}));
//#endregion
//#region src/module/demo-student/src/routes.ts
var routes;
var init_routes = __esmMin((() => {
	init_counter();
	routes = [{
		path: "counter",
		component: ZPageCounter,
		meta: { layout: "default" }
	}];
}));
//#endregion
//#region src/module/demo-student/src/component/card/render.tsx
var _dec$3, _dec2$3, _class$3, RenderCard;
var init_render$1 = __esmMin((() => {
	init_src$1();
	init_src$2();
	RenderCard = (_dec$3 = Render(), _dec2$3 = BeanInfo({ module: "demo-student" }), _dec$3(_class$3 = _dec2$3(_class$3 = class RenderCard extends BeanRenderBase {
		render() {}
	}) || _class$3) || _class$3);
}));
//#endregion
//#region src/module/demo-student/src/.metadata/component/card.ts
var ZCard;
var init_card = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$2();
	init_render$1();
	ZCard = defineComponent((_props) => {
		useController(ControllerCard, RenderCard, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/module/demo-student/src/.metadata/component/test.ts
var ZTest;
var init_test = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$1();
	ZTest = defineComponent((_props) => {
		useController(ControllerTest, void 0, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/module/demo-student/src/page/render.tsx
var _dec$2, _dec2$2, _class$2, RenderPage;
var init_render = __esmMin((() => {
	init_src$1();
	init_src$2();
	RenderPage = (_dec$2 = Render(), _dec2$2 = BeanInfo({ module: "demo-student" }), _dec$2(_class$2 = _dec2$2(_class$2 = class RenderPage extends BeanRenderBase {
		render() {}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/module/demo-student/src/bean/aop.counterLog.ts
var _dec$1, _dec2$1, _class$1, AopCounterLog;
var init_aop_counterLog = __esmMin((() => {
	init_src$1();
	init_src$2();
	AopCounterLog = (_dec$1 = Aop({ match: "demo-student.controller.pageCounter" }), _dec2$1 = BeanInfo({ module: "demo-student" }), _dec$1(_class$1 = _dec2$1(_class$1 = class AopCounterLog extends BeanAopBase {
		constructor(...args) {
			super(...args);
			this.render = (_args, next, _receiver) => {
				const timeBegin = Date.now();
				const res = next();
				console.log(`render: ${Date.now() - timeBegin}ms`);
				return res;
			};
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/module/demo-student/src/config/config.ts
var config;
var init_config = __esmMin((() => {
	config = (_sys) => {
		return { title: "Hello World" };
	};
}));
//#endregion
//#region src/module/demo-student/src/config/constants.ts
var constants;
var init_constants = __esmMin((() => {
	constants = {};
}));
//#endregion
//#region src/module/demo-student/src/config/errors.ts
var errors;
var init_errors = __esmMin((() => {
	errors = {};
}));
//#endregion
//#region src/module/demo-student/src/monkey.ts
var Monkey;
var init_monkey = __esmMin((() => {
	init_src$1();
	init_asyncToGenerator();
	Monkey = class extends BeanSimple {
		moduleLoading(_module) {
			return _asyncToGenerator(function* () {})();
		}
		moduleLoaded(_module) {
			return _asyncToGenerator(function* () {})();
		}
		appInitialize() {
			return _asyncToGenerator(function* () {})();
		}
		appInitialized() {
			return _asyncToGenerator(function* () {})();
		}
		appReady() {
			return _asyncToGenerator(function* () {})();
		}
	};
}));
//#endregion
//#region src/module/demo-student/src/monkeySys.ts
var MonkeySys;
var init_monkeySys = __esmMin((() => {
	init_src$1();
	init_asyncToGenerator();
	MonkeySys = class extends BeanSimple {
		sysInitialize() {
			return _asyncToGenerator(function* () {})();
		}
	};
}));
//#endregion
//#region src/module/demo-student/src/main.ts
var Main;
var init_main = __esmMin((() => {
	init_src$1();
	init_asyncToGenerator();
	Main = class extends BeanSimple {
		moduleLoading() {
			return _asyncToGenerator(function* () {})();
		}
		moduleLoaded() {
			return _asyncToGenerator(function* () {})();
		}
	};
}));
//#endregion
//#region src/module/demo-student/src/mainSys.ts
var MainSys;
var init_mainSys = __esmMin((() => {
	init_src$1();
	init_asyncToGenerator();
	MainSys = class extends BeanSimple {
		moduleLoading() {
			return _asyncToGenerator(function* () {})();
		}
		moduleLoaded() {
			return _asyncToGenerator(function* () {})();
		}
		configLoaded(_config) {
			return _asyncToGenerator(function* () {})();
		}
	};
}));
//#endregion
//#region src/module/demo-student/src/.metadata/index.ts
/** api: end */
/** api: begin */
/** mainSys: end */
/** scope: begin */
function locale(key) {
	return `demo-student::${key}`;
}
var _dec, _dec2, _class, pagePathSchemas, pageNameSchemas, components, ScopeModuleDemoStudent;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_menu$1();
	init_test$2();
	init_src$3();
	init_menu();
	init_test$1();
	init_test3();
	init_bean_test();
	init_service_counter();
	init_service_test();
	init_service_test3();
	init_service_test4();
	init_src$2();
	init_store_test();
	init_controller$2();
	init_controller$1();
	init_controller();
	init_counter();
	init_counter();
	init_routes();
	init_card();
	init_card();
	init_test();
	init_test();
	init_render$1();
	init_render_more();
	init_render$2();
	init_render();
	init_style_more();
	init_style();
	init_aop_counterLog();
	init_config();
	init_constants();
	init_errors();
	init_monkey();
	init_monkeySys();
	init_main();
	init_mainSys();
	pagePathSchemas = { "/demo/student/counter": { query: NSControllerPageCounter.querySchema } };
	pageNameSchemas = {};
	components = {
		"card": ZCard,
		"test": ZTest
	};
	ScopeModuleDemoStudent = (_dec = Scope(), _dec2 = BeanInfo({ module: "demo-student" }), _dec(_class = _dec2(_class = class ScopeModuleDemoStudent extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/module/demo-student/src/index.ts
var init_src = __esmMin((() => {
	init_locales();
	init__metadata();
}));
//#endregion
export { ControllerCard as A, ModelTest as B, StylePageMore as C, ControllerPageCounterSchemaParams as D, ControllerPageCounter as E, ServiceCounter as F, $useLocale as H, BeanTest as I, ApiTest3 as L, ServiceTest4 as M, ServiceTest3 as N, ControllerPageCounterSchemaQuery as O, ServiceTest as P, ApiTest as R, StylePageCounter as S, RenderPageMore as T, locales as U, ModelMenu as V, ZCard as _, pageNameSchemas as a, NSControllerPageCounter as b, Main as c, errors as d, constants as f, ZTest as g, RenderPage as h, locale as i, StoreTest as j, ControllerTest as k, MonkeySys as l, AopCounterLog as m, ScopeModuleDemoStudent as n, pagePathSchemas as o, config as p, components as r, MainSys as s, init_src as t, Monkey as u, RenderCard as v, RenderPageCounter as w, ZPageCounter as x, routes as y, ApiMenu as z };
