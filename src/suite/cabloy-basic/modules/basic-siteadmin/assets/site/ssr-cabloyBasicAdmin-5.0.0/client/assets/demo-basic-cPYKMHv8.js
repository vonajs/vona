import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { _ as ref } from "./vue-BuTKVo3e.js";
import { c as createTextVNode, d as defineComponent, l as createVNode, o as computed, r as Fragment, v as mergeProps } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler, t as init_jsx_runtime } from "./vue-C_EuNVEw.js";
import { d as _objectSpread2, f as init_objectSpread2, m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { M as BeanBase, W as polyfillDispose, Y as useComputed, _ as BeanRenderBase, b as BeanControllerBase, c as createZovaComponentPage, h as BeanScopeBase, j as BeanAopBase, k as BeanInfo, l as prepareComponentOptions, m as createZovaComponentAsync, s as useApp, u as useController, v as BeanControllerPageBase, w as Use } from "./zova-BXlOOlVL.js";
import { a as number, i as boolean, o as object, r as array, s as string } from "./zod-DXuNtoi4.js";
import { t as init_zod } from "./zod-Xas5f9JK.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { _ as Render, f as Aop, h as Controller, o as Scope, t as init_src$2, y as Store } from "./a-bean-BQjv0q8B.js";
import { i as Model, l as BeanModelBase, r as $QueryAutoLoad, t as init_src$3 } from "./a-model-B9Gmxi-X.js";
import { i as init_lib_es2015, o as classes } from "./typestyle-CuQyLMpN.js";
import { i as BeanControllerPageFormBase, t as init_src$4 } from "./a-form-Cy_T-HPM.js";
import { o as init_vue_router, t as RouterLink } from "./vue-router-DF8M1khH.js";
import { a as Behavior, d as BeanBehaviorBase, o as ZBehavior, t as init_src$5 } from "./a-behavior-DMpiB_3-.js";
import { n as TableCell, t as init_src$6 } from "./a-table-BKsW9IA9.js";
import { a as BeanPiniaStoreBase, t as init_src$7 } from "./a-pinia-DZAhEKsh.js";
import { n as defineStore, r as init_pinia$1 } from "./pinia-BMZOY3mb.js";
import { a as Theme, n as BeanThemeBase, r as $getThemeName, t as init_src$8 } from "./a-style-QMiOt_mj.js";
//#region src/suite/a-demo/modules/demo-basic/src/model/test.ts
var _dec$22, _dec2$22, _class$22, ModelTest;
var init_test = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	ModelTest = (_dec$22 = Model(), _dec2$22 = BeanInfo({ module: "demo-basic" }), _dec$22(_class$22 = _dec2$22(_class$22 = class ModelTest extends BeanModelBase {
		test() {
			var _this = this;
			return this.$useStateData({
				queryKey: ["test"],
				queryFn: function() {
					var _ref = _asyncToGenerator(function* () {
						return yield _this.$api.testSsrToolOne.test({
							id: "1",
							name: "Tom",
							married: true,
							details: []
						}, {
							params: { id: "1" },
							query: { name: "Tom" }
						});
					});
					return function queryFn() {
						return _ref.apply(this, arguments);
					};
				}()
			});
		}
	}) || _class$22) || _class$22);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/counterStore.ts
var useCounterStore;
var init_counterStore = __esmMin((() => {
	init_pinia$1();
	init_vue_runtime_esm_bundler();
	useCounterStore = defineStore("counter", () => {
		const count = ref(0);
		const name = ref("apple");
		const doubleCount = computed(() => count.value * 2);
		function increment() {
			count.value++;
		}
		return {
			count,
			name,
			doubleCount,
			increment
		};
	});
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/store.counter.ts
var _dec$21, _dec2$21, _class$21, StoreCounter;
var init_store_counter = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	init_src$7();
	init_counterStore();
	StoreCounter = (_dec$21 = Store(), _dec2$21 = BeanInfo({ module: "demo-basic" }), _dec$21(_class$21 = _dec2$21(_class$21 = class StoreCounter extends BeanPiniaStoreBase {
		__init__() {
			var _superprop_get__init__ = () => super.__init__, _this = this;
			return _asyncToGenerator(function* () {
				yield _superprop_get__init__().call(_this, useCounterStore);
			})();
		}
	}) || _class$21) || _class$21);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/component/actionView/controller.tsx
function _initializerDefineProperty$5(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor$5(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$20, _dec2$20, _dec3$5, _dec4$5, _class$20, _class2$5, _descriptor$5, _ControllerActionView, ControllerActionView;
var init_controller$13 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerActionView = (_dec$20 = Controller(), _dec2$20 = BeanInfo({ module: "demo-basic" }), _dec3$5 = Use({ injectionScope: "host" }), _dec4$5 = Reflect.metadata("design:type", typeof IJsxRenderContextTableCell === "undefined" ? Object : IJsxRenderContextTableCell), _dec$20(_class$20 = _dec2$20(_class$20 = (_class2$5 = (_ControllerActionView = class ControllerActionView extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty$5(this, "$$renderContext", _descriptor$5, this);
		}
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			var _this = this;
			if (!this.$$renderContext) throw new Error("should used in table");
			const { $jsx, $celScope } = this.$$renderContext;
			return createVNode("a", {
				"class": "hover:text-blue-500",
				"href": "#",
				"onClick": function() {
					var _ref = _asyncToGenerator(function* (e) {
						e.preventDefault();
						e.stopPropagation();
						const actionName = $jsx.normalizeAction("actionView");
						yield _this.$performAction(actionName, void 0, _this.$$renderContext);
					});
					return function onClick(_x) {
						return _ref.apply(this, arguments);
					};
				}()
			}, [this.$slotDefault ? this.$slotDefault() : $celScope.displayValue]);
		}
	}, _ControllerActionView.$propsDefault = {}, _ControllerActionView), _descriptor$5 = _applyDecoratedDescriptor$5(_class2$5.prototype, "$$renderContext", [_dec3$5, _dec4$5], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$5)) || _class$20) || _class$20);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/component/card/controller.tsx
var _dec$19, _dec2$19, _class$19, _ControllerCard, ControllerCard;
var init_controller$12 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	ControllerCard = (_dec$19 = Controller(), _dec2$19 = BeanInfo({ module: "demo-basic" }), _dec$19(_class$19 = _dec2$19(_class$19 = (_ControllerCard = class ControllerCard extends BeanControllerBase {
		render() {
			var _this$$props$slotHead, _this$$props2, _this$$slotDefault, _this$$props$slotFoot, _this$$props3;
			return createVNode("div", null, [createVNode("button", {
				"class": "btn btn-primary",
				"onClick": () => {
					var _this$$props$onReset, _this$$props;
					(_this$$props$onReset = (_this$$props = this.$props).onReset) === null || _this$$props$onReset === void 0 || _this$$props$onReset.call(_this$$props, /* @__PURE__ */ new Date());
				}
			}, [createTextVNode("Reset Time")]), createVNode("div", null, [
				createVNode("div", { "style": { backgroundColor: "teal" } }, [createVNode("div", null, [createVNode("div", null, [createTextVNode("Slot:")]), (_this$$props$slotHead = (_this$$props2 = this.$props).slotHeader) === null || _this$$props$slotHead === void 0 ? void 0 : _this$$props$slotHead.call(_this$$props2)]), createVNode("div", null, [`Prop: ${this.$props.header}`])]),
				createVNode("div", { "style": { backgroundColor: "orange" } }, [createVNode("div", null, [createVNode("div", null, [createTextVNode("Slot:")]), (_this$$slotDefault = this.$slotDefault) === null || _this$$slotDefault === void 0 ? void 0 : _this$$slotDefault.call(this)]), createVNode("div", null, [`Prop: ${this.$props.content}`])]),
				createVNode("div", { "style": { backgroundColor: "green" } }, [createVNode("div", null, [createVNode("div", null, [createTextVNode("Slot")]), (_this$$props$slotFoot = (_this$$props3 = this.$props).slotFooter) === null || _this$$props$slotFoot === void 0 ? void 0 : _this$$props$slotFoot.call(_this$$props3)]), createVNode("div", null, [`Prop: ${this.$props.footer}`])])
			])]);
		}
	}, _ControllerCard.$propsDefault = { header: "default header" }, _ControllerCard)) || _class$19) || _class$19);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/component/formFieldTest/controller.tsx
var _dec$18, _dec2$18, _class$18, _ControllerFormFieldTest, ZFormField$1, ControllerFormFieldTest;
var init_controller$11 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ZFormField$1 = createZovaComponentAsync("a-form", "formField");
	ControllerFormFieldTest = (_dec$18 = Controller(), _dec2$18 = BeanInfo({ module: "demo-basic" }), _dec$18(_class$18 = _dec2$18(_class$18 = (_ControllerFormFieldTest = class ControllerFormFieldTest extends BeanControllerBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			var _this$$props$slotHead, _this$$props, _this$$props$slotFoot, _this$$props2;
			const domField = this.$slotDefault ? this.$slotDefault() : createVNode(ZFormField$1, mergeProps(this.$props, { "render": "text" }), null);
			return createVNode(Fragment, null, [
				(_this$$props$slotHead = (_this$$props = this.$props).slotHeader) === null || _this$$props$slotHead === void 0 ? void 0 : _this$$props$slotHead.call(_this$$props, { name: "kevin" }),
				domField,
				this.$props.showLog && createVNode("div", null, [`log: ${this.$props.name}`]),
				(_this$$props$slotFoot = (_this$$props2 = this.$props).slotFooter) === null || _this$$props$slotFoot === void 0 ? void 0 : _this$$props$slotFoot.call(_this$$props2, { name: "jimmy" })
			]);
		}
	}, _ControllerFormFieldTest.$propsDefault = {}, _ControllerFormFieldTest.$componentOptions = { inheritAttrs: false }, _ControllerFormFieldTest)) || _class$18) || _class$18);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/component/tableCellTest/controller.tsx
function _initializerDefineProperty$4(e, i, r, l) {
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
var _dec$17, _dec2$17, _dec3$4, _dec4$4, _class$17, _class2$4, _descriptor$4, _ControllerTableCellTest, ControllerTableCellTest;
var init_controller$10 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerTableCellTest = (_dec$17 = Controller(), _dec2$17 = BeanInfo({ module: "demo-basic" }), _dec3$4 = Use({ injectionScope: "host" }), _dec4$4 = Reflect.metadata("design:type", typeof IJsxRenderContextTableCell === "undefined" ? Object : IJsxRenderContextTableCell), _dec$17(_class$17 = _dec2$17(_class$17 = (_class2$4 = (_ControllerTableCellTest = class ControllerTableCellTest extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty$4(this, "$$renderContext", _descriptor$4, this);
		}
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			var _this$$props$slotHead, _this$$props, _this$$props$slotFoot, _this$$props2;
			const { name, displayValue } = this.$$renderContext.$celScope;
			const domCell = this.$slotDefault ? this.$slotDefault() : displayValue;
			return createVNode(Fragment, null, [
				(_this$$props$slotHead = (_this$$props = this.$props).slotHeader) === null || _this$$props$slotHead === void 0 ? void 0 : _this$$props$slotHead.call(_this$$props, { name: "kevin" }),
				domCell,
				this.$props.showLog && createVNode("div", null, [`log: ${name}`]),
				(_this$$props$slotFoot = (_this$$props2 = this.$props).slotFooter) === null || _this$$props$slotFoot === void 0 ? void 0 : _this$$props$slotFoot.call(_this$$props2, { name: "jimmy" })
			]);
		}
	}, _ControllerTableCellTest.$propsDefault = {}, _ControllerTableCellTest), _descriptor$4 = _applyDecoratedDescriptor$4(_class2$4.prototype, "$$renderContext", [_dec3$4, _dec4$4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$4)) || _class$17) || _class$17);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/component/controller.tsx
var _dec$16, _dec2$16, _class$16, ZPage$7, ControllerPageComponent;
var init_controller$9 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$5();
	init_src$2();
	init_src();
	ZPage$7 = createZovaComponentAsync("home-base", "page");
	ControllerPageComponent = (_dec$16 = Controller(), _dec2$16 = BeanInfo({ module: "demo-basic" }), _dec$16(_class$16 = _dec2$16(_class$16 = class ControllerPageComponent extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			this.resetTime = /* @__PURE__ */ new Date();
			this.cardRef = void 0;
		}
		render() {
			return createVNode(ZPage$7, null, { default: () => [
				createVNode(ZCard, {
					"controllerRef": (ref) => {
						var _this$cardRef;
						this.cardRef = ref;
						console.log("cardRef.$props: ", (_this$cardRef = this.cardRef) === null || _this$cardRef === void 0 ? void 0 : _this$cardRef.$props);
					},
					"header": "header",
					"content": this.resetTime.toString(),
					"footer": "footer",
					"onReset": (time) => {
						this.resetTime = time;
					},
					"slotHeader": () => {
						return createVNode("div", null, [createTextVNode("this is a header slot from parent")]);
					},
					"slotFooter": () => {
						return createVNode("div", null, [createTextVNode("this is a footer slot from parent")]);
					}
				}, { default: () => [createVNode("div", null, [createTextVNode("this is a default slot from parent")])] }),
				createVNode("label", null, [createTextVNode("Input: ")]),
				createVNode(ZBehavior, {
					"type": "text",
					"class": "input input-bordered w-full max-w-xs",
					"value": this.resetTime.toString(),
					"ref": (ref) => {
						console.log("outer:", ref);
					},
					"behaviors": ["a-behaviors:focus"],
					"behaviorTag": {
						component: "input",
						name: "input"
					}
				}, null)
			] });
		}
	}) || _class$16) || _class$16);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/locale/controller.tsx
