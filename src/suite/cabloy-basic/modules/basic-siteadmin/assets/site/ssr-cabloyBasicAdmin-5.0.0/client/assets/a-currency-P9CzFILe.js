import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { d as defineComponent, l as createVNode, v as mergeProps } from "./vue-Cbj8Orto.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-CnyVupzE.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-DgbeIgox.js";
import { b as BeanControllerBase, h as BeanScopeBase, j as BeanBase, k as BeanInfo, l as prepareComponentOptions, m as createZovaComponentAsync, u as useController } from "./zova-DlmeBQBK.js";
import { t as init_src$1 } from "./zova-B7GgTsx0.js";
import { h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BnjLZzu4.js";
import { n as TableCell, t as init_src$3 } from "./a-table-Dz7ksKZd.js";
import { n as init_dist, t as Currency } from "./src-BF3qri3w.js";
//#region src/suite-vendor/a-zova/modules/a-currency/src/lib/utils.ts
function currencyFormat(value, options) {
	if (!value || typeof value !== "number" && typeof value !== "string") return value;
	return new Currency(options).format(value);
}
function currencyUpdate(value, options) {
	return new Currency(options).update(value);
}
var init_utils = __esmMin((() => {
	init_dist();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-currency/src/component/formFieldCurrency/controller.tsx
var _dec$2, _dec2$2, _class$2, _ControllerFormFieldCurrency, ZFormField, ControllerFormFieldCurrency;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	init_utils();
	ZFormField = createZovaComponentAsync("a-form", "formField");
	ControllerFormFieldCurrency = (_dec$2 = Controller(), _dec2$2 = BeanInfo({ module: "a-currency" }), _dec$2(_class$2 = _dec2$2(_class$2 = (_ControllerFormFieldCurrency = class ControllerFormFieldCurrency extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			this._valueKeyboardInput = void 0;
		}
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			const currencyOptions = this.$props.currency;
			const displayValue = this._displayValuePatch(currencyOptions);
			return createVNode(ZFormField, mergeProps(this.$props, {
				"render": "text",
				"displayValue": displayValue,
				"displayValueUpdateTiming": "input",
				"onSetDisplayValue": (value) => {
					this._valueKeyboardInput = value;
					const valuePatch = currencyUpdate(value, currencyOptions);
					return valuePatch !== void 0 ? valuePatch !== null && valuePatch !== void 0 ? valuePatch : void 0 : value;
				}
			}), null);
		}
		_displayValuePatch(currencyOptions) {
			if (this._valueKeyboardInput === void 0) return this._getDisplayValue(currencyOptions);
			const valueInputPatch = currencyUpdate(this._valueKeyboardInput, currencyOptions);
			if (valueInputPatch === void 0) return this._valueKeyboardInput;
			if (valueInputPatch === this.$props.displayValue) return this._valueKeyboardInput;
			return this._getDisplayValue(currencyOptions);
		}
		_getDisplayValue(currencyOptions) {
			return currencyFormat(this.$props.displayValue, currencyOptions);
		}
	}, _ControllerFormFieldCurrency.$propsDefault = {}, _ControllerFormFieldCurrency.$componentOptions = { inheritAttrs: false }, _ControllerFormFieldCurrency)) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-currency/src/.metadata/component/formFieldCurrency.ts
var ZFormFieldCurrency;
var init_formFieldCurrency = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller();
	ZFormFieldCurrency = defineComponent((_props) => {
		useController(ControllerFormFieldCurrency, void 0, void 0);
		return () => {};
	}, prepareComponentOptions(ControllerFormFieldCurrency.$componentOptions));
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-currency/src/bean/tableCell.currency.tsx
var _dec$1, _dec2$1, _class$1, TableCellCurrency;
var init_tableCell_currency = __esmMin((() => {
	init_src$1();
	init_src$3();
	init_utils();
	TableCellCurrency = (_dec$1 = TableCell(), _dec2$1 = BeanInfo({ module: "a-currency" }), _dec$1(_class$1 = _dec2$1(_class$1 = class TableCellCurrency extends BeanBase {
		render(options, _renderContext, next) {
			return currencyFormat(next(), options.currency);
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-currency/src/.metadata/index.ts
/** tableCell: end */
/** scope: begin */
var _dec, _dec2, _class, components, ScopeModuleACurrency;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller();
	init_formFieldCurrency();
	init_formFieldCurrency();
	init_tableCell_currency();
	init_src$3();
	init_src$2();
	components = { "formFieldCurrency": ZFormFieldCurrency };
	ScopeModuleACurrency = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-currency" }), _dec(_class = _dec2(_class = class ScopeModuleACurrency extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-currency/src/lib/index.ts
var init_lib = __esmMin((() => {
	init_utils();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-currency/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_lib();
}));
//#endregion
export { ZFormFieldCurrency as a, currencyUpdate as c, TableCellCurrency as i, ScopeModuleACurrency as n, ControllerFormFieldCurrency as o, components as r, currencyFormat as s, init_src as t };
