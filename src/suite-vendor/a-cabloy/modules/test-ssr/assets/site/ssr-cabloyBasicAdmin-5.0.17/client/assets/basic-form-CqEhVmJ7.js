import { L as BeanControllerBase, ai as ClientOnly, W as createZovaComponentAsync, l as BeanInfo, U as Use, M as prepareComponentOptions, N as useController, v as BeanScopeBase, aa as useApp, a7 as useComputed } from "./zova-QgocPMzS.js";
import { P as createVNode, Q as mergeProps, R as Fragment, o as defineComponent } from "./vue-CRNsYCTs.js";
import { Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import { BeanBehaviorBase, Behavior } from "./a-behavior-BVEM_kq-.js";
import { c as classes } from "./typestyle-BzUluVB3.js";
import { b as invokeProp } from "./a-openapi-m8k_rTIU.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./a-logger-CYjH9aBA.js";
import "./openapi3-CmG_8H3_.js";
import "./a-model-DdQjWvuo.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
var _dec$3, _dec2$3, _dec3$2, _dec4$2, _dec5, _dec6, _class$3, _class2$2, _descriptor$2, _descriptor2, _ControllerFormFieldCaptcha;
function _initializerDefineProperty$2(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$2(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
const ZFormField = createZovaComponentAsync("a-form", "formField");
let ControllerFormFieldCaptcha = (_dec$3 = Controller(), _dec2$3 = BeanInfo({
  module: "basic-form"
}), _dec3$2 = Use("a-zod.tool.v"), _dec4$2 = Reflect.metadata("design:type", typeof ToolV === "undefined" ? Object : ToolV), _dec5 = Use({
  injectionScope: "host",
  beanFullName: "a-form.controller.form"
}), _dec6 = Reflect.metadata("design:type", typeof ControllerForm === "undefined" ? Object : ControllerForm), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2$2 = (_ControllerFormFieldCaptcha = class ControllerFormFieldCaptcha2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this.eventFormSubmission = void 0;
    this.captchaData = void 0;
    _initializerDefineProperty$2(this, "$$v", _descriptor$2, this);
    _initializerDefineProperty$2(this, "$$form", _descriptor2, this);
  }
  async __init__() {
    {
      this.eventFormSubmission = this.app.meta.event.on("a-form:formSubmission", (data, next) => {
        if (data.form.formId === this.$$form.form.formId && data.error) {
          this.refreshCaptchaData();
        }
        return next();
      });
    }
    {
      this.createCaptchaData();
    }
  }
  __dispose__() {
    if (this.eventFormSubmission) {
      this.eventFormSubmission();
    }
  }
  get captchaScene() {
    return this.$props.captcha?.scene ?? "captcha-simple:simple";
  }
  async createCaptchaData() {
    this.captchaData = await this.$api.captcha.create({
      scene: this.captchaScene
    }, {
      authToken: false
    });
    this.setFieldCaptchaData();
  }
  async refreshCaptchaData() {
    this.captchaData = await this.$api.captcha.refresh({
      id: this.captchaData.id,
      scene: this.captchaScene
    }, {
      authToken: false
    });
    this.setFieldCaptchaData();
  }
  setFieldCaptchaData() {
    this.$$form.setFieldValue(this.$props.name, {
      id: this.captchaData?.id,
      token: this.captchaData?.token
    });
  }
  render() {
    return createVNode(Fragment, null, [createVNode(ZFormField, mergeProps(this.$props, {
      "render": "text",
      "slotDefault": ({
        props
      }, $$formField) => {
        const propsNew = {
          ...props,
          type: "text",
          class: "grow",
          placeholder: this.scope.locale.InputCaptcha(),
          value: this.captchaData?.token,
          onInput: (e) => {
            const token = e.target.value;
            if (this.captchaData) {
              this.captchaData.token = token;
            }
            $$formField.field.api.handleChange({
              id: this.captchaData?.id,
              token
            });
          }
        };
        return createVNode("input", propsNew, null);
      }
    }), null), createVNode("label", {
      "class": "flex items-center gap-2 w-full",
      "style": {
        height: "50px"
      }
    }, [createVNode(ClientOnly, null, {
      default: () => [this.captchaData?.payload && createVNode("img", {
        "class": "cursor-pointer",
        "src": this.captchaData.payload,
        "onClick": () => {
          this.refreshCaptchaData();
        }
      }, null)]
    })])]);
  }
}, _ControllerFormFieldCaptcha.$propsDefault = {}, _ControllerFormFieldCaptcha.$componentOptions = {
  inheritAttrs: false
}, _ControllerFormFieldCaptcha), _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$v", [_dec3$2, _dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$form", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$2)) || _class$3) || _class$3);
const ZFormFieldCaptcha = defineComponent((_props) => {
  useController(ControllerFormFieldCaptcha, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerFormFieldCaptcha.$componentOptions));
var _dec$2, _dec2$2, _dec3$1, _dec4$1, _class$2, _class2$1, _descriptor$1;
function _initializerDefineProperty$1(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let BehaviorFormField = (_dec$2 = Behavior(), _dec2$2 = BeanInfo({
  module: "basic-form"
}), _dec3$1 = Use({
  injectionScope: "host"
}), _dec4$1 = Reflect.metadata("design:type", typeof ControllerFormField === "undefined" ? Object : ControllerFormField), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2$1 = class BehaviorFormField2 extends BeanBehaviorBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$1(this, "$$formField", _descriptor$1, this);
  }
  render(renderContext, next) {
    this._patchProps(renderContext);
    return next(renderContext);
  }
  _patchProps(renderContext) {
    const formMeta = this.$$formField.formMeta;
    const field = this.$$formField.field;
    if (renderContext.propsBucket.renderProvider === "input") {
      this._patchProps_input(formMeta, field, renderContext);
    }
  }
  _patchProps_general(formMeta, _field, renderContext) {
    const propsPatch = {
      value: renderContext.propsBucket.displayValue
    };
    if (formMeta?.formMode === "view") {
      propsPatch.readonly = true;
    }
    return propsPatch;
  }
  _patchProps_input(formMeta, field, renderContext) {
    const {
      propsBucket
    } = renderContext;
    const renderFlattern = propsBucket.renderFlattern;
    const propsGeneral = this._patchProps_general(formMeta, field, renderContext);
    const inputType = this.$$formField.normalizeInputType(renderFlattern, propsBucket.inputType);
    const onSetDisplayValueDefault = (e) => {
      this.$$formField.setDisplayValue(e.target.value);
    };
    const propsPatch = {
      type: inputType,
      onChange: propsBucket.onChange !== void 0 ? propsBucket.onChange ?? void 0 : propsBucket.displayValueUpdateTiming === "change" ? onSetDisplayValueDefault : void 0,
      onInput: propsBucket.onInput !== void 0 ? propsBucket.onInput ?? void 0 : propsBucket.displayValueUpdateTiming !== "change" ? onSetDisplayValueDefault : void 0,
      onBlur: propsBucket.onBlur !== void 0 ? propsBucket.onBlur ?? void 0 : (_e) => {
        field.api.handleBlur();
      }
    };
    renderContext.props = Object.assign({}, propsGeneral, propsPatch, renderContext.props);
  }
}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$formField", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$1)) || _class$2) || _class$2);
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor;
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
let BehaviorFormFieldLayout = (_dec$1 = Behavior(), _dec2$1 = BeanInfo({
  module: "basic-form"
}), _dec3 = Use({
  injectionScope: "host"
}), _dec4 = Reflect.metadata("design:type", typeof ControllerFormField === "undefined" ? Object : ControllerFormField), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class BehaviorFormFieldLayout2 extends BeanBehaviorBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$formField", _descriptor, this);
  }
  render(renderContext, next) {
    const field = this.$$formField.field;
    this._patchProps(renderContext);
    const vnode = next(renderContext);
    const error = field.state.meta.errors[0];
    if (renderContext.propsBucket.inline) {
      return this._renderInline(renderContext, vnode, field, error);
    }
    return this._renderBlock(renderContext, vnode, field, error);
  }
  _renderInline(renderContext, vnode, field, error) {
    const bordered = renderContext.propsBucket.bordered;
    const label = renderContext.propsBucket.label;
    const className = classes("input", renderContext.propsBucket.classContainer, bordered && "input-bordered", !field.state.meta.isValid && "input-error");
    return createVNode("label", {
      "class": className
    }, [label, vnode, !field.state.meta.isValid && createVNode("div", {
      "class": "label"
    }, [createVNode("span", {
      "class": "label-text-alt text-error"
    }, [error?.message])])]);
  }
  _renderBlock(renderContext, vnode, field, error) {
    const label = renderContext.propsBucket.label;
    const className = classes("fieldset", renderContext.propsBucket.classContainer);
    return createVNode("fieldset", {
      "class": className
    }, [!!label && createVNode("legend", {
      "class": "fieldset-legend"
    }, [label]), invokeProp(renderContext.propsBucket.header), vnode, !field.state.meta.isValid && createVNode("div", {
      "class": "label"
    }, [createVNode("span", {
      "class": "label-text-alt text-error"
    }, [error?.message])]), invokeProp(renderContext.propsBucket.footer)]);
  }
  _patchProps(renderContext) {
    const field = this.$$formField.field;
    if (renderContext.propsBucket.renderProvider === "input") {
      this._patchProps_input(field, renderContext);
    }
  }
  _patchProps_input(field, renderContext) {
    if (!renderContext.propsBucket.inline) {
      renderContext.props.class = classes(renderContext.props.class, "input", this.$options.bordered && "input-bordered", !field.state.meta.isValid && "input-error");
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$formField", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
var _dec, _dec2, _class;
const components = {
  "formFieldCaptcha": ZFormFieldCaptcha
};
let ScopeModuleBasicForm = (_dec = Scope(), _dec2 = BeanInfo({
  module: "basic-form"
}), _dec(_class = _dec2(_class = class ScopeModuleBasicForm2 extends BeanScopeBase {
}) || _class) || _class);
function locale(key) {
  return `basic-form::${key}`;
}
const locale_en_us = {
  InputCaptcha: "Please input captcha"
};
const locale_zh_cn = {
  InputCaptcha: "请输入验证码"
};
const locales = {
  "en-us": locale_en_us,
  "zh-cn": locale_zh_cn
};
function $useLocale(key, ...args) {
  const app = useApp();
  const str = `basic-form::${key}`;
  return useComputed(() => {
    return app.meta.text(str, ...args);
  });
}
export {
  $useLocale,
  BehaviorFormField,
  BehaviorFormFieldLayout,
  ControllerFormFieldCaptcha,
  ScopeModuleBasicForm,
  ZFormFieldCaptcha,
  components,
  locale,
  locales
};