var _dec$15, _dec2$15, _class$15, ZPage$6, ControllerPageLocale;
var init_controller$8 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ZPage$6 = createZovaComponentAsync("home-base", "page");
	ControllerPageLocale = (_dec$15 = Controller(), _dec2$15 = BeanInfo({ module: "demo-basic" }), _dec$15(_class$15 = _dec2$15(_class$15 = class ControllerPageLocale extends BeanControllerPageBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			return createVNode(ZPage$6, null, { default: () => [
				createVNode("div", null, [
					this.app.meta.locale.current,
					createTextVNode(":"),
					this.scope.locale.HelloWorld()
				]),
				createVNode("div", null, [this.scope.locale.HelloWorld()]),
				createVNode("button", {
					"class": "btn btn-primary",
					"onClick": () => {
						if (this.app.meta.locale.current === "en-us") this.app.meta.locale.current = "zh-cn";
						else this.app.meta.locale.current = "en-us";
					}
				}, [this.scope.locale.ChangeLanguage()])
			] });
		}
	}) || _class$15) || _class$15);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/pinia/controller.tsx
function _initializerDefineProperty$3(e, i, r, l) {
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
var _dec$14, _dec2$14, _dec3$3, _dec4$3, _class$14, _class2$3, _descriptor$3, ZPage$5, ControllerPagePinia;
var init_controller$7 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	init_store_counter();
	ZPage$5 = createZovaComponentAsync("home-base", "page");
	ControllerPagePinia = (_dec$14 = Controller(), _dec2$14 = BeanInfo({ module: "demo-basic" }), _dec3$3 = Use(), _dec4$3 = Reflect.metadata("design:type", typeof StoreCounter === "undefined" ? Object : StoreCounter), _dec$14(_class$14 = _dec2$14(_class$14 = (_class2$3 = class ControllerPagePinia extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty$3(this, "$$counter", _descriptor$3, this);
		}
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			return createVNode(ZPage$5, null, { default: () => [
				createVNode("div", null, [`count: ${this.$$counter.count}`]),
				createVNode("div", null, [`doubleCount: ${this.$$counter.doubleCount}`]),
				createVNode("div", null, [`name: ${this.$$counter.name}`]),
				createVNode("button", {
					"class": "btn btn-primary",
					"onClick": () => {
						this.$$counter.increment();
					}
				}, [createTextVNode("Increment")])
			] });
		}
	}, _descriptor$3 = _applyDecoratedDescriptor$3(_class2$3.prototype, "$$counter", [_dec3$3, _dec4$3], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$3)) || _class$14) || _class$14);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/routeParams/controller.tsx
