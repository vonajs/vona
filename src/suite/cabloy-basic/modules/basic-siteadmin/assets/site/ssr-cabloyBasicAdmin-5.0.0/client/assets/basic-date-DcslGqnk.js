import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { d as defineComponent, l as createVNode, v as mergeProps } from "./vue-Cbj8Orto.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-CnyVupzE.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-DgbeIgox.js";
import { b as BeanControllerBase, h as BeanScopeBase, k as BeanInfo, l as prepareComponentOptions, m as createZovaComponentAsync, u as useController, x as ModelValue } from "./zova-DlmeBQBK.js";
import { t as init_src$1 } from "./zova-B7GgTsx0.js";
import { h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BnjLZzu4.js";
//#region src/suite/cabloy-basic/modules/basic-date/src/component/dateRange/controller.tsx
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
var _dec$2, _dec2$2, _dec3, _dec4, _class$2, _class2, _descriptor, _ControllerDateRange, ControllerDateRange;
var init_controller$1 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerDateRange = (_dec$2 = Controller(), _dec2$2 = BeanInfo({ module: "basic-date" }), _dec3 = ModelValue(), _dec4 = Reflect.metadata("design:type", String), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2 = (_ControllerDateRange = class ControllerDateRange extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			this.cSeparator = void 0;
			_initializerDefineProperty(this, "modelValue", _descriptor, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.cSeparator = _this.$style({
					width: "20px",
					display: "inline-block",
					textAlign: "center"
				});
			})();
		}
		render() {
			const [dateStartStr, dateEndStr] = this._parseValue(this.modelValue);
			return createVNode("div", null, [
				createVNode("input", {
					"style": { width: "130px" },
					"type": "date",
					"value": dateStartStr,
					"onInput": (e) => {
						const value = e.target.value;
						this.modelValue = this._combineValue(value, dateEndStr);
					}
				}, null),
				createVNode("div", { "class": this.cSeparator }, [this.$props.separator]),
				createVNode("input", {
					"style": { width: "130px" },
					"type": "date",
					"value": dateEndStr,
					"onInput": (e) => {
						const value = e.target.value;
						this.modelValue = this._combineValue(dateStartStr, value);
					}
				}, null)
			]);
		}
		_parseValue(value) {
			if (!value) return [];
			return value.split(this.$props.separator);
		}
		_combineValue(dateStartStr, dateEndStr) {
			if (!dateStartStr && !dateEndStr) return void 0;
			return `${dateStartStr !== null && dateStartStr !== void 0 ? dateStartStr : ""}${this.$props.separator}${dateEndStr !== null && dateEndStr !== void 0 ? dateEndStr : ""}`;
		}
	}, _ControllerDateRange.$propsDefault = { separator: "~" }, _ControllerDateRange), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "modelValue", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/component/formFieldDateRange/controller.tsx
var _dec$1, _dec2$1, _class$1, _ControllerFormFieldDateRange, ZFormField, ControllerFormFieldDateRange;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	init__metadata();
	ZFormField = createZovaComponentAsync("a-form", "formField");
	ControllerFormFieldDateRange = (_dec$1 = Controller(), _dec2$1 = BeanInfo({ module: "basic-date" }), _dec$1(_class$1 = _dec2$1(_class$1 = (_ControllerFormFieldDateRange = class ControllerFormFieldDateRange extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			this.cContainer = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.cContainer = _this.$style({ width: "auto" });
			})();
		}
		render() {
			return createVNode(ZFormField, mergeProps(this.$props, {
				"classContainer": this.cContainer,
				"slotDefault": ({ propsBucket }, $$formField) => {
					return createVNode(ZDateRange, {
						"separator": this.$props.separator,
						"modelValue": propsBucket.displayValue,
						"onUpdate:modelValue": (value) => {
							$$formField.setDisplayValue(value);
						}
					}, null);
				}
			}), null);
		}
	}, _ControllerFormFieldDateRange.$propsDefault = {}, _ControllerFormFieldDateRange.$componentOptions = { inheritAttrs: false }, _ControllerFormFieldDateRange)) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/.metadata/component/dateRange.ts
var ZDateRange;
var init_dateRange = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$1();
	ZDateRange = defineComponent((_props) => {
		useController(ControllerDateRange, void 0, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/.metadata/component/formFieldDateRange.ts
var ZFormFieldDateRange;
var init_formFieldDateRange = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller();
	ZFormFieldDateRange = defineComponent((_props) => {
		useController(ControllerFormFieldDateRange, void 0, void 0);
		return () => {};
	}, prepareComponentOptions(ControllerFormFieldDateRange.$componentOptions));
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/.metadata/index.ts
/** components: end */
/** scope: begin */
var _dec, _dec2, _class, components, ScopeModuleBasicDate;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller$1();
	init_controller();
	init_dateRange();
	init_dateRange();
	init_formFieldDateRange();
	init_formFieldDateRange();
	init_src$2();
	components = {
		"dateRange": ZDateRange,
		"formFieldDateRange": ZFormFieldDateRange
	};
	ScopeModuleBasicDate = (_dec = Scope(), _dec2 = BeanInfo({ module: "basic-date" }), _dec(_class = _dec2(_class = class ScopeModuleBasicDate extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/cabloy-basic/modules/basic-date/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
}));
//#endregion
export { ZDateRange as a, ZFormFieldDateRange as i, ScopeModuleBasicDate as n, ControllerFormFieldDateRange as o, components as r, ControllerDateRange as s, init_src as t };
