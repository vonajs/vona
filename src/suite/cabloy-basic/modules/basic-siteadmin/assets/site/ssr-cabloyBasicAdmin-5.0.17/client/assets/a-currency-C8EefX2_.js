import { L as BeanControllerBase, W as createZovaComponentAsync, l as BeanInfo, M as prepareComponentOptions, N as useController, n as BeanBase, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { P as createVNode, Q as mergeProps, o as defineComponent } from "./vue-CRNsYCTs.js";
import { Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import { TableCell } from "./a-table-CQXUiX08.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./a-openapi-m8k_rTIU.js";
import "./typestyle-BzUluVB3.js";
import "./openapi3-CmG_8H3_.js";
import "./a-model-DdQjWvuo.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
import "./tanstack-table-JfOO9tPD.js";
class Currency {
  fixed;
  exp;
  zero;
  constructor(options) {
    if (options === false)
      throw new Error("Currency options cannot be false");
    if (!options || typeof options !== "object") {
      options = {};
    }
    this.fixed = options.fixed ?? 2;
    this.exp = options.exp ?? this.fixed;
    this.zero = options.zero ?? this.fixed;
  }
  format(value) {
    if (value === void 0 || value === null)
      return "";
    if (typeof value === "string" && value.trim() === "")
      return "";
    if (isNaN(value))
      return String(value);
    const str = (Number(value) / Math.pow(10, this.exp)).toFixed(this.fixed);
    return _trimZero(str, this.zero);
  }
  update(value) {
    if (value === void 0 || value === null)
      return void 0;
    if (typeof value === "string" && value.trim() === "")
      return null;
    if (isNaN(value))
      return void 0;
    return Number((Number(value) * Math.pow(10, this.exp)).toFixed(0));
  }
}
function _trimZero(str, zero) {
  let indexZero = str.indexOf(".");
  if (indexZero === -1)
    return str;
  for (let index = str.length - 1; index > indexZero; index--) {
    if (str[index] === "0" && index - indexZero > zero) {
      str = str.substring(0, str.length - 1);
    } else {
      break;
    }
  }
  if (indexZero === str.length - 1) {
    str = str.substring(0, str.length - 1);
  }
  return str;
}
function currencyFormat(value, options) {
  if (!value || typeof value !== "number" && typeof value !== "string") return value;
  const currency = new Currency(options);
  return currency.format(value);
}
function currencyUpdate(value, options) {
  const currency = new Currency(options);
  return currency.update(value);
}
var _dec$2, _dec2$2, _class$2, _ControllerFormFieldCurrency;
const ZFormField = createZovaComponentAsync("a-form", "formField");
let ControllerFormFieldCurrency = (_dec$2 = Controller(), _dec2$2 = BeanInfo({
  module: "a-currency"
}), _dec$2(_class$2 = _dec2$2(_class$2 = (_ControllerFormFieldCurrency = class ControllerFormFieldCurrency2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this._valueKeyboardInput = void 0;
  }
  async __init__() {
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
        return valuePatch !== void 0 ? valuePatch ?? void 0 : value;
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
}, _ControllerFormFieldCurrency.$propsDefault = {}, _ControllerFormFieldCurrency.$componentOptions = {
  inheritAttrs: false
}, _ControllerFormFieldCurrency)) || _class$2) || _class$2);
const ZFormFieldCurrency = defineComponent((_props) => {
  useController(ControllerFormFieldCurrency, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerFormFieldCurrency.$componentOptions));
var _dec$1, _dec2$1, _class$1;
let TableCellCurrency = (_dec$1 = TableCell(), _dec2$1 = BeanInfo({
  module: "a-currency"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class TableCellCurrency2 extends BeanBase {
  render(options, _renderContext, next) {
    const value = next();
    return currencyFormat(value, options.currency);
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
const components = {
  "formFieldCurrency": ZFormFieldCurrency
};
let ScopeModuleACurrency = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-currency"
}), _dec(_class = _dec2(_class = class ScopeModuleACurrency2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ControllerFormFieldCurrency,
  ScopeModuleACurrency,
  TableCellCurrency,
  ZFormFieldCurrency,
  components,
  currencyFormat,
  currencyUpdate
};