var _dec$13, _dec2$13, _class$13, ZPage$4, ControllerPageRouteParamsSchemaParams, ControllerPageRouteParamsSchemaQuery, ControllerPageRouteParams;
var init_controller$6 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_zod();
	init_src$2();
	ZPage$4 = createZovaComponentAsync("home-base", "page");
	ControllerPageRouteParamsSchemaParams = object({ id: number().optional().default(0) });
	ControllerPageRouteParamsSchemaQuery = object({});
	ControllerPageRouteParams = (_dec$13 = Controller(), _dec2$13 = BeanInfo({ module: "demo-basic" }), _dec$13(_class$13 = _dec2$13(_class$13 = class ControllerPageRouteParams extends BeanControllerPageBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			return createVNode(ZPage$4, null, { default: () => {
				var _this$$pageRoute;
				return [(_this$$pageRoute = this.$pageRoute) === null || _this$$pageRoute === void 0 ? void 0 : _this$$pageRoute.fullPath, createVNode("div", { "class": "overflow-x-auto" }, [createVNode("table", { "class": "table" }, [createVNode("thead", null, [createVNode("tr", null, [
					createVNode("th", null, [createTextVNode("Name")]),
					createVNode("th", null, [createTextVNode("Value")]),
					createVNode("th", null, [createTextVNode("Type")])
				])]), createVNode("tbody", null, [createVNode("tr", null, [
					createVNode("td", null, [createTextVNode("$params.id")]),
					createVNode("td", null, [this.$params.id]),
					createVNode("td", null, [typeof this.$params.id])
				])])]), createVNode("button", {
					"class": "btn btn-primary",
					"onClick": () => {
						const id = this.$params.id + 1;
						const url = this.$router.getPagePath("/demo/basic/routeParams/:id?", { params: { id } });
						this.$router.push(url);
					}
				}, [createTextVNode("Go to current page with different params value")])])];
			} });
		}
	}) || _class$13) || _class$13);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/routeQuery/controller.tsx
var _dec$12, _dec2$12, _class$12, ZPage$3, ControllerPageRouteQuerySchemaParams, ControllerPageRouteQuerySchemaQuery, ControllerPageRouteQuery;
var init_controller$5 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_zod();
	init_src$2();
	ZPage$3 = createZovaComponentAsync("home-base", "page");
	ControllerPageRouteQuerySchemaParams = object({});
	ControllerPageRouteQuerySchemaQuery = object({
		name: string().optional(),
		age: number().optional()
	});
	ControllerPageRouteQuery = (_dec$12 = Controller(), _dec2$12 = BeanInfo({ module: "demo-basic" }), _dec$12(_class$12 = _dec2$12(_class$12 = class ControllerPageRouteQuery extends BeanControllerPageBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			return createVNode(ZPage$3, null, { default: () => [createVNode("div", { "class": "overflow-x-auto" }, [createVNode("table", { "class": "table" }, [createVNode("thead", null, [createVNode("tr", null, [
				createVNode("th", null, [createTextVNode("Name")]),
				createVNode("th", null, [createTextVNode("Value")]),
				createVNode("th", null, [createTextVNode("Type")])
			])]), createVNode("tbody", null, [createVNode("tr", null, [
				createVNode("td", null, [createTextVNode("$query.name")]),
				createVNode("td", null, [this.$query.name]),
				createVNode("td", null, [typeof this.$query.name])
			]), createVNode("tr", null, [
				createVNode("td", null, [createTextVNode("$query.age")]),
				createVNode("td", null, [this.$query.age]),
				createVNode("td", null, [typeof this.$query.age])
			])])]), createVNode("button", {
				"class": "btn btn-primary",
				"onClick": () => {
					var _this$$query$age;
					const name = this.$query.name === "tom" ? "kevin" : "tom";
					const age = ((_this$$query$age = this.$query.age) !== null && _this$$query$age !== void 0 ? _this$$query$age : 0) + 1;
					const url = this.$router.getPagePath("/demo/basic/routeQuery", { query: {
						name,
						age
					} });
					this.$router.push(url);
				}
			}, [createTextVNode("Go to current page with different query value")])])] });
		}
	}) || _class$12) || _class$12);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/routeQueryB/controller.tsx
