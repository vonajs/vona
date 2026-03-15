import { L as BeanControllerBase, h as deepExtend, Q as deepEqual, _ as catchError, $ as ZodMetadata, E as celEnvBase, H as objectAssignReactive, m as cast, l as BeanInfo, X as UseScope, o as isNil, U as Use, Y as BeanRenderBase, M as prepareComponentOptions, N as useController, v as BeanScopeBase, Z as BeanControllerPageBase } from "./zova-QgocPMzS.js";
import { u as useForm, a as useStore, g as getBy, r as revalidateLogic, d as determineFormLevelErrorSourceAndValue, i as isGlobalFormValidationError, b as useField } from "./tanstack-form-c5sVeo1k.js";
import { Z as ZovaJsx, a as renderFormFieldTopPropsSystem, i as isJsxComponent, s as schemaToZodSchema } from "./a-openapi-m8k_rTIU.js";
import { Controller, Render, Scope } from "./a-bean-Bxu0OKjI.js";
import { m as markRaw, P as createVNode, R as Fragment, M as h, o as defineComponent } from "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./typestyle-BzUluVB3.js";
import "./openapi3-CmG_8H3_.js";
import "./a-model-DdQjWvuo.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
class BeanControllerFormBase extends BeanControllerBase {
  $useForm(opts) {
    return this.ctx.util.instanceScope(() => {
      return markRaw(useForm(opts));
    });
  }
}
const inputTypePresets = ["text", "password", "number", "file", "hidden", "tel", "email"];
const constFieldProps = "$$FieldProps";
var _dec$6, _dec2$6, _dec3$3, _dec4$3, _class$6, _class2$3, _descriptor$3, _ControllerForm;
function _initializerDefineProperty$3(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$3(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ControllerForm$1 = (_dec$6 = Controller(), _dec2$6 = BeanInfo({
  module: "a-form"
}), _dec3$3 = UseScope("a-openapi"), _dec4$3 = Reflect.metadata("design:type", typeof ScopeModuleAOpenapi === "undefined" ? Object : ScopeModuleAOpenapi), _dec$6(_class$6 = _dec2$6(_class$6 = (_class2$3 = (_ControllerForm = class ControllerForm2 extends BeanControllerFormBase {
  constructor(...args) {
    super(...args);
    this.form = void 0;
    this.formState = void 0;
    this.formProvider = void 0;
    this.schema = void 0;
    this.zodSchema = void 0;
    this.properties = void 0;
    this.zovaJsx = void 0;
    this.fieldCelEnv = void 0;
    _initializerDefineProperty$3(this, "$$scopeModuleAOpenapi", _descriptor$3, this);
  }
  async __init__() {
    this.bean._setBean("$$form", this);
    this.form = this._createForm();
    this.formState = useStore(this.form.store, (state) => state);
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$scopeModuleAOpenapi.config.resourceMeta.provider, this.$$scopeModuleAOpenapi.config.resourceMeta.form?.provider, this.$props.formProvider);
    });
    this.schema = this.$useComputed(() => {
      return this.$props.schema;
    });
    this.zodSchema = this.$useComputed(() => {
      return this._getZodSchema();
    });
    this.properties = this.$useComputed(() => {
      return this.$sdk.loadSchemaProperties(this.schema, this.$props.schemaScene);
    });
    this.fieldCelEnv = this._getFieldCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(ZovaJsx, false, this.formProvider.components, this.formProvider.actions, this.fieldCelEnv);
    this.$watch(() => this.$props.data, (newValue, oldValue) => {
      if (deepEqual(newValue, oldValue)) return;
      this.reset(this.$props.data);
    });
  }
  async submit(submitMeta) {
    const [_, error] = await catchError(() => {
      return this.form.handleSubmit(submitMeta);
    });
    return !error && this.formState.isValid;
  }
  reset(values, opts) {
    this.form.reset(values ?? {}, opts);
    return this.form.state.values;
  }
  get formMeta() {
    return this.$props.formMeta;
  }
  getFieldValue(name) {
    return getBy(this.formState.values, name) ?? null;
  }
  setFieldValue(name, value, disableNotifyChanged) {
    this.form.setFieldValue(name, value);
    if (!disableNotifyChanged) {
      this.$props.onChanged?.(this.formState.values);
    }
  }
  setFieldDisplayValue(name, value, onSetDisplayValue, disableNotifyChanged) {
    if (onSetDisplayValue) {
      value = onSetDisplayValue(value);
    }
    return this.setFieldValue(name, value, disableNotifyChanged);
  }
  getFieldProperty(name) {
    if (!this.properties) return;
    return this.properties.find((item) => item.key === name);
  }
  getFieldZodSchema(name) {
    return ZodMetadata.getFieldSchema(this.zodSchema, name);
  }
  _getFieldCelEnv() {
    const celEnv = celEnvBase.clone();
    celEnv.registerFunction("getValue(string):dyn", (name) => {
      return this.form.getFieldValue(name) ?? null;
    });
    celEnv.registerFunction("getProperty(string):dyn", (name) => {
      return this.getFieldProperty(name) ?? null;
    });
    return celEnv;
  }
  getFieldScope(name, scopeExtra) {
    return objectAssignReactive({}, this.$props.formScope, {
      name,
      value: this.getFieldValue(name),
      property: this.getFieldProperty(name),
      ...scopeExtra
    });
  }
  getFieldJsxRenderContext($$formField, celScope) {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: "formField",
      $host: $$formField ?? this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$formField,
      $$form: this
    };
  }
  getFieldComponentPropsTop(name, celScope, jsxRenderContext) {
    const props = this._getFieldComponentPropsTopInner(name, celScope, jsxRenderContext);
    if (props.displayValue === void 0) {
      props.displayValue = celScope.value;
    }
    return props;
  }
  _getFieldComponentPropsTopInner(name, celScope, jsxRenderContext) {
    const props = {
      [constFieldProps]: true,
      key: name,
      name
    };
    const property = this.getFieldProperty(name);
    if (!property) return props;
    const rest = property.rest;
    if (!rest) return props;
    const keys = Object.keys(rest).filter((item) => !renderFormFieldTopPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      const value = rest[key];
      let keyValue;
      if (key === "render") {
        if (typeof value === "string") {
          keyValue = this.zovaJsx.evaluateExpression(value, celScope);
        } else {
          keyValue = value;
        }
      } else {
        keyValue = this.zovaJsx.renderJsxOrCel(value, void 0, celScope, jsxRenderContext);
      }
      props[key] = keyValue;
    }
    return props;
  }
  getRenderFlattern(render) {
    return isJsxComponent(render) ? cast(render).type : render;
  }
  getRenderProvider(render) {
    let renderProvider = this.getRenderFlattern(render);
    if (typeof renderProvider === "string") {
      renderProvider = this.formProvider.components?.[renderProvider] ?? renderProvider;
    }
    return renderProvider;
  }
  _getZodSchema() {
    if (this.$props.zodSchema) return this._patchZodSchema(this.$props.zodSchema);
    if (!this.schema) return;
    return this._patchZodSchema(schemaToZodSchema(this.schema, (schemaName) => this.$sdk.getSchema(schemaName).data));
  }
  _patchZodSchema(schema) {
    if (schema.def.type === "object") return schema;
    if (schema.def.type === "union") {
      return schema.def.options.find((item) => item.def.type === "object");
    }
    throw new Error("invalid zod schema");
  }
  _createForm() {
    return this.$useForm({
      defaultValues: this.$props.data,
      validationLogic: this.$props.validateOnDynamic !== false ? revalidateLogic(this.$props.validateOnDynamicLogic) : void 0,
      onSubmitInvalid: (data) => {
        this.$props.onSubmitInvalid?.(data, this);
      },
      onSubmit: async (data) => {
        const [_, error] = await catchError(() => {
          return this.$props.onSubmitData?.(data, this);
        });
        const resHandled = await this.app.meta.event.emit("a-form:formSubmission", {
          form: this.form,
          data,
          error
        });
        if (!error) return;
        if (error.code === 422) {
          this._handleError422(error);
          this.$props.onSubmitInvalid?.(data, this);
        } else {
          if (!resHandled) {
            this.$props.onShowError?.({
              data,
              error
            }, this);
          }
        }
        throw error;
      }
    });
  }
  renderField(name) {
    const property = this.getFieldProperty(name);
    if (!property) return;
    return this._renderField(property);
  }
  _renderField(property) {
    const key = property.key;
    const celScope = this.getFieldScope(key);
    const jsxRenderContext = this.getFieldJsxRenderContext(void 0, celScope);
    const props = this.getFieldComponentPropsTop(key, celScope, jsxRenderContext);
    if (cast(props).visible === false) return;
    celScope.displayValue = props.displayValue;
    const componentOptions = this._getFieldComponentOptionsTop(props.render);
    return this.zovaJsx.render(componentOptions, props, celScope, jsxRenderContext);
  }
  _getFieldComponentOptionsTop(render) {
    const renderProvider = this.getRenderProvider(render);
    if (typeof renderProvider === "string" && renderProvider.includes(":formField")) {
      return render;
    }
    return this.formProvider.components?.formField ?? "a-form:formField";
  }
  _handleError422(error, cause = "submit") {
    const formApi = this.form;
    let hasErrored = false;
    const currentValidationErrorMap = {};
    const rawError = parseIssues(error);
    const {
      formError,
      fieldErrors
    } = normalizeError(rawError);
    const errorMapKey = getErrorMapKey(cause);
    for (const field of Object.keys(formApi.state.fieldMeta)) {
      if (formApi.baseStore.state.fieldMetaBase[field] === void 0) {
        continue;
      }
      const fieldMeta = formApi.getFieldMeta(field);
      if (!fieldMeta) continue;
      const {
        errorMap: currentErrorMap,
        errorSourceMap: currentErrorMapSource
      } = fieldMeta;
      const newFormValidatorError = fieldErrors?.[field];
      const {
        newErrorValue,
        newSource
      } = determineFormLevelErrorSourceAndValue({
        newFormValidatorError,
        isPreviousErrorFromFormValidator: currentErrorMapSource?.[errorMapKey] === "form",
        previousErrorValue: currentErrorMap?.[errorMapKey]
      });
      if (newSource === "form") {
        currentValidationErrorMap[field] = {
          ...currentValidationErrorMap[field],
          [errorMapKey]: newFormValidatorError
        };
      }
      if (currentErrorMap?.[errorMapKey] !== newErrorValue) {
        formApi.setFieldMeta(field, (prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            [errorMapKey]: newErrorValue
          },
          errorSourceMap: {
            ...prev.errorSourceMap,
            [errorMapKey]: newSource
          }
        }));
      }
    }
    if (formApi.state.errorMap?.[errorMapKey] !== formError) {
      formApi.baseStore.setState((prev) => ({
        ...prev,
        errorMap: {
          ...prev.errorMap,
          [errorMapKey]: formError
        }
      }));
    }
    if (formError || fieldErrors) {
      hasErrored = true;
    }
    const submitErrKey = getErrorMapKey("submit");
    if (formApi.state.errorMap?.[submitErrKey] && cause !== "submit" && !hasErrored) {
      formApi.baseStore.setState((prev) => ({
        ...prev,
        errorMap: {
          ...prev.errorMap,
          [submitErrKey]: void 0
        }
      }));
    }
    const serverErrKey = getErrorMapKey("server");
    if (formApi.state.errorMap?.[serverErrKey] && cause !== "server" && !hasErrored) {
      formApi.baseStore.setState((prev) => ({
        ...prev,
        errorMap: {
          ...prev.errorMap,
          [serverErrKey]: void 0
        }
      }));
    }
  }
}, _ControllerForm.$propsDefault = {
  formTag: "form",
  schemaScene: "form"
}, _ControllerForm), _descriptor$3 = _applyDecoratedDescriptor$3(_class2$3.prototype, "$$scopeModuleAOpenapi", [_dec3$3, _dec4$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$3)) || _class$6) || _class$6);
function parseIssues(error) {
  const issues = typeof error.message === "string" ? JSON.parse(error.message) : error.message;
  const fields = {};
  for (const issue of issues) {
    const key = issue.path.join(".");
    fields[key] = issue;
  }
  return {
    fields
  };
}
function normalizeError(rawError) {
  if (rawError) {
    if (isGlobalFormValidationError(rawError)) {
      const formError = normalizeError(rawError.form).formError;
      const fieldErrors = rawError.fields;
      return {
        formError,
        fieldErrors
      };
    }
    return {
      formError: rawError
    };
  }
  return {
    formError: void 0
  };
}
function getErrorMapKey(cause) {
  switch (cause) {
    case "submit":
      return "onSubmit";
    case "blur":
      return "onBlur";
    case "mount":
      return "onMount";
    case "server":
      return "onServer";
    case "dynamic":
      return "onDynamic";
    case "change":
    default:
      return "onChange";
  }
}
var _dec$5, _dec2$5, _dec3$2, _dec4$2, _dec5, _dec6, _class$5, _class2$2, _descriptor$2, _descriptor2, _ControllerFormField;
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
let ControllerFormField = (_dec$5 = Controller(), _dec2$5 = BeanInfo({
  module: "a-form"
}), _dec3$2 = Use({
  injectionScope: "host"
}), _dec4$2 = Reflect.metadata("design:type", typeof ControllerForm === "undefined" ? Object : ControllerForm), _dec5 = Use("a-behavior.bean.behaviorsHolder"), _dec6 = Reflect.metadata("design:type", typeof BeanBehaviorsHolder === "undefined" ? Object : BeanBehaviorsHolder), _dec$5(_class$5 = _dec2$5(_class$5 = (_class2$2 = (_ControllerFormField = class ControllerFormField2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this._formField = void 0;
    this.propsBucket = void 0;
    _initializerDefineProperty$2(this, "$$form", _descriptor$2, this);
    _initializerDefineProperty$2(this, "$$beanBehaviorsHolder", _descriptor2, this);
  }
  async __init__() {
    if (!this.$$form) {
      throw new Error(`FormField component should be used in Form component: ${this.name}`);
    }
    this.bean._setBean("$$formField", this);
    const options = this._getFormFieldOptions();
    this._formField = useField(options);
    this.propsBucket = this.$useComputed(() => {
      return this._getPropsBucket();
    });
    this.$watch(() => this.property, (newValue, oldValue) => {
      if (deepEqual(newValue, oldValue)) return;
      const options2 = this._getFormFieldOptions();
      this._formField.api.update(options2);
      this.form.resetField(this.name);
    });
    await this.$$beanBehaviorsHolder.initialize({
      behaviorTag: void 0,
      behaviors: () => {
        return this._getFieldBehaviors();
      }
    });
  }
  get form() {
    return this.$$form.form;
  }
  get field() {
    return this._formField;
  }
  get name() {
    return this.$props.name;
  }
  get property() {
    return this.$$form.getFieldProperty(this.name);
  }
  get fieldZodSchema() {
    return this.$$form.getFieldZodSchema(this.name);
  }
  get formMeta() {
    return this.$$form.formMeta;
  }
  get formProvider() {
    return this.$$form.formProvider;
  }
  normalizeInputType(renderFlattern, inputType) {
    if (inputType) return inputType;
    if (typeof renderFlattern === "string" && inputTypePresets.includes(renderFlattern)) {
      return renderFlattern;
    }
    return "text";
  }
  setDisplayValue(value, disableNotifyChanged) {
    if (disableNotifyChanged === void 0) {
      disableNotifyChanged = this.propsBucket.disableNotifyChanged;
    }
    return this.$$form.setFieldDisplayValue(this.name, value, this.propsBucket.onSetDisplayValue, disableNotifyChanged);
  }
  setValue(value, disableNotifyChanged) {
    if (disableNotifyChanged === void 0) {
      disableNotifyChanged = this.propsBucket.disableNotifyChanged;
    }
    return this.$$form.setFieldValue(this.name, value, disableNotifyChanged);
  }
  getRenderContext() {
    const name = this.name;
    const propsBucket = this.propsBucket;
    const props = {
      name
    };
    if (propsBucket.class) {
      props.class = propsBucket.class;
    }
    const celScope = this.$$form.getFieldScope(this.name, {
      displayValue: propsBucket.displayValue
    });
    const jsxRenderContext = this.$$form.getFieldJsxRenderContext(this, celScope);
    return {
      propsBucket,
      props,
      celScope,
      jsxRenderContext
    };
  }
  _getPropsBucket() {
    const property = this.property;
    const name = this.name;
    const propsTop = this._getFieldComponentPropsTop();
    const propsBucket = Object.assign({
      bordered: this.scope.config.formFieldLayout.bordered,
      label: property?.title ?? name,
      render: "text"
      // default
    }, this.$$form.$props.formFieldLayout, propsTop, this.$props);
    propsBucket.renderFlattern = this.$$form.getRenderFlattern(propsBucket.render);
    propsBucket.renderProvider = this.$$form.getRenderProvider(propsBucket.render);
    return propsBucket;
  }
  _getFieldComponentPropsTop() {
    if (this.$props[constFieldProps] === true) return;
    const celScope = this.$$form.getFieldScope(this.name);
    const jsxRenderContext = this.$$form.getFieldJsxRenderContext(this, celScope);
    return this.$$form.getFieldComponentPropsTop(this.name, celScope, jsxRenderContext);
  }
  _getFieldBehaviors() {
    const behaviors = {};
    if (this.$props.behaviors) {
      Object.assign(behaviors, this.$props.behaviors);
    }
    this._prepareBehaviorFormField(behaviors);
    this._prepareBehaviorFormFieldLayout(behaviors);
    return behaviors;
  }
  _prepareBehaviorFormField(behaviors) {
    const behaviorFormField = this.formProvider.behaviors?.formField;
    if (!behaviorFormField) return;
    behaviors[behaviorFormField] = {};
  }
  _prepareBehaviorFormFieldLayout(behaviors) {
    const behaviorFormFieldLayout = this.formProvider.behaviors?.formFieldLayout;
    if (!behaviorFormFieldLayout) return;
    behaviors[behaviorFormFieldLayout] = {};
  }
  // private _handleDefaultValue() {
  //   const defaultValue = this.$props.defaultValue ?? this.property?.default;
  //   if (isNil(defaultValue)) return;
  //   const value = this.$$form.getFieldValue(this.name);
  //   if (isNil(value)) {
  //     this.$$form.setFieldValue(this.name, defaultValue, true);
  //   }
  // }
  _getFormFieldOptions() {
    const value = this.$$form.getFieldValue(this.name);
    const defaultValue = isNil(value) ? this.$props.defaultValue ?? this.property?.default : void 0;
    const validators = this._getFormFieldOptionsValidators();
    return Object.assign({
      defaultValue
    }, this.$props, {
      form: this.$$form.form,
      validators
    });
  }
  _getFormFieldOptionsValidators() {
    const zodSchemaField = this.fieldZodSchema;
    const validateOnDynamicDefault = this.$props.validateOnDynamic === void 0 && this.$props.validateOnBlur === void 0 && this.$props.validateOnChange === void 0;
    const validateOnDynamic = this.$props.validateOnDynamic ?? validateOnDynamicDefault;
    const validateOnBlur = this.$props.validateOnBlur;
    const validateOnChange = this.$props.validateOnChange;
    return Object.assign({}, {
      onDynamic: _normalizeValidateSchema(validateOnDynamic, zodSchemaField),
      onBlur: _normalizeValidateSchema(validateOnBlur, zodSchemaField),
      onChange: _normalizeValidateSchema(validateOnChange, zodSchemaField)
    }, this.$props.validators);
  }
}, _ControllerFormField.$propsDefault = {}, _ControllerFormField.$componentOptions = {
  inheritAttrs: false
}, _ControllerFormField), _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$form", [_dec3$2, _dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$beanBehaviorsHolder", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$2)) || _class$5) || _class$5);
function _normalizeValidateSchema(validateSchema, zodSchemaField) {
  if (!validateSchema) return void 0;
  if (validateSchema === true) return zodSchemaField;
  return validateSchema;
}
var _dec$4, _dec2$4, _dec3$1, _dec4$1, _class$4, _class2$1, _descriptor$1, _ControllerFormFieldWrapper;
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
let ControllerFormFieldWrapper = (_dec$4 = Controller(), _dec2$4 = BeanInfo({
  module: "a-form"
}), _dec3$1 = Use({
  injectionScope: "host"
}), _dec4$1 = Reflect.metadata("design:type", typeof ControllerForm === "undefined" ? Object : ControllerForm), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2$1 = (_ControllerFormFieldWrapper = class ControllerFormFieldWrapper2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$1(this, "$$form", _descriptor$1, this);
  }
  async __init__() {
  }
  render() {
    return this.$$form.renderField(this.$props.name);
  }
}, _ControllerFormFieldWrapper.$propsDefault = {}, _ControllerFormFieldWrapper.$componentOptions = {
  inheritAttrs: false
}, _ControllerFormFieldWrapper), _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$form", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$1)) || _class$4) || _class$4);
var _dec$3, _dec2$3, _dec3, _dec4, _class$3, _class2, _descriptor, _ControllerFormSubscribe;
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
let ControllerFormSubscribe = (_dec$3 = Controller(), _dec2$3 = BeanInfo({
  module: "a-form"
}), _dec3 = Use({
  injectionScope: "host"
}), _dec4 = Reflect.metadata("design:type", typeof ControllerForm === "undefined" ? Object : ControllerForm), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2 = (_ControllerFormSubscribe = class ControllerFormSubscribe2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$form", _descriptor, this);
  }
  render() {
    return this.$slotDefault?.(this.$$form);
  }
}, _ControllerFormSubscribe.$propsDefault = {}, _ControllerFormSubscribe), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$form", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$3) || _class$3);
var _dec$2, _dec2$2, _class$2;
let RenderForm = (_dec$2 = Render(), _dec2$2 = BeanInfo({
  module: "a-form"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class RenderForm2 extends BeanRenderBase {
  _renderSchema() {
    if (!this.properties) return;
    const children = [];
    for (const property of this.properties) {
      const child = this._renderField(property);
      if (child) {
        if (Array.isArray(child)) {
          children.push(...child);
        } else {
          children.push(child);
        }
      }
    }
    return children;
  }
  _renderChildren() {
    const children = [];
    children.push(this.$props.slotHeader?.(this));
    const bodyInner = this._renderBodyInner();
    if (this.$props.slotBody) {
      children.push(this.$props.slotBody(bodyInner, this));
    } else {
      children.push(bodyInner);
    }
    children.push(this.$props.slotFooter?.(this));
    return children;
  }
  _renderBodyInner() {
    const FormTag = this.$props.formTag;
    return this.$slotDefault ? this.$slotDefault(this) : createVNode(Fragment, null, [this._renderSchema(), FormTag === "form" && createVNode("button", {
      "type": "submit",
      "style": {
        display: "none"
      }
    }, null)]);
  }
  _renderProps() {
    const FormTag = this.$props.formTag;
    const props = {};
    if (this.$props.inline) {
      props.class = "inline";
    }
    if (FormTag === "form") {
      props.onSubmit = (e) => {
        if (this.$props.onFormSubmit) {
          this.$props.onFormSubmit(e, this);
        } else {
          e.preventDefault();
          e.stopPropagation();
          this.submit();
        }
      };
    }
    return props;
  }
  render() {
    const FormTag = this.$props.formTag;
    const props = this._renderProps();
    const children = this._renderChildren();
    if (this.$props.slotWrapper) {
      return h(FormTag, props, this.$props.slotWrapper(children, this));
    }
    return h(FormTag, props, children);
  }
}) || _class$2) || _class$2);
const ZForm = defineComponent((_props) => {
  useController(ControllerForm$1, RenderForm, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$1, _dec2$1, _class$1;
let RenderFormField = (_dec$1 = Render(), _dec2$1 = BeanInfo({
  module: "a-form"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class RenderFormField2 extends BeanRenderBase {
  render() {
    const renderContext = this.getRenderContext();
    return this.$$beanBehaviorsHolder.render((renderContext2) => {
      return this._renderSlotDefault(renderContext2);
    }, renderContext);
  }
  _renderSlotDefault(renderContext) {
    if (this.$slotDefault) {
      return this.$slotDefault(renderContext, this);
    }
    return this.$$form.zovaJsx.render(renderContext.propsBucket.render, renderContext.props, renderContext.celScope, renderContext.jsxRenderContext);
  }
}) || _class$1) || _class$1);
const ZFormField = defineComponent((_props) => {
  useController(ControllerFormField, RenderFormField, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerFormField.$componentOptions));
const ZFormFieldWrapper = defineComponent((_props) => {
  useController(ControllerFormFieldWrapper, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerFormFieldWrapper.$componentOptions));
const ZFormSubscribe = defineComponent((_props) => {
  useController(ControllerFormSubscribe, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
const config = (_sys) => {
  return {
    formFieldLayout: {
      bordered: true
    }
  };
};
var _dec, _dec2, _class;
const components = {
  "form": ZForm,
  "formField": ZFormField,
  "formFieldWrapper": ZFormFieldWrapper,
  "formSubscribe": ZFormSubscribe
};
let ScopeModuleAForm = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-form"
}), _dec(_class = _dec2(_class = class ScopeModuleAForm2 extends BeanScopeBase {
}) || _class) || _class);
class BeanControllerPageFormBase extends BeanControllerPageBase {
  $useForm(opts) {
    return this.ctx.util.instanceScope(() => {
      return markRaw(useForm(opts));
    });
  }
}
function formMetaFromFormScene(formScene) {
  if (formScene === "view") return {
    formScene,
    formMode: "view",
    editMode: void 0
  };
  if (formScene === "create") return {
    formScene,
    formMode: "edit",
    editMode: "create"
  };
  if (formScene === "edit") return {
    formScene,
    formMode: "edit",
    editMode: "update"
  };
  throw new Error("invalid parameters");
}
function formSceneFromFormMeta(formMeta) {
  if (formMeta.formMode === "view") return "view";
  if (formMeta.formMode === "edit" && formMeta.editMode === "create") return "create";
  if (formMeta.formMode === "edit" && formMeta.editMode === "update") return "edit";
  if (formMeta.formMode === "edit" && formMeta.editMode === void 0) return "edit";
  return void 0;
}
export {
  BeanControllerFormBase,
  BeanControllerPageFormBase,
  ControllerForm$1 as ControllerForm,
  ControllerFormField,
  ControllerFormFieldWrapper,
  ControllerFormSubscribe,
  RenderForm,
  RenderFormField,
  ScopeModuleAForm,
  ZForm,
  ZFormField,
  ZFormFieldWrapper,
  ZFormSubscribe,
  components,
  config,
  constFieldProps,
  formMetaFromFormScene,
  formSceneFromFormMeta,
  inputTypePresets
};
