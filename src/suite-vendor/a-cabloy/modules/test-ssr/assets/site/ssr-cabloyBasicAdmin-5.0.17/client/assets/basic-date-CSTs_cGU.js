import { L as BeanControllerBase, l as BeanInfo, ac as ModelValue, W as createZovaComponentAsync, M as prepareComponentOptions, N as useController, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { P as createVNode, Q as mergeProps, o as defineComponent } from "./vue-CRNsYCTs.js";
import { Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$2, _dec2$2, _dec3, _dec4, _class$2, _class2, _descriptor, _ControllerDateRange;
function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ControllerDateRange = (_dec$2 = Controller(), _dec2$2 = BeanInfo({
  module: "basic-date"
}), _dec3 = ModelValue(), _dec4 = Reflect.metadata("design:type", String), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2 = (_ControllerDateRange = class ControllerDateRange2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this.cSeparator = void 0;
    _initializerDefineProperty(this, "modelValue", _descriptor, this);
  }
  async __init__() {
    this.cSeparator = this.$style({
      width: "20px",
      display: "inline-block",
      textAlign: "center"
    });
  }
  render() {
    const [dateStartStr, dateEndStr] = this._parseValue(this.modelValue);
    return createVNode("div", null, [createVNode("input", {
      "style": {
        width: "130px"
      },
      "type": "date",
      "value": dateStartStr,
      "onInput": (e) => {
        const value = e.target.value;
        this.modelValue = this._combineValue(value, dateEndStr);
      }
    }, null), createVNode("div", {
      "class": this.cSeparator
    }, [this.$props.separator]), createVNode("input", {
      "style": {
        width: "130px"
      },
      "type": "date",
      "value": dateEndStr,
      "onInput": (e) => {
        const value = e.target.value;
        this.modelValue = this._combineValue(dateStartStr, value);
      }
    }, null)]);
  }
  _parseValue(value) {
    if (!value) return [];
    return value.split(this.$props.separator);
  }
  _combineValue(dateStartStr, dateEndStr) {
    if (!dateStartStr && !dateEndStr) return void 0;
    return `${dateStartStr ?? ""}${this.$props.separator}${dateEndStr ?? ""}`;
  }
}, _ControllerDateRange.$propsDefault = {
  separator: "~"
}, _ControllerDateRange), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "modelValue", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1, _ControllerFormFieldDateRange;
const ZFormField = createZovaComponentAsync("a-form", "formField");
let ControllerFormFieldDateRange = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "basic-date"
}), _dec$1(_class$1 = _dec2$1(_class$1 = (_ControllerFormFieldDateRange = class ControllerFormFieldDateRange2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this.cContainer = void 0;
  }
  async __init__() {
    this.cContainer = this.$style({
      width: "auto"
    });
  }
  render() {
    return createVNode(ZFormField, mergeProps(this.$props, {
      "classContainer": this.cContainer,
      "slotDefault": ({
        propsBucket
      }, $$formField) => {
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
}, _ControllerFormFieldDateRange.$propsDefault = {}, _ControllerFormFieldDateRange.$componentOptions = {
  inheritAttrs: false
}, _ControllerFormFieldDateRange)) || _class$1) || _class$1);
const ZDateRange = defineComponent((_props) => {
  useController(ControllerDateRange, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
const ZFormFieldDateRange = defineComponent((_props) => {
  useController(ControllerFormFieldDateRange, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerFormFieldDateRange.$componentOptions));
var _dec, _dec2, _class;
const components = {
  "dateRange": ZDateRange,
  "formFieldDateRange": ZFormFieldDateRange
};
let ScopeModuleBasicDate = (_dec = Scope(), _dec2 = BeanInfo({
  module: "basic-date"
}), _dec(_class = _dec2(_class = class ScopeModuleBasicDate2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ControllerDateRange,
  ControllerFormFieldDateRange,
  ScopeModuleBasicDate,
  ZDateRange,
  ZFormFieldDateRange,
  components
};