var _dec$11, _dec2$11, _class$11, ZPage$2, ControllerPageRouteQueryBSchemaParams, ControllerPageRouteQueryBSchemaQuery, ControllerPageRouteQueryB;
var init_controller$4 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_objectSpread2();
	init_src$1();
	init_zod();
	init_src$2();
	ZPage$2 = createZovaComponentAsync("home-base", "page");
	ControllerPageRouteQueryBSchemaParams = object({});
	ControllerPageRouteQueryBSchemaQuery = object({
		tabName: string().optional().default("boolean"),
		private: boolean().optional(),
		user: object({
			name: string(),
			age: number()
		}).optional(),
		todos: array(object({
			title: string(),
			done: boolean()
		})).optional()
	});
	ControllerPageRouteQueryB = (_dec$11 = Controller(), _dec2$11 = BeanInfo({ module: "demo-basic" }), _dec$11(_class$11 = _dec2$11(_class$11 = class ControllerPageRouteQueryB extends BeanControllerPageBase {
		togglePrivate() {
			const _private = !this.$query.private;
			const query = _objectSpread2(_objectSpread2({}, this.$query), {}, { private: _private });
			const url = this.$router.getPagePath("/demo/basic/routeQueryB", { query });
			this.$router.push(url);
		}
		toggleUser() {
			var _this$$query$user;
			const user = ((_this$$query$user = this.$query.user) === null || _this$$query$user === void 0 ? void 0 : _this$$query$user.name) === "tom" ? {
				name: "kevin",
				age: 18
			} : {
				name: "tom",
				age: 6
			};
			const query = _objectSpread2(_objectSpread2({}, this.$query), {}, { user });
			const url = this.$router.getPagePath("/demo/basic/routeQueryB", { query });
			this.$router.push(url);
		}
		toggleTodos() {
			var _this$$query$todos$le, _this$$query$todos;
			const todo = ((_this$$query$todos$le = (_this$$query$todos = this.$query.todos) === null || _this$$query$todos === void 0 ? void 0 : _this$$query$todos.length) !== null && _this$$query$todos$le !== void 0 ? _this$$query$todos$le : 0) % 2 === 0 ? {
				title: "Running",
				done: false
			} : {
				title: "Eating",
				done: true
			};
			const todos = this.$query.todos ? [todo].concat(this.$query.todos) : [todo];
			const query = _objectSpread2(_objectSpread2({}, this.$query), {}, { todos });
			const url = this.$router.getPagePath("/demo/basic/routeQueryB", { query });
			this.$router.push(url);
		}
		toggleTab(event, tabName) {
			if (!event.target.checked) return;
			const query = _objectSpread2(_objectSpread2({}, this.$query), {}, { tabName });
			const url = this.$router.getPagePath("/demo/basic/routeQueryB", { query });
			this.$router.push(url);
		}
		render() {
			return createVNode(ZPage$2, null, { default: () => {
				var _this$$query$private, _this$$query$user2, _this$$query$user3, _this$$query$user4, _this$$query$user5, _this$$query$todos2;
				return [createVNode("div", {
					"role": "tablist",
					"class": "tabs tabs-lifted"
				}, [
					createVNode("input", {
						"type": "radio",
						"name": "my_tabs_2",
						"role": "tab",
						"class": "tab",
						"aria-label": "boolean",
						"checked": this.$query.tabName === "boolean",
						"onChange": (event) => {
							this.toggleTab(event, "boolean");
						}
					}, null),
					createVNode("div", {
						"role": "tabpanel",
						"class": "tab-content bg-base-100 border-base-300 rounded-box p-6"
					}, [createVNode("div", { "class": "card bg-base-100 w-96 shadow-xl" }, [createVNode("div", { "class": "card-body" }, [
						createVNode("h2", { "class": "card-title" }, [createTextVNode("$query.private")]),
						createVNode("table", { "class": "table" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, [createTextVNode("Name")]),
							createVNode("th", null, [createTextVNode("Value")]),
							createVNode("th", null, [createTextVNode("Type")])
						])]), createVNode("tbody", null, [createVNode("tr", null, [
							createVNode("td", null, [createTextVNode("$query.private")]),
							createVNode("td", null, [(_this$$query$private = this.$query.private) === null || _this$$query$private === void 0 ? void 0 : _this$$query$private.toString()]),
							createVNode("td", null, [typeof this.$query.private])
						])])]),
						createVNode("div", { "class": "card-actions justify-end" }, [createVNode("button", {
							"class": "btn btn-primary",
							"onClick": () => {
								this.togglePrivate();
							}
						}, [createTextVNode("Go to current page with different private value")])])
					])])]),
					createVNode("input", {
						"type": "radio",
						"name": "my_tabs_2",
						"role": "tab",
						"class": "tab",
						"aria-label": "json",
						"checked": this.$query.tabName === "json",
						"onChange": (event) => {
							this.toggleTab(event, "json");
						}
					}, null),
					createVNode("div", {
						"role": "tabpanel",
						"class": "tab-content bg-base-100 border-base-300 rounded-box p-6"
					}, [createVNode("div", { "class": "card bg-base-100 w-96 shadow-xl" }, [createVNode("div", { "class": "card-body" }, [
						createVNode("h2", { "class": "card-title" }, [createTextVNode("$query.user")]),
						createVNode("table", { "class": "table" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, [createTextVNode("Name")]),
							createVNode("th", null, [createTextVNode("Value")]),
							createVNode("th", null, [createTextVNode("Type")])
						])]), createVNode("tbody", null, [createVNode("tr", null, [
							createVNode("td", null, [createTextVNode("$query.user?.name")]),
							createVNode("td", null, [(_this$$query$user2 = this.$query.user) === null || _this$$query$user2 === void 0 ? void 0 : _this$$query$user2.name]),
							createVNode("td", null, [typeof ((_this$$query$user3 = this.$query.user) === null || _this$$query$user3 === void 0 ? void 0 : _this$$query$user3.name)])
						]), createVNode("tr", null, [
							createVNode("td", null, [createTextVNode("$query.user?.age")]),
							createVNode("td", null, [(_this$$query$user4 = this.$query.user) === null || _this$$query$user4 === void 0 ? void 0 : _this$$query$user4.age]),
							createVNode("td", null, [typeof ((_this$$query$user5 = this.$query.user) === null || _this$$query$user5 === void 0 ? void 0 : _this$$query$user5.age)])
						])])]),
						createVNode("div", { "class": "card-actions justify-end" }, [createVNode("button", {
							"class": "btn btn-primary",
							"onClick": () => {
								this.toggleUser();
							}
						}, [createTextVNode("Go to current page with different user value")])])
					])])]),
					createVNode("input", {
						"type": "radio",
						"name": "my_tabs_2",
						"role": "tab",
						"class": "tab",
						"aria-label": "array",
						"checked": this.$query.tabName === "array",
						"onChange": (event) => {
							this.toggleTab(event, "array");
						}
					}, null),
					createVNode("div", {
						"role": "tabpanel",
						"class": "tab-content bg-base-100 border-base-300 rounded-box p-6"
					}, [createVNode("div", { "class": "card bg-base-100 w-96 shadow-xl" }, [createVNode("div", { "class": "card-body" }, [
						createVNode("h2", { "class": "card-title" }, [createTextVNode("$query.todos")]),
						createVNode("table", { "class": "table" }, [createVNode("thead", null, [createVNode("tr", null, [createVNode("th", null, [createTextVNode("Title")]), createVNode("th", null, [createTextVNode("Done")])])]), createVNode("tbody", null, [(_this$$query$todos2 = this.$query.todos) === null || _this$$query$todos2 === void 0 ? void 0 : _this$$query$todos2.map((item) => {
							return createVNode("tr", null, [createVNode("td", null, [item.title]), createVNode("td", null, [createVNode("input", {
								"type": "checkbox",
								"checked": item.done,
								"class": "checkbox checkbox-success"
							}, null)])]);
						})])]),
						createVNode("div", { "class": "card-actions justify-end" }, [createVNode("button", {
							"class": "btn btn-primary",
							"onClick": () => {
								this.toggleTodos();
							}
						}, [createTextVNode("Go to current page with different todos value")])])
					])])])
				])];
			} });
		}
	}) || _class$11) || _class$11);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/state/controller.tsx
