import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { d as markRaw } from "./vue-BuTKVo3e.js";
import { d as defineComponent, l as createVNode, p as h, r as Fragment } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
import { D as celEnvBase, E as catchError, H as isNil, _ as init_dist$1, g as ZodMetadata, z as init_dist } from "./zova-C8-MPvXl.js";
import { d as _objectSpread2, f as init_objectSpread2, m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { B as deepExtend, C as UseScope, U as objectAssignReactive, X as cast, _ as BeanRenderBase, b as BeanControllerBase, h as BeanScopeBase, k as BeanInfo, l as prepareComponentOptions, u as useController, v as BeanControllerPageBase, w as Use, z as deepEqual } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { _ as Render, h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
import { c as getBy, l as isGlobalFormValidationError, n as useStore, o as revalidateLogic, s as determineFormLevelErrorSourceAndValue } from "./esm-B9JOh45W.js";
import { n as useForm, r as useField, t as init_esm } from "./tanstack-form-Dmf-TzjR.js";
import { i as isJsxComponent, n as ZovaJsx, t as init_src$3 } from "./zova-CWLB1h7H.js";
import { n as renderFormFieldTopPropsSystem, t as init_src$4 } from "./a-openapi-B6wN1jpJ.js";
//#region src/suite-vendor/a-zova/modules/a-form/src/lib/beanControllerFormBase.ts
var BeanControllerFormBase;
var init_beanControllerFormBase = __esmMin((() => {
	init_esm();
	init_vue_runtime_esm_bundler();
	init_src$1();
	BeanControllerFormBase = class extends BeanControllerBase {
		$useForm(opts) {
			return this.ctx.util.instanceScope(() => {
				return markRaw(useForm(opts));
			});
		}
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/types/formField.ts
var inputTypePresets, constFieldProps;
var init_formField$1 = __esmMin((() => {
	inputTypePresets = [
		"text",
		"password",
		"number",
		"file",
		"hidden",
		"tel",
		"email"
	];
	constFieldProps = "$$FieldProps";
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/component/form/controller.tsx
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
function parseIssues(error) {
	const issues = typeof error.message === "string" ? JSON.parse(error.message) : error.message;
	const fields = {};
	for (const issue of issues) {
		const key = issue.path.join(".");
		fields[key] = issue;
	}
	return { fields };
}
function normalizeError(rawError) {
	if (rawError) {
		if (isGlobalFormValidationError(rawError)) return {
			formError: normalizeError(rawError.form).formError,
			fieldErrors: rawError.fields
		};
		return { formError: rawError };
	}
	return { formError: void 0 };
}
function getErrorMapKey(cause) {
	switch (cause) {
		case "submit": return "onSubmit";
		case "blur": return "onBlur";
		case "mount": return "onMount";
		case "server": return "onServer";
		case "dynamic": return "onDynamic";
		default: return "onChange";
	}
}
var _dec$6, _dec2$6, _dec3$3, _dec4$3, _class$6, _class2$3, _descriptor$3, _ControllerForm, ControllerForm$1;
var init_controller$3 = __esmMin((() => {
	init_asyncToGenerator();
	init_objectSpread2();
	init_src$1();
	init_dist();
	init_dist$1();
	init_esm();
	init_src$3();
	init_src$2();
	init_src$4();
	init_beanControllerFormBase();
	init_formField$1();
	ControllerForm$1 = (_dec$6 = Controller(), _dec2$6 = BeanInfo({ module: "a-form" }), _dec3$3 = UseScope("a-openapi"), _dec4$3 = Reflect.metadata("design:type", typeof ScopeModuleAOpenapi === "undefined" ? Object : ScopeModuleAOpenapi), _dec$6(_class$6 = _dec2$6(_class$6 = (_class2$3 = (_ControllerForm = class ControllerForm extends BeanControllerFormBase {
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
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.bean._setBean("$$form", _this);
				_this.form = _this._createForm();
				_this.formState = useStore(_this.form.store, (state) => state);
				_this.formProvider = _this.$useComputed(() => {
					var _this$$$scopeModuleAO;
					return deepExtend({}, _this.$$scopeModuleAOpenapi.config.resourceMeta.provider, (_this$$$scopeModuleAO = _this.$$scopeModuleAOpenapi.config.resourceMeta.form) === null || _this$$$scopeModuleAO === void 0 ? void 0 : _this$$$scopeModuleAO.provider, _this.$props.formProvider);
				});
				_this.schema = _this.$useComputed(() => {
					return _this.$props.schema;
				});
				_this.zodSchema = _this.$useComputed(() => {
					return _this._getZodSchema();
				});
				_this.properties = _this.$useComputed(() => {
					return _this.$sdk.loadSchemaProperties(_this.schema, _this.$props.schemaScene);
				});
				_this.fieldCelEnv = _this._getFieldCelEnv();
				_this.zovaJsx = _this.app.bean._newBeanSimple(ZovaJsx, false, _this.formProvider.components, _this.formProvider.actions, _this.fieldCelEnv);
				_this.$watch(() => _this.$props.data, (newValue, oldValue) => {
					if (deepEqual(newValue, oldValue)) return;
					_this.reset(_this.$props.data);
				});
			})();
		}
		submit(submitMeta) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				const [_, error] = yield catchError(() => {
					return _this2.form.handleSubmit(submitMeta);
				});
				return !error && _this2.formState.isValid;
			})();
		}
		reset(values, opts) {
			this.form.reset(values !== null && values !== void 0 ? values : {}, opts);
			return this.form.state.values;
		}
		get formMeta() {
			return this.$props.formMeta;
		}
		getFieldValue(name) {
			var _getBy;
			return (_getBy = getBy(this.formState.values, name)) !== null && _getBy !== void 0 ? _getBy : null;
		}
		setFieldValue(name, value, disableNotifyChanged) {
			this.form.setFieldValue(name, value);
			if (!disableNotifyChanged) {
				var _this$$props$onChange, _this$$props;
				(_this$$props$onChange = (_this$$props = this.$props).onChanged) === null || _this$$props$onChange === void 0 || _this$$props$onChange.call(_this$$props, this.formState.values);
			}
		}
		setFieldDisplayValue(name, value, onSetDisplayValue, disableNotifyChanged) {
			if (onSetDisplayValue) value = onSetDisplayValue(value);
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
				var _this$form$getFieldVa;
				return (_this$form$getFieldVa = this.form.getFieldValue(name)) !== null && _this$form$getFieldVa !== void 0 ? _this$form$getFieldVa : null;
			});
			celEnv.registerFunction("getProperty(string):dyn", (name) => {
				var _this$getFieldPropert;
				return (_this$getFieldPropert = this.getFieldProperty(name)) !== null && _this$getFieldPropert !== void 0 ? _this$getFieldPropert : null;
			});
			return celEnv;
		}
		getFieldScope(name, scopeExtra) {
			return objectAssignReactive({}, this.$props.formScope, _objectSpread2({
				name,
				value: this.getFieldValue(name),
				property: this.getFieldProperty(name)
			}, scopeExtra));
		}
		getFieldJsxRenderContext($$formField, celScope) {
			return {
				app: this.app,
				ctx: this.ctx,
				$scene: "formField",
				$host: $$formField !== null && $$formField !== void 0 ? $$formField : this,
				$celScope: celScope,
				$jsx: this.zovaJsx,
				$$formField,
				$$form: this
			};
		}
		getFieldComponentPropsTop(name, celScope, jsxRenderContext) {
			const props = this._getFieldComponentPropsTopInner(name, celScope, jsxRenderContext);
			if (props.displayValue === void 0) props.displayValue = celScope.value;
			return props;
		}
		_getFieldComponentPropsTopInner(name, celScope, jsxRenderContext) {
			const props = {
				["$$FieldProps"]: true,
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
				if (key === "render") if (typeof value === "string") keyValue = this.zovaJsx.evaluateExpression(value, celScope);
				else keyValue = value;
				else keyValue = this.zovaJsx.renderJsxOrCel(value, void 0, celScope, jsxRenderContext);
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
				var _this$formProvider$co, _this$formProvider$co2;
				renderProvider = (_this$formProvider$co = (_this$formProvider$co2 = this.formProvider.components) === null || _this$formProvider$co2 === void 0 ? void 0 : _this$formProvider$co2[renderProvider]) !== null && _this$formProvider$co !== void 0 ? _this$formProvider$co : renderProvider;
			}
			return renderProvider;
		}
		_getZodSchema() {
			if (this.$props.zodSchema) return this._patchZodSchema(this.$props.zodSchema);
			if (!this.schema) return;
			return this._patchZodSchema(this.$sdk.schemaToZodSchema(this.schema));
		}
		_patchZodSchema(schema) {
			if (schema.def.type === "object") return schema;
			if (schema.def.type === "union") return schema.def.options.find((item) => item.def.type === "object");
			throw new Error("invalid zod schema");
		}
		_createForm() {
			var _this3 = this;
			return this.$useForm({
				defaultValues: this.$props.data,
				validationLogic: this.$props.validateOnDynamic !== false ? revalidateLogic(this.$props.validateOnDynamicLogic) : void 0,
				onSubmitInvalid: (data) => {
					var _this$$props$onSubmit, _this$$props2;
					(_this$$props$onSubmit = (_this$$props2 = this.$props).onSubmitInvalid) === null || _this$$props$onSubmit === void 0 || _this$$props$onSubmit.call(_this$$props2, data, this);
				},
				onSubmit: function() {
					var _ref = _asyncToGenerator(function* (data) {
						const [_, error] = yield catchError(() => {
							var _this$$props$onSubmit2, _this$$props3;
							return (_this$$props$onSubmit2 = (_this$$props3 = _this3.$props).onSubmitData) === null || _this$$props$onSubmit2 === void 0 ? void 0 : _this$$props$onSubmit2.call(_this$$props3, data, _this3);
						});
						const resHandled = yield _this3.app.meta.event.emit("a-form:formSubmission", {
							form: _this3.form,
							data,
							error
						});
						if (!error) return;
						if (error.code === 422) {
							var _this$$props$onSubmit3, _this$$props4;
							_this3._handleError422(error);
							(_this$$props$onSubmit3 = (_this$$props4 = _this3.$props).onSubmitInvalid) === null || _this$$props$onSubmit3 === void 0 || _this$$props$onSubmit3.call(_this$$props4, data, _this3);
						} else if (!resHandled) {
							var _this$$props$onShowEr, _this$$props5;
							(_this$$props$onShowEr = (_this$$props5 = _this3.$props).onShowError) === null || _this$$props$onShowEr === void 0 || _this$$props$onShowEr.call(_this$$props5, {
								data,
								error
							}, _this3);
						}
						throw error;
					});
					return function onSubmit(_x) {
						return _ref.apply(this, arguments);
					};
				}()
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
			var _this$formProvider$co3, _this$formProvider$co4;
			const renderProvider = this.getRenderProvider(render);
			if (typeof renderProvider === "string" && renderProvider.includes(":formField")) return render;
			return (_this$formProvider$co3 = (_this$formProvider$co4 = this.formProvider.components) === null || _this$formProvider$co4 === void 0 ? void 0 : _this$formProvider$co4.formField) !== null && _this$formProvider$co3 !== void 0 ? _this$formProvider$co3 : "a-form:formField";
		}
		_handleError422(error, cause = "submit") {
			var _formApi$state$errorM, _formApi$state$errorM2, _formApi$state$errorM3;
			const formApi = this.form;
			let hasErrored = false;
			const currentValidationErrorMap = {};
			const { formError, fieldErrors } = normalizeError(parseIssues(error));
			const errorMapKey = getErrorMapKey(cause);
			for (const field of Object.keys(formApi.state.fieldMeta)) {
				if (formApi.baseStore.state.fieldMetaBase[field] === void 0) continue;
				const fieldMeta = formApi.getFieldMeta(field);
				if (!fieldMeta) continue;
				const { errorMap: currentErrorMap, errorSourceMap: currentErrorMapSource } = fieldMeta;
				const newFormValidatorError = fieldErrors === null || fieldErrors === void 0 ? void 0 : fieldErrors[field];
				const { newErrorValue, newSource } = determineFormLevelErrorSourceAndValue({
					newFormValidatorError,
					isPreviousErrorFromFormValidator: (currentErrorMapSource === null || currentErrorMapSource === void 0 ? void 0 : currentErrorMapSource[errorMapKey]) === "form",
					previousErrorValue: currentErrorMap === null || currentErrorMap === void 0 ? void 0 : currentErrorMap[errorMapKey]
				});
				if (newSource === "form") currentValidationErrorMap[field] = _objectSpread2(_objectSpread2({}, currentValidationErrorMap[field]), {}, { [errorMapKey]: newFormValidatorError });
				if ((currentErrorMap === null || currentErrorMap === void 0 ? void 0 : currentErrorMap[errorMapKey]) !== newErrorValue) formApi.setFieldMeta(field, (prev) => _objectSpread2(_objectSpread2({}, prev), {}, {
					errorMap: _objectSpread2(_objectSpread2({}, prev.errorMap), {}, { [errorMapKey]: newErrorValue }),
					errorSourceMap: _objectSpread2(_objectSpread2({}, prev.errorSourceMap), {}, { [errorMapKey]: newSource })
				}));
			}
			if (((_formApi$state$errorM = formApi.state.errorMap) === null || _formApi$state$errorM === void 0 ? void 0 : _formApi$state$errorM[errorMapKey]) !== formError) formApi.baseStore.setState((prev) => _objectSpread2(_objectSpread2({}, prev), {}, { errorMap: _objectSpread2(_objectSpread2({}, prev.errorMap), {}, { [errorMapKey]: formError }) }));
			if (formError || fieldErrors) hasErrored = true;
			/**
			*  when we have an error for onSubmit in the state, we want
			*  to clear the error as soon as the user enters a valid value in the field
			*/
			const submitErrKey = getErrorMapKey("submit");
			if (((_formApi$state$errorM2 = formApi.state.errorMap) === null || _formApi$state$errorM2 === void 0 ? void 0 : _formApi$state$errorM2[submitErrKey]) && cause !== "submit" && !hasErrored) formApi.baseStore.setState((prev) => _objectSpread2(_objectSpread2({}, prev), {}, { errorMap: _objectSpread2(_objectSpread2({}, prev.errorMap), {}, { [submitErrKey]: void 0 }) }));
			/**
			*  when we have an error for onServer in the state, we want
			*  to clear the error as soon as the user enters a valid value in the field
			*/
			const serverErrKey = getErrorMapKey("server");
			if (((_formApi$state$errorM3 = formApi.state.errorMap) === null || _formApi$state$errorM3 === void 0 ? void 0 : _formApi$state$errorM3[serverErrKey]) && cause !== "server" && !hasErrored) formApi.baseStore.setState((prev) => _objectSpread2(_objectSpread2({}, prev), {}, { errorMap: _objectSpread2(_objectSpread2({}, prev.errorMap), {}, { [serverErrKey]: void 0 }) }));
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
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/component/formField/controller.tsx
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
function _normalizeValidateSchema(validateSchema, zodSchemaField) {
	if (!validateSchema) return void 0;
	if (validateSchema === true) return zodSchemaField;
	return validateSchema;
}
var _dec$5, _dec2$5, _dec3$2, _dec4$2, _dec5, _dec6, _class$5, _class2$2, _descriptor$2, _descriptor2, _ControllerFormField, ControllerFormField;
var init_controller$2 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_dist();
	init_esm();
	init_src$2();
	init_formField$1();
	ControllerFormField = (_dec$5 = Controller(), _dec2$5 = BeanInfo({ module: "a-form" }), _dec3$2 = Use({ injectionScope: "host" }), _dec4$2 = Reflect.metadata("design:type", typeof ControllerForm === "undefined" ? Object : ControllerForm), _dec5 = Use("a-behavior.bean.behaviorsHolder"), _dec6 = Reflect.metadata("design:type", typeof BeanBehaviorsHolder === "undefined" ? Object : BeanBehaviorsHolder), _dec$5(_class$5 = _dec2$5(_class$5 = (_class2$2 = (_ControllerFormField = class ControllerFormField extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			this._formField = void 0;
			this.propsBucket = void 0;
			_initializerDefineProperty$2(this, "$$form", _descriptor$2, this);
			_initializerDefineProperty$2(this, "$$beanBehaviorsHolder", _descriptor2, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				if (!_this.$$form) throw new Error(`FormField component should be used in Form component: ${_this.name}`);
				_this.bean._setBean("$$formField", _this);
				_this._formField = useField(_this._getFormFieldOptions());
				_this.propsBucket = _this.$useComputed(() => {
					return _this._getPropsBucket();
				});
				_this.$watch(() => _this.property, (newValue, oldValue) => {
					if (deepEqual(newValue, oldValue)) return;
					const options = _this._getFormFieldOptions();
					_this._formField.api.update(options);
					_this.form.resetField(_this.name);
				});
				yield _this.$$beanBehaviorsHolder.initialize({
					behaviorTag: void 0,
					behaviors: () => {
						return _this._getFieldBehaviors();
					}
				});
			})();
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
			if (typeof renderFlattern === "string" && inputTypePresets.includes(renderFlattern)) return renderFlattern;
			return "text";
		}
		setDisplayValue(value, disableNotifyChanged) {
			if (disableNotifyChanged === void 0) disableNotifyChanged = this.propsBucket.disableNotifyChanged;
			return this.$$form.setFieldDisplayValue(this.name, value, this.propsBucket.onSetDisplayValue, disableNotifyChanged);
		}
		setValue(value, disableNotifyChanged) {
			if (disableNotifyChanged === void 0) disableNotifyChanged = this.propsBucket.disableNotifyChanged;
			return this.$$form.setFieldValue(this.name, value, disableNotifyChanged);
		}
		getRenderContext() {
			const name = this.name;
			const propsBucket = this.propsBucket;
			const props = { name };
			if (propsBucket.class) props.class = propsBucket.class;
			const celScope = this.$$form.getFieldScope(this.name, { displayValue: propsBucket.displayValue });
			return {
				propsBucket,
				props,
				celScope,
				jsxRenderContext: this.$$form.getFieldJsxRenderContext(this, celScope)
			};
		}
		_getPropsBucket() {
			var _property$title;
			const property = this.property;
			const name = this.name;
			const propsTop = this._getFieldComponentPropsTop();
			const propsBucket = Object.assign({
				bordered: this.scope.config.formFieldLayout.bordered,
				label: (_property$title = property === null || property === void 0 ? void 0 : property.title) !== null && _property$title !== void 0 ? _property$title : name,
				render: "text"
			}, this.$$form.$props.formFieldLayout, propsTop, this.$props);
			propsBucket.renderFlattern = this.$$form.getRenderFlattern(propsBucket.render);
			propsBucket.renderProvider = this.$$form.getRenderProvider(propsBucket.render);
			return propsBucket;
		}
		_getFieldComponentPropsTop() {
			if (this.$props["$$FieldProps"] === true) return;
			const celScope = this.$$form.getFieldScope(this.name);
			const jsxRenderContext = this.$$form.getFieldJsxRenderContext(this, celScope);
			return this.$$form.getFieldComponentPropsTop(this.name, celScope, jsxRenderContext);
		}
		_getFieldBehaviors() {
			const behaviors = {};
			if (this.$props.behaviors) Object.assign(behaviors, this.$props.behaviors);
			this._prepareBehaviorFormField(behaviors);
			this._prepareBehaviorFormFieldLayout(behaviors);
			return behaviors;
		}
		_prepareBehaviorFormField(behaviors) {
			var _this$formProvider$be;
			const behaviorFormField = (_this$formProvider$be = this.formProvider.behaviors) === null || _this$formProvider$be === void 0 ? void 0 : _this$formProvider$be.formField;
			if (!behaviorFormField) return;
			behaviors[behaviorFormField] = {};
		}
		_prepareBehaviorFormFieldLayout(behaviors) {
			var _this$formProvider$be2;
			const behaviorFormFieldLayout = (_this$formProvider$be2 = this.formProvider.behaviors) === null || _this$formProvider$be2 === void 0 ? void 0 : _this$formProvider$be2.formFieldLayout;
			if (!behaviorFormFieldLayout) return;
			behaviors[behaviorFormFieldLayout] = {};
		}
		_getFormFieldOptions() {
			var _this$$props$defaultV, _this$property;
			const defaultValue = isNil(this.$$form.getFieldValue(this.name)) ? (_this$$props$defaultV = this.$props.defaultValue) !== null && _this$$props$defaultV !== void 0 ? _this$$props$defaultV : (_this$property = this.property) === null || _this$property === void 0 ? void 0 : _this$property.default : void 0;
			const validators = this._getFormFieldOptionsValidators();
			return Object.assign({ defaultValue }, this.$props, {
				form: this.$$form.form,
				validators
			});
		}
		_getFormFieldOptionsValidators() {
			var _this$$props$validate;
			const zodSchemaField = this.fieldZodSchema;
			const validateOnDynamicDefault = this.$props.validateOnDynamic === void 0 && this.$props.validateOnBlur === void 0 && this.$props.validateOnChange === void 0;
			const validateOnDynamic = (_this$$props$validate = this.$props.validateOnDynamic) !== null && _this$$props$validate !== void 0 ? _this$$props$validate : validateOnDynamicDefault;
			const validateOnBlur = this.$props.validateOnBlur;
			const validateOnChange = this.$props.validateOnChange;
			return Object.assign({}, {
				onDynamic: _normalizeValidateSchema(validateOnDynamic, zodSchemaField),
				onBlur: _normalizeValidateSchema(validateOnBlur, zodSchemaField),
				onChange: _normalizeValidateSchema(validateOnChange, zodSchemaField)
			}, this.$props.validators);
		}
	}, _ControllerFormField.$propsDefault = {}, _ControllerFormField.$componentOptions = { inheritAttrs: false }, _ControllerFormField), _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$form", [_dec3$2, _dec4$2], {
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
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/component/formFieldWrapper/controller.tsx
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
var _dec$4, _dec2$4, _dec3$1, _dec4$1, _class$4, _class2$1, _descriptor$1, _ControllerFormFieldWrapper, ControllerFormFieldWrapper;
var init_controller$1 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerFormFieldWrapper = (_dec$4 = Controller(), _dec2$4 = BeanInfo({ module: "a-form" }), _dec3$1 = Use({ injectionScope: "host" }), _dec4$1 = Reflect.metadata("design:type", typeof ControllerForm === "undefined" ? Object : ControllerForm), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2$1 = (_ControllerFormFieldWrapper = class ControllerFormFieldWrapper extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty$1(this, "$$form", _descriptor$1, this);
		}
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		render() {
			return this.$$form.renderField(this.$props.name);
		}
	}, _ControllerFormFieldWrapper.$propsDefault = {}, _ControllerFormFieldWrapper.$componentOptions = { inheritAttrs: false }, _ControllerFormFieldWrapper), _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$form", [_dec3$1, _dec4$1], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$1)) || _class$4) || _class$4);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/component/formSubscribe/controller.tsx
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
var _dec$3, _dec2$3, _dec3, _dec4, _class$3, _class2, _descriptor, _ControllerFormSubscribe, ControllerFormSubscribe;
var init_controller = __esmMin((() => {
	init_src$1();
	init_src$2();
	ControllerFormSubscribe = (_dec$3 = Controller(), _dec2$3 = BeanInfo({ module: "a-form" }), _dec3 = Use({ injectionScope: "host" }), _dec4 = Reflect.metadata("design:type", typeof ControllerForm === "undefined" ? Object : ControllerForm), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2 = (_ControllerFormSubscribe = class ControllerFormSubscribe extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty(this, "$$form", _descriptor, this);
		}
		render() {
			var _this$$slotDefault;
			return (_this$$slotDefault = this.$slotDefault) === null || _this$$slotDefault === void 0 ? void 0 : _this$$slotDefault.call(this, this.$$form);
		}
	}, _ControllerFormSubscribe.$propsDefault = {}, _ControllerFormSubscribe), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$form", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/component/form/render.tsx
var _dec$2, _dec2$2, _class$2, RenderForm;
var init_render$1 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	RenderForm = (_dec$2 = Render(), _dec2$2 = BeanInfo({ module: "a-form" }), _dec$2(_class$2 = _dec2$2(_class$2 = class RenderForm extends BeanRenderBase {
		_renderSchema() {
			if (!this.properties) return;
			const children = [];
			for (const property of this.properties) {
				const child = this._renderField(property);
				if (child) if (Array.isArray(child)) children.push(...child);
				else children.push(child);
			}
			return children;
		}
		_renderChildren() {
			var _this$$props$slotHead, _this$$props, _this$$props$slotFoot, _this$$props2;
			const children = [];
			children.push((_this$$props$slotHead = (_this$$props = this.$props).slotHeader) === null || _this$$props$slotHead === void 0 ? void 0 : _this$$props$slotHead.call(_this$$props, this));
			const bodyInner = this._renderBodyInner();
			if (this.$props.slotBody) children.push(this.$props.slotBody(bodyInner, this));
			else children.push(bodyInner);
			children.push((_this$$props$slotFoot = (_this$$props2 = this.$props).slotFooter) === null || _this$$props$slotFoot === void 0 ? void 0 : _this$$props$slotFoot.call(_this$$props2, this));
			return children;
		}
		_renderBodyInner() {
			const FormTag = this.$props.formTag;
			return this.$slotDefault ? this.$slotDefault(this) : createVNode(Fragment, null, [this._renderSchema(), FormTag === "form" && createVNode("button", {
				"type": "submit",
				"style": { display: "none" }
			}, null)]);
		}
		_renderProps() {
			const FormTag = this.$props.formTag;
			const props = {};
			if (this.$props.inline) props.class = "inline";
			if (FormTag === "form") props.onSubmit = (e) => {
				if (this.$props.onFormSubmit) this.$props.onFormSubmit(e, this);
				else {
					e.preventDefault();
					e.stopPropagation();
					this.submit();
				}
			};
			return props;
		}
		render() {
			const FormTag = this.$props.formTag;
			const props = this._renderProps();
			const children = this._renderChildren();
			if (this.$props.slotWrapper) return h(FormTag, props, this.$props.slotWrapper(children, this));
			return h(FormTag, props, children);
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/.metadata/component/form.ts
var ZForm;
var init_form$1 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$3();
	init_render$1();
	ZForm = defineComponent((_props) => {
		useController(ControllerForm$1, RenderForm, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/component/formField/render.tsx
var _dec$1, _dec2$1, _class$1, RenderFormField;
var init_render = __esmMin((() => {
	init_src$1();
	init_src$2();
	RenderFormField = (_dec$1 = Render(), _dec2$1 = BeanInfo({ module: "a-form" }), _dec$1(_class$1 = _dec2$1(_class$1 = class RenderFormField extends BeanRenderBase {
		render() {
			const renderContext = this.getRenderContext();
			return this.$$beanBehaviorsHolder.render((renderContext) => {
				return this._renderSlotDefault(renderContext);
			}, renderContext);
		}
		_renderSlotDefault(renderContext) {
			if (this.$slotDefault) return this.$slotDefault(renderContext, this);
			return this.$$form.zovaJsx.render(renderContext.propsBucket.render, renderContext.props, renderContext.celScope, renderContext.jsxRenderContext);
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/.metadata/component/formField.ts
var ZFormField;
var init_formField = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$2();
	init_render();
	ZFormField = defineComponent((_props) => {
		useController(ControllerFormField, RenderFormField, void 0);
		return () => {};
	}, prepareComponentOptions(ControllerFormField.$componentOptions));
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/.metadata/component/formFieldWrapper.ts
var ZFormFieldWrapper;
var init_formFieldWrapper = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$1();
	ZFormFieldWrapper = defineComponent((_props) => {
		useController(ControllerFormFieldWrapper, void 0, void 0);
		return () => {};
	}, prepareComponentOptions(ControllerFormFieldWrapper.$componentOptions));
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/.metadata/component/formSubscribe.ts
var ZFormSubscribe;
var init_formSubscribe = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller();
	ZFormSubscribe = defineComponent((_props) => {
		useController(ControllerFormSubscribe, void 0, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/config/config.ts
var config;
var init_config = __esmMin((() => {
	config = (_sys) => {
		return { formFieldLayout: { bordered: true } };
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/.metadata/index.ts
/** config: end */
/** scope: begin */
var _dec, _dec2, _class, components, ScopeModuleAForm;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller$3();
	init_controller$2();
	init_controller$1();
	init_controller();
	init_form$1();
	init_form$1();
	init_formField();
	init_formField();
	init_formFieldWrapper();
	init_formFieldWrapper();
	init_formSubscribe();
	init_formSubscribe();
	init_render$1();
	init_render();
	init_config();
	init_src$2();
	components = {
		"form": ZForm,
		"formField": ZFormField,
		"formFieldWrapper": ZFormFieldWrapper,
		"formSubscribe": ZFormSubscribe
	};
	ScopeModuleAForm = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-form" }), _dec(_class = _dec2(_class = class ScopeModuleAForm extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/lib/beanControllerPageFormBase.ts
var BeanControllerPageFormBase;
var init_beanControllerPageFormBase = __esmMin((() => {
	init_esm();
	init_vue_runtime_esm_bundler();
	init_src$1();
	BeanControllerPageFormBase = class extends BeanControllerPageBase {
		$useForm(opts) {
			return this.ctx.util.instanceScope(() => {
				return markRaw(useForm(opts));
			});
		}
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/lib/utils.ts
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
}
var init_utils = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/lib/index.ts
var init_lib = __esmMin((() => {
	init_beanControllerFormBase();
	init_beanControllerPageFormBase();
	init_utils();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/types/form.ts
var init_form = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/types/formMeta.ts
var init_formMeta = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/types/provider.ts
var init_provider = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/types/index.ts
var init_types = __esmMin((() => {
	init_form();
	init_formField$1();
	init_formMeta();
	init_provider();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-form/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_lib();
	init_types();
}));
//#endregion
export { ControllerForm$1 as _, ScopeModuleAForm as a, BeanControllerFormBase as b, ZFormSubscribe as c, RenderFormField as d, ZForm as f, ControllerFormField as g, ControllerFormFieldWrapper as h, BeanControllerPageFormBase as i, ZFormFieldWrapper as l, ControllerFormSubscribe as m, formMetaFromFormScene as n, components as o, RenderForm as p, formSceneFromFormMeta as r, config as s, init_src as t, ZFormField as u, constFieldProps as v, inputTypePresets as y };