var _dec$10, _dec2$10, _class$10, ZPage$1, ControllerPageState;
var init_controller$3 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ZPage$1 = createZovaComponentAsync("home-base", "page");
	ControllerPageState = (_dec$10 = Controller(), _dec2$10 = BeanInfo({ module: "demo-basic" }), _dec$10(_class$10 = _dec2$10(_class$10 = class ControllerPageState extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			this.count = 0;
			this.count2 = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.count2 = useComputed(() => {
					return `=== ${_this.count} ===`;
				});
			})();
		}
		increment() {
			this.count++;
		}
		decrement() {
			this.count--;
		}
		render() {
			return createVNode(ZPage$1, null, { default: () => [
				createVNode("div", null, [`count(ref): ${this.count}`]),
				createVNode("div", null, [`count(computed): ${this.count2}`]),
				createVNode("button", {
					"class": "btn btn-primary",
					"onClick": () => this.increment()
				}, [createTextVNode("Increment")]),
				createVNode("button", {
					"class": "btn btn-secondary",
					"onClick": () => this.decrement()
				}, [createTextVNode("Decrement")])
			] });
		}
	}) || _class$10) || _class$10);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/style/controller.tsx
var _dec$9, _dec2$9, _class$9, ZPage, ControllerPageStyle;
var init_controller$2 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	init_src$8();
	ZPage = createZovaComponentAsync("home-base", "page");
	ControllerPageStyle = (_dec$9 = Controller(), _dec2$9 = BeanInfo({ module: "demo-basic" }), _dec$9(_class$9 = _dec2$9(_class$9 = class ControllerPageStyle extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			this.active = void 0;
			this.cTextColor = void 0;
			this.cBlock = void 0;
			this.renderHello = void 0;
			this.renderHello2 = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.cTextColor = useComputed(() => {
					return _this.$style({ color: _this.active ? _this.$token.color.primary : "" });
				});
				_this.cBlock = useComputed(() => {
					return _this.$style({ padding: "8px" });
				});
				_this.renderHello = createVNode("div", { "class": _this.cTextColor }, [createTextVNode("Hello World")]);
				_this.renderHello2 = useComputed(() => {
					return createVNode("div", { "class": _this.cTextColor }, [createTextVNode("Hello World")]);
				});
			})();
		}
		render() {
			var _this2 = this;
			return createVNode(ZPage, null, { default: () => [
				createVNode("hr", null, null),
				createVNode("div", { "class": this.cTextColor }, [createTextVNode("Hello World")]),
				this.renderHello,
				this.renderHello2,
				createVNode("button", {
					"class": "btn btn-primary",
					"onClick": () => {
						this.active = !this.active;
					}
				}, [createTextVNode("Switch Active")]),
				createVNode("hr", null, null),
				createVNode("div", { "class": this.$css.textCenter }, [
					createVNode("div", null, [createTextVNode("$css.textCenter")]),
					createVNode("button", { "class": this.$css.buttonPrimary }, [`$token.color.primary: ${this.$token.color.primary}`]),
					createVNode("hr", null, null),
					createVNode("div", { "class": this.cBlock }, [
						createVNode("div", null, [`dark: ${String(this.$theme.dark)}`]),
						createVNode("div", null, [`dark mode: ${String(this.$theme.darkMode)}`]),
						createVNode("div", null, [createVNode("select", {
							"class": "select select-bordered w-full max-w-xs",
							"onChange": function() {
								var _ref = _asyncToGenerator(function* (e) {
									const value = e.target.value;
									const darkMode = value === "auto" ? value : value === "true";
									_this2.$theme.darkMode = darkMode;
								});
								return function onChange(_x) {
									return _ref.apply(this, arguments);
								};
							}()
						}, [
							createVNode("option", {
								"value": false,
								"selected": this.$theme.darkMode === false
							}, [createTextVNode("Light")]),
							createVNode("option", {
								"value": true,
								"selected": this.$theme.darkMode === true
							}, [createTextVNode("Dark")]),
							createVNode("option", {
								"value": "auto",
								"selected": this.$theme.darkMode === "auto"
							}, [createTextVNode("Auto")])
						])]),
						createVNode("hr", null, null),
						createVNode("div", { "style": { color: this.$token.color.primary } }, [createTextVNode("theme:"), this.$theme.name]),
						createVNode("div", null, [createVNode("select", {
							"class": "select select-bordered w-full max-w-xs",
							"onChange": function() {
								var _ref2 = _asyncToGenerator(function* (e) {
									const target = e.target;
									_this2.$theme.name = target.value;
								});
								return function onChange(_x2) {
									return _ref2.apply(this, arguments);
								};
							}()
						}, [createVNode("option", {
							"value": $getThemeName("home-base:default"),
							"selected": this.$theme.name === $getThemeName("home-base:default")
						}, [createTextVNode("Default")]), createVNode("option", {
							"value": $getThemeName("demo-basic:orange"),
							"selected": this.$theme.name === $getThemeName("demo-basic:orange")
						}, [createTextVNode("Orange")])])])
					])
				])
			] });
		}
	}) || _class$9) || _class$9);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/toolOne/controller.tsx
function _initializerDefineProperty$2(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor$2(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$8, _dec2$8, _dec3$2, _dec4$2, _class$8, _class2$2, _descriptor$2, ControllerPageToolOneSchemaParams, ControllerPageToolOneSchemaQuery, ControllerPageToolOne;
var init_controller$1 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_zod();
	init_src$2();
	init_src$4();
	init_src$3();
	init_test();
	ControllerPageToolOneSchemaParams = object({ id: number().optional() });
	ControllerPageToolOneSchemaQuery = object({ name: string().optional() });
	ControllerPageToolOne = (_dec$8 = Controller(), _dec2$8 = BeanInfo({ module: "demo-basic" }), _dec3$2 = Use(), _dec4$2 = Reflect.metadata("design:type", typeof ModelTest === "undefined" ? Object : ModelTest), _dec$8(_class$8 = _dec2$8(_class$8 = (_class2$2 = class ControllerPageToolOne extends BeanControllerPageFormBase {
		constructor(...args) {
			super(...args);
			this.schemaUpdate = void 0;
			_initializerDefineProperty$2(this, "$$modelTest", _descriptor$2, this);
			this.controllerForm = void 0;
			this.fieldName = "name";
			this.formData = void 0;
			this.formMeta = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				const apiSchemas = _this.$apiSchema.testSsrToolOne.test();
				const querySdk = yield $QueryAutoLoad(() => apiSchemas.sdk);
				_this.schemaUpdate = _this.$useComputed(() => {
					const schema = apiSchemas.requestBody;
					console.log("schema: ", schema);
					return schema;
				});
				console.log("sdk: ", querySdk === null || querySdk === void 0 ? void 0 : querySdk.data);
				_this.formData = { name: "tom" };
				_this.formMeta = {
					formMode: "edit",
					editMode: "update"
				};
			})();
		}
		onSubmit(data) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				console.log("submit auto: ", JSON.stringify(data.value));
				_this2.formData = data.value;
			})();
		}
	}, _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$modelTest", [_dec3$2, _dec4$2], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$2)) || _class$8) || _class$8);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/toolTwo/controller.tsx
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
var _dec$7, _dec2$7, _dec3$1, _dec4$1, _class$7, _class2$1, _descriptor$1, ControllerPageToolTwoSchemaParams, ControllerPageToolTwoSchemaQuery, ControllerPageToolTwo;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_vue_router();
	init_zod();
	init_src$2();
	ControllerPageToolTwoSchemaParams = object({ id: number().optional() });
	ControllerPageToolTwoSchemaQuery = object({ name: string().optional() });
	ControllerPageToolTwo = (_dec$7 = Controller(), _dec2$7 = BeanInfo({ module: "demo-basic" }), _dec3$1 = Use("a-router.model.pageData"), _dec4$1 = Reflect.metadata("design:type", typeof ModelPageData === "undefined" ? Object : ModelPageData), _dec$7(_class$7 = _dec2$7(_class$7 = (_class2$1 = class ControllerPageToolTwo extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty$1(this, "$$modelPageData", _descriptor$1, this);
		}
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			const pageData = this.$$modelPageData.current;
			return createVNode("div", null, [
				createVNode("div", null, [`id: ${pageData === null || pageData === void 0 ? void 0 : pageData.id}`]),
				createVNode("div", null, [`name: ${pageData === null || pageData === void 0 ? void 0 : pageData.name}`]),
				createVNode("div", null, [`married: ${pageData === null || pageData === void 0 ? void 0 : pageData.married}`]),
				createVNode(RouterLink, { "to": this.sys.env.ROUTER_PAGE_HOME }, { default: () => [createTextVNode("Go Home")] })
			]);
		}
	}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$modelPageData", [_dec3$1, _dec4$1], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$1)) || _class$7) || _class$7);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/component.ts
var ZPageComponent;
var init_component = __esmMin((() => {
	init_src$1();
	init_controller$9();
	ZPageComponent = createZovaComponentPage(ControllerPageComponent, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/locale.ts
var ZPageLocale;
var init_locale = __esmMin((() => {
	init_src$1();
	init_controller$8();
	ZPageLocale = createZovaComponentPage(ControllerPageLocale, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/pinia.ts
var ZPagePinia;
var init_pinia = __esmMin((() => {
	init_src$1();
	init_controller$7();
	ZPagePinia = createZovaComponentPage(ControllerPagePinia, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/routeParams.ts
var NSControllerPageRouteParams, ZPageRouteParams;
var init_routeParams = __esmMin((() => {
	init_src$1();
	init_controller$6();
	(function(_NSControllerPageRouteParams) {
		_NSControllerPageRouteParams.paramsSchema = ControllerPageRouteParamsSchemaParams;
		_NSControllerPageRouteParams.querySchema = ControllerPageRouteParamsSchemaQuery;
	})(NSControllerPageRouteParams || (NSControllerPageRouteParams = {}));
	ZPageRouteParams = createZovaComponentPage(ControllerPageRouteParams, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/routeQuery.ts
var NSControllerPageRouteQuery, ZPageRouteQuery;
var init_routeQuery = __esmMin((() => {
	init_src$1();
	init_controller$5();
	(function(_NSControllerPageRouteQuery) {
		_NSControllerPageRouteQuery.paramsSchema = ControllerPageRouteQuerySchemaParams;
		_NSControllerPageRouteQuery.querySchema = ControllerPageRouteQuerySchemaQuery;
	})(NSControllerPageRouteQuery || (NSControllerPageRouteQuery = {}));
	ZPageRouteQuery = createZovaComponentPage(ControllerPageRouteQuery, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/routeQueryB.ts
var NSControllerPageRouteQueryB, ZPageRouteQueryB;
var init_routeQueryB = __esmMin((() => {
	init_src$1();
	init_controller$4();
	(function(_NSControllerPageRouteQueryB) {
		_NSControllerPageRouteQueryB.paramsSchema = ControllerPageRouteQueryBSchemaParams;
		_NSControllerPageRouteQueryB.querySchema = ControllerPageRouteQueryBSchemaQuery;
	})(NSControllerPageRouteQueryB || (NSControllerPageRouteQueryB = {}));
	ZPageRouteQueryB = createZovaComponentPage(ControllerPageRouteQueryB, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/state.ts
var ZPageState;
var init_state = __esmMin((() => {
	init_src$1();
	init_controller$3();
	ZPageState = createZovaComponentPage(ControllerPageState, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/style.ts
var ZPageStyle;
var init_style = __esmMin((() => {
	init_src$1();
	init_controller$2();
	ZPageStyle = createZovaComponentPage(ControllerPageStyle, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/page/toolOne/render.tsx
var _dec$6, _dec2$6, _class$6, ZFormSubscribe, ZFormField, ZForm, RenderPageToolOne;
var init_render = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_lib_es2015();
	init_zod();
	init_src$2();
	ZFormSubscribe = createZovaComponentAsync("a-form", "formSubscribe");
	ZFormField = createZovaComponentAsync("a-form", "formField");
	ZForm = createZovaComponentAsync("a-form", "form");
	RenderPageToolOne = (_dec$6 = Render(), _dec2$6 = BeanInfo({ module: "demo-basic" }), _dec$6(_class$6 = _dec2$6(_class$6 = class RenderPageToolOne extends BeanRenderBase {
		_renderAuto() {
			return createVNode("div", null, [createVNode(ZForm, {
				"controllerRef": (ref) => {
					this.controllerForm = ref;
				},
				"data": this.formData,
				"schema": this.schemaUpdate,
				"formMeta": this.formMeta,
				"onSubmitData": (data) => this.onSubmit(data),
				"onShowError": ({ error }) => {
					window.alert(error.message);
				},
				"slotFooter": ($$form) => {
					return createVNode("div", null, [$$form.formState.isSubmitting && createVNode("span", { "class": "loading loading-spinner text-primary" }, null), this.formMeta.formMode === "edit" && createVNode("button", {
						"class": classes("btn btn-primary", $$form.formState.isSubmitting && "btn-disabled"),
						"onClick": function() {
							var _ref = _asyncToGenerator(function* () {
								yield $$form.submit();
							});
							return function onClick() {
								return _ref.apply(this, arguments);
							};
						}()
					}, [this.scope.locale.Submit()])]);
				}
			}, null)]);
		}
		_renderManual() {
			return createVNode(ZForm, {
				"data": this.formData,
				"onSubmitData": (data) => this.onSubmit(data)
			}, { default: () => [
				createVNode(ZFormField, {
					"name": "name",
					"label": `${this.scope.locale.YourName()}:`,
					"validateOnDynamic": string().min(3)
				}, null),
				createVNode(ZFormField, {
					"name": "name",
					"slotDefault": ({ props }) => {
						return createVNode("input", {
							"name": props.name,
							"value": props.value,
							"onInput": props.onInput,
							"onBlur": props.onBlur
						}, null);
					}
				}, null),
				createVNode(ZFormField, { "name": "name" }, { default: () => [createVNode("span", null, [createTextVNode("span: name")])] }),
				createVNode(ZFormSubscribe, { "slotDefault": ($$form) => {
					return createVNode("button", {
						"disabled": $$form.formState.isSubmitting,
						"type": "submit",
						"class": "btn btn-primary"
					}, [createTextVNode("Submit")]);
				} }, null)
			] });
		}
		render() {
			return createVNode("div", null, [
				createVNode("div", null, [this._renderAuto()]),
				createVNode("div", null, [createTextVNode("------------------------------------")]),
				createVNode("div", null, [this._renderManual()])
			]);
		}
	}) || _class$6) || _class$6);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/toolOne.ts
var NSControllerPageToolOne, ZPageToolOne;
var init_toolOne = __esmMin((() => {
	init_src$1();
	init_controller$1();
	init_render();
	(function(_NSControllerPageToolOne) {
		_NSControllerPageToolOne.paramsSchema = ControllerPageToolOneSchemaParams;
		_NSControllerPageToolOne.querySchema = ControllerPageToolOneSchemaQuery;
	})(NSControllerPageToolOne || (NSControllerPageToolOne = {}));
	ZPageToolOne = createZovaComponentPage(ControllerPageToolOne, RenderPageToolOne, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/page/toolTwo.ts
var NSControllerPageToolTwo, ZPageToolTwo;
var init_toolTwo = __esmMin((() => {
	init_src$1();
	init_controller();
	(function(_NSControllerPageToolTwo) {
		_NSControllerPageToolTwo.paramsSchema = ControllerPageToolTwoSchemaParams;
		_NSControllerPageToolTwo.querySchema = ControllerPageToolTwoSchemaQuery;
	})(NSControllerPageToolTwo || (NSControllerPageToolTwo = {}));
	ZPageToolTwo = createZovaComponentPage(ControllerPageToolTwo, void 0, void 0);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/routes.ts
var routes;
var init_routes = __esmMin((() => {
	init_component();
	init_locale();
	init_pinia();
	init_routeParams();
	init_routeQuery();
	init_routeQueryB();
	init_state();
	init_style();
	init_toolOne();
	init_toolTwo();
	routes = [
		{
			path: "state",
			component: ZPageState
		},
		{
			path: "component",
			component: ZPageComponent
		},
		{
			path: "locale",
			component: ZPageLocale
		},
		{
			path: "style",
			component: ZPageStyle
		},
		{
			path: "pinia",
			component: ZPagePinia
		},
		{
			path: "routeQuery",
			component: ZPageRouteQuery
		},
		{
			name: "routeParams",
			path: "routeParams/:id?",
			component: ZPageRouteParams,
			meta: { componentKeyMode: "nameOnly" }
		},
		{
			path: "routeQueryB",
			component: ZPageRouteQueryB
		},
		{
			name: "toolOne",
			path: "toolOne/:id?",
			component: ZPageToolOne
		},
		{
			name: "toolTwo",
			path: "toolTwo/:id?",
			component: ZPageToolTwo,
			meta: {
				layout: "empty",
				requiresAuth: false
			}
		}
	];
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/component/actionView.ts
var ZActionView;
var init_actionView = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$13();
	ZActionView = defineComponent((_props) => {
		useController(ControllerActionView, void 0, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/component/card.ts
var ZCard;
var init_card = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$12();
	ZCard = defineComponent((_props) => {
		useController(ControllerCard, void 0, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/component/formFieldTest.ts
var ZFormFieldTest;
var init_formFieldTest = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$11();
	ZFormFieldTest = defineComponent((_props) => {
		useController(ControllerFormFieldTest, void 0, void 0);
		return () => {};
	}, prepareComponentOptions(ControllerFormFieldTest.$componentOptions));
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/component/tableCellTest.ts
var ZTableCellTest;
var init_tableCellTest = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$10();
	ZTableCellTest = defineComponent((_props) => {
		useController(ControllerTableCellTest, void 0, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/aop.home.tsx
var _dec$5, _dec2$5, _class$5, AopHome;
var init_aop_home = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	AopHome = (_dec$5 = Aop({ match: "home-index.controller.pageHome" }), _dec2$5 = BeanInfo({ module: "demo-basic" }), _dec$5(_class$5 = _dec2$5(_class$5 = class AopHome extends BeanAopBase {
		constructor(...args) {
			super(...args);
			this.__init__ = function() {
				var _ref = _asyncToGenerator(function* (_args, next, receiver) {
					yield next();
					receiver.message += "!";
					polyfillDispose(receiver);
				});
				return function(_x, _x2, _x3) {
					return _ref.apply(this, arguments);
				};
			}();
			this.__dispose__ = (_args, next, receiver) => {
				receiver.message = receiver.message.substring(0, receiver.message.length - 1);
				next();
			};
			this.render = (_args, next, _receiver) => {
				const result = next();
				return createVNode("div", { "class": "aop-home" }, [result]);
			};
		}
	}) || _class$5) || _class$5);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/aop.home3.tsx
var _dec$4, _dec2$4, _class$4, AopHome3;
var init_aop_home3 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	AopHome3 = (_dec$4 = Aop({
		match: /home-index\.controller\.pageHome/,
		dependencies: "demo-basic:home"
	}), _dec2$4 = BeanInfo({ module: "demo-basic" }), _dec$4(_class$4 = _dec2$4(_class$4 = class AopHome3 extends BeanAopBase {
		constructor(...args) {
			super(...args);
			this.render = (_args, next, _receiver) => {
				const result = next();
				return createVNode("div", { "class": "aop-home-3" }, [result]);
			};
		}
	}) || _class$4) || _class$4);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/behavior.formFieldLayout.tsx
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
var _dec$3, _dec2$3, _dec3, _dec4, _class$3, _class2, _descriptor, BehaviorFormFieldLayout;
var init_behavior_formFieldLayout = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$5();
	BehaviorFormFieldLayout = (_dec$3 = Behavior(), _dec2$3 = BeanInfo({ module: "demo-basic" }), _dec3 = Use({ injectionScope: "host" }), _dec4 = Reflect.metadata("design:type", typeof ControllerFormField === "undefined" ? Object : ControllerFormField), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2 = class BehaviorFormFieldLayout extends BeanBehaviorBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty(this, "$$formField", _descriptor, this);
		}
		render(_props, next) {
			const field = this.$$formField.field;
			const vnode = next();
			return createVNode(Fragment, null, [createVNode("label", { "htmlFor": field.api.name }, [this.$options.label]), vnode]);
		}
	}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$formField", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/theme.orange.ts
var _dec$2, _dec2$2, _class$2, ThemeOrange;
var init_theme_orange = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$8();
	ThemeOrange = (_dec$2 = Theme(), _dec2$2 = BeanInfo({ module: "demo-basic" }), _dec$2(_class$2 = _dec2$2(_class$2 = class ThemeOrange extends BeanThemeBase {
		apply({ name, dark }) {
			var _this = this;
			return _asyncToGenerator(function* () {
				const token = {
					color: { primary: "#f28238" },
					var: { borderColor: "#f28d49" },
					component: { page: {
						background: dark ? "oklch(25.33% 0.016 252.42)" : "#fff",
						color: dark ? "#fff" : "#000"
					} }
				};
				return { token: _this.mergeOptionsToken({
					name,
					dark
				}, token) };
			})();
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/bean/tableCell.test.tsx
var _dec$1, _dec2$1, _class$1, ZIcon, TableCellTest;
var init_tableCell_test = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$6();
	ZIcon = createZovaComponentAsync("a-icon", "icon");
	TableCellTest = (_dec$1 = TableCell({ iconPrefix: "::home" }), _dec2$1 = BeanInfo({ module: "demo-basic" }), _dec$1(_class$1 = _dec2$1(_class$1 = class TableCellTest extends BeanBase {
		render(options, _renderContext, next) {
			const value = next();
			const iconPrefix = options.iconPrefix;
			if (!iconPrefix) return value;
			return createVNode("div", null, [createVNode(ZIcon, { "name": iconPrefix }, null), createVNode("span", null, [value])]);
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/index.ts
/** tableCell: end */
/** locale: begin */
/** locale: end */
/** scope: begin */
function locale(key) {
	return `demo-basic::${key}`;
}
var _dec, _dec2, _class, pagePathSchemas, pageNameSchemas, components, ScopeModuleDemoBasic;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_test();
	init_src$3();
	init_store_counter();
	init_controller$13();
	init_controller$12();
	init_controller$11();
	init_controller$10();
	init_controller$9();
	init_controller$8();
	init_controller$7();
	init_controller$6();
	init_controller$5();
	init_controller$4();
	init_controller$3();
	init_controller$2();
	init_controller$1();
	init_controller();
	init_component();
	init_locale();
	init_pinia();
	init_routeParams();
	init_routeParams();
	init_routeQuery();
	init_routeQuery();
	init_routeQueryB();
	init_routeQueryB();
	init_state();
	init_style();
	init_toolOne();
	init_toolOne();
	init_toolTwo();
	init_toolTwo();
	init_routes();
	init_actionView();
	init_actionView();
	init_card();
	init_card();
	init_formFieldTest();
	init_formFieldTest();
	init_tableCellTest();
	init_tableCellTest();
	init_render();
	init_aop_home();
	init_aop_home3();
	init_behavior_formFieldLayout();
	init_src$5();
	init_vue_runtime_esm_bundler();
	init_jsx_runtime();
	init_theme_orange();
	init_src$8();
	init_tableCell_test();
	init_src$6();
	init_src$2();
	pagePathSchemas = {
		"/demo/basic/routeQuery": { query: NSControllerPageRouteQuery.querySchema },
		"/demo/basic/routeQueryB": { query: NSControllerPageRouteQueryB.querySchema }
	};
	pageNameSchemas = {
		"demo-basic:routeParams": {
			params: NSControllerPageRouteParams.paramsSchema,
			query: NSControllerPageRouteParams.querySchema
		},
		"demo-basic:toolOne": {
			params: NSControllerPageToolOne.paramsSchema,
			query: NSControllerPageToolOne.querySchema
		},
		"demo-basic:toolTwo": {
			params: NSControllerPageToolTwo.paramsSchema,
			query: NSControllerPageToolTwo.querySchema
		}
	};
	components = {
		"actionView": ZActionView,
		"card": ZCard,
		"formFieldTest": ZFormFieldTest,
		"tableCellTest": ZTableCellTest
	};
	ScopeModuleDemoBasic = (_dec = Scope(), _dec2 = BeanInfo({ module: "demo-basic" }), _dec(_class = _dec2(_class = class ScopeModuleDemoBasic extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/config/locale/en-us.ts
var en_us_default;
var init_en_us = __esmMin((() => {
	en_us_default = {
		HelloWorld: "Hello World",
		ChangeLanguage: "Change Language",
		YourName: "Your Name",
		Submit: "Submit"
	};
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/config/locale/zh-cn.ts
var zh_cn_default;
var init_zh_cn = __esmMin((() => {
	zh_cn_default = {
		HelloWorld: "您好世界",
		ChangeLanguage: "切换语言",
		YourName: "您的名称",
		Submit: "提交"
	};
}));
//#endregion
//#region src/suite/a-demo/modules/demo-basic/src/.metadata/locales.ts
function $useLocale(key, ...args) {
	const app = useApp();
	const str = `demo-basic::${key}`;
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
//#region src/suite/a-demo/modules/demo-basic/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_locales();
}));
//#endregion
export { ControllerPageLocale as $, NSControllerPageRouteParams as A, ControllerPageToolOneSchemaQuery as B, RenderPageToolOne as C, ZPageRouteQueryB as D, NSControllerPageRouteQueryB as E, ControllerPageToolTwo as F, ControllerPageRouteQueryBSchemaQuery as G, ControllerPageState as H, ControllerPageToolTwoSchemaParams as I, ControllerPageRouteQuerySchemaQuery as J, ControllerPageRouteQuery as K, ControllerPageToolTwoSchemaQuery as L, ZPagePinia as M, ZPageLocale as N, NSControllerPageRouteQuery as O, ZPageComponent as P, ControllerPagePinia as Q, ControllerPageToolOne as R, ZPageToolOne as S, ZPageState as T, ControllerPageRouteQueryB as U, ControllerPageStyle as V, ControllerPageRouteQueryBSchemaParams as W, ControllerPageRouteParamsSchemaParams as X, ControllerPageRouteParams as Y, ControllerPageRouteParamsSchemaQuery as Z, ZActionView as _, components as a, StoreCounter as at, ZPageToolTwo as b, pagePathSchemas as c, BehaviorFormFieldLayout as d, ControllerPageComponent as et, AopHome3 as f, ZCard as g, ZFormFieldTest as h, ScopeModuleDemoBasic as i, ControllerActionView as it, ZPageRouteParams as j, ZPageRouteQuery as k, TableCellTest as l, ZTableCellTest as m, $useLocale as n, ControllerFormFieldTest as nt, locale as o, ModelTest as ot, AopHome as p, ControllerPageRouteQuerySchemaParams as q, locales as r, ControllerCard as rt, pageNameSchemas as s, init_src as t, ControllerTableCellTest as tt, ThemeOrange as u, routes as v, ZPageStyle as w, NSControllerPageToolOne as x, NSControllerPageToolTwo as y, ControllerPageToolOneSchemaParams as z };
