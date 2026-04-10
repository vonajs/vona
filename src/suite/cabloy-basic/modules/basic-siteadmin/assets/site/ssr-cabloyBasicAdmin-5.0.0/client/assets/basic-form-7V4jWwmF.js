import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { d as defineComponent, l as createVNode, r as Fragment, v as mergeProps } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler, t as init_jsx_runtime } from "./vue-C_EuNVEw.js";
import { d as _objectSpread2, f as init_objectSpread2, m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { Y as useComputed, b as BeanControllerBase, d as ClientOnly, h as BeanScopeBase, k as BeanInfo, l as prepareComponentOptions, m as createZovaComponentAsync, s as useApp, u as useController, w as Use } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
import { r as invokeProp, t as init_src$3 } from "./zova-CWLB1h7H.js";
import { i as init_lib_es2015, o as classes } from "./typestyle-CuQyLMpN.js";
import { a as Behavior, d as BeanBehaviorBase, t as init_src$4 } from "./a-behavior-DMpiB_3-.js";
//#region src/suite/cabloy-basic/modules/basic-form/src/component/formFieldCaptcha/controller.tsx
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
var _dec$3, _dec2$3, _dec3$2, _dec4$2, _dec5, _dec6, _class$3, _class2$2, _descriptor$2, _descriptor2, _ControllerFormFieldCaptcha, ZFormField, ControllerFormFieldCaptcha;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_objectSpread2();
	init_src$1();
	init_src$2();
	ZFormField = createZovaComponentAsync("a-form", "formField");
	ControllerFormFieldCaptcha = (_dec$3 = Controller(), _dec2$3 = BeanInfo({ module: "basic-form" }), _dec3$2 = Use("a-zod.tool.v"), _dec4$2 = Reflect.metadata("design:type", typeof ToolV === "undefined" ? Object : ToolV), _dec5 = Use({
		injectionScope: "host",
		beanFullName: "a-form.controller.form"
	}), _dec6 = Reflect.metadata("design:type", typeof ControllerForm === "undefined" ? Object : ControllerForm), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2$2 = (_ControllerFormFieldCaptcha = class ControllerFormFieldCaptcha extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			this.eventFormSubmission = void 0;
			this.captchaData = void 0;
			_initializerDefineProperty$2(this, "$$v", _descriptor$2, this);
			_initializerDefineProperty$2(this, "$$form", _descriptor2, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.eventFormSubmission = _this.app.meta.event.on("a-form:formSubmission", (data, next) => {
					if (data.form.formId === _this.$$form.form.formId && data.error) _this.refreshCaptchaData();
					return next();
				});
				_this.createCaptchaData();
			})();
		}
		__dispose__() {
			if (this.eventFormSubmission) this.eventFormSubmission();
		}
		get captchaScene() {
			var _this$$props$captcha$, _this$$props$captcha;
			return (_this$$props$captcha$ = (_this$$props$captcha = this.$props.captcha) === null || _this$$props$captcha === void 0 ? void 0 : _this$$props$captcha.scene) !== null && _this$$props$captcha$ !== void 0 ? _this$$props$captcha$ : "captcha-simple:simple";
		}
		createCaptchaData() {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				_this2.captchaData = yield _this2.$api.captcha.create({ scene: _this2.captchaScene }, { authToken: false });
				_this2.setFieldCaptchaData();
			})();
		}
		refreshCaptchaData() {
			var _this3 = this;
			return _asyncToGenerator(function* () {
				_this3.captchaData = yield _this3.$api.captcha.refresh({
					id: _this3.captchaData.id,
					scene: _this3.captchaScene
				}, { authToken: false });
				_this3.setFieldCaptchaData();
			})();
		}
		setFieldCaptchaData() {
			var _this$captchaData, _this$captchaData2;
			this.$$form.setFieldValue(this.$props.name, {
				id: (_this$captchaData = this.captchaData) === null || _this$captchaData === void 0 ? void 0 : _this$captchaData.id,
				token: (_this$captchaData2 = this.captchaData) === null || _this$captchaData2 === void 0 ? void 0 : _this$captchaData2.token
			});
		}
		render() {
			return createVNode(Fragment, null, [createVNode(ZFormField, mergeProps(this.$props, {
				"render": "text",
				"slotDefault": ({ props }, $$formField) => {
					var _this$captchaData3;
					return createVNode("input", _objectSpread2(_objectSpread2({}, props), {}, {
						type: "text",
						class: "grow",
						placeholder: this.scope.locale.InputCaptcha(),
						value: (_this$captchaData3 = this.captchaData) === null || _this$captchaData3 === void 0 ? void 0 : _this$captchaData3.token,
						onInput: (e) => {
							var _this$captchaData4;
							const token = e.target.value;
							if (this.captchaData) this.captchaData.token = token;
							$$formField.field.api.handleChange({
								id: (_this$captchaData4 = this.captchaData) === null || _this$captchaData4 === void 0 ? void 0 : _this$captchaData4.id,
								token
							});
						}
					}), null);
				}
			}), null), createVNode("label", {
				"class": "flex items-center gap-2 w-full",
				"style": { height: "50px" }
			}, [createVNode(ClientOnly, null, { default: () => {
				var _this$captchaData5;
				return [((_this$captchaData5 = this.captchaData) === null || _this$captchaData5 === void 0 ? void 0 : _this$captchaData5.payload) && createVNode("img", {
					"class": "cursor-pointer",
					"src": this.captchaData.payload,
					"onClick": () => {
						this.refreshCaptchaData();
					}
				}, null)];
			} })])]);
		}
	}, _ControllerFormFieldCaptcha.$propsDefault = {}, _ControllerFormFieldCaptcha.$componentOptions = { inheritAttrs: false }, _ControllerFormFieldCaptcha), _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$v", [_dec3$2, _dec4$2], {
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
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-form/src/.metadata/component/formFieldCaptcha.ts
var ZFormFieldCaptcha;
var init_formFieldCaptcha = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller();
	ZFormFieldCaptcha = defineComponent((_props) => {
		useController(ControllerFormFieldCaptcha, void 0, void 0);
		return () => {};
	}, prepareComponentOptions(ControllerFormFieldCaptcha.$componentOptions));
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-form/src/bean/behavior.formField.ts
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
var _dec$2, _dec2$2, _dec3$1, _dec4$1, _class$2, _class2$1, _descriptor$1, BehaviorFormField;
var init_behavior_formField = __esmMin((() => {
	init_src$1();
	init_src$4();
	BehaviorFormField = (_dec$2 = Behavior(), _dec2$2 = BeanInfo({ module: "basic-form" }), _dec3$1 = Use({ injectionScope: "host" }), _dec4$1 = Reflect.metadata("design:type", typeof ControllerFormField === "undefined" ? Object : ControllerFormField), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2$1 = class BehaviorFormField extends BeanBehaviorBase {
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
			if (renderContext.propsBucket.renderProvider === "input") this._patchProps_input(formMeta, field, renderContext);
		}
		_patchProps_general(formMeta, _field, renderContext) {
			const propsPatch = { value: renderContext.propsBucket.displayValue };
			if ((formMeta === null || formMeta === void 0 ? void 0 : formMeta.formMode) === "view") propsPatch.readonly = true;
			return propsPatch;
		}
		_patchProps_input(formMeta, field, renderContext) {
			var _propsBucket$onChange, _propsBucket$onInput, _propsBucket$onBlur;
			const { propsBucket } = renderContext;
			const renderFlattern = propsBucket.renderFlattern;
			const propsGeneral = this._patchProps_general(formMeta, field, renderContext);
			const inputType = this.$$formField.normalizeInputType(renderFlattern, propsBucket.inputType);
			const onSetDisplayValueDefault = (e) => {
				this.$$formField.setDisplayValue(e.target.value);
			};
			const propsPatch = {
				type: inputType,
				onChange: propsBucket.onChange !== void 0 ? (_propsBucket$onChange = propsBucket.onChange) !== null && _propsBucket$onChange !== void 0 ? _propsBucket$onChange : void 0 : propsBucket.displayValueUpdateTiming === "change" ? onSetDisplayValueDefault : void 0,
				onInput: propsBucket.onInput !== void 0 ? (_propsBucket$onInput = propsBucket.onInput) !== null && _propsBucket$onInput !== void 0 ? _propsBucket$onInput : void 0 : propsBucket.displayValueUpdateTiming !== "change" ? onSetDisplayValueDefault : void 0,
				onBlur: propsBucket.onBlur !== void 0 ? (_propsBucket$onBlur = propsBucket.onBlur) !== null && _propsBucket$onBlur !== void 0 ? _propsBucket$onBlur : void 0 : (_e) => {
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
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-form/src/bean/behavior.formFieldLayout.tsx
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
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor, BehaviorFormFieldLayout;
var init_behavior_formFieldLayout = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_lib_es2015();
	init_src$3();
	init_src$4();
	BehaviorFormFieldLayout = (_dec$1 = Behavior(), _dec2$1 = BeanInfo({ module: "basic-form" }), _dec3 = Use({ injectionScope: "host" }), _dec4 = Reflect.metadata("design:type", typeof ControllerFormField === "undefined" ? Object : ControllerFormField), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class BehaviorFormFieldLayout extends BeanBehaviorBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty(this, "$$formField", _descriptor, this);
		}
		render(renderContext, next) {
			const field = this.$$formField.field;
			this._patchProps(renderContext);
			const vnode = next(renderContext);
			const error = field.state.meta.errors[0];
			if (renderContext.propsBucket.inline) return this._renderInline(renderContext, vnode, field, error);
			return this._renderBlock(renderContext, vnode, field, error);
		}
		_renderInline(renderContext, vnode, field, error) {
			const bordered = renderContext.propsBucket.bordered;
			const label = renderContext.propsBucket.label;
			const className = classes("input", renderContext.propsBucket.classContainer, bordered && "input-bordered", !field.state.meta.isValid && "input-error");
			return createVNode("label", { "class": className }, [
				label,
				vnode,
				!field.state.meta.isValid && createVNode("div", { "class": "label" }, [createVNode("span", { "class": "label-text-alt text-error" }, [error === null || error === void 0 ? void 0 : error.message])])
			]);
		}
		_renderBlock(renderContext, vnode, field, error) {
			const label = renderContext.propsBucket.label;
			const className = classes("fieldset", renderContext.propsBucket.classContainer);
			return createVNode("fieldset", { "class": className }, [
				!!label && createVNode("legend", { "class": "fieldset-legend" }, [label]),
				invokeProp(renderContext.propsBucket.header),
				vnode,
				!field.state.meta.isValid && createVNode("div", { "class": "label" }, [createVNode("span", { "class": "label-text-alt text-error" }, [error === null || error === void 0 ? void 0 : error.message])]),
				invokeProp(renderContext.propsBucket.footer)
			]);
		}
		_patchProps(renderContext) {
			const field = this.$$formField.field;
			if (renderContext.propsBucket.renderProvider === "input") this._patchProps_input(field, renderContext);
		}
		_patchProps_input(field, renderContext) {
			if (!renderContext.propsBucket.inline) renderContext.props.class = classes(renderContext.props.class, "input", this.$options.bordered && "input-bordered", !field.state.meta.isValid && "input-error");
		}
	}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$formField", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-form/src/.metadata/index.ts
/** behaviors: end */
/** locale: begin */
/** locale: end */
/** scope: begin */
function locale(key) {
	return `basic-form::${key}`;
}
var _dec, _dec2, _class, components, ScopeModuleBasicForm;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller();
	init_formFieldCaptcha();
	init_formFieldCaptcha();
	init_behavior_formField();
	init_behavior_formFieldLayout();
	init_src$4();
	init_vue_runtime_esm_bundler();
	init_jsx_runtime();
	init_src$2();
	components = { "formFieldCaptcha": ZFormFieldCaptcha };
	ScopeModuleBasicForm = (_dec = Scope(), _dec2 = BeanInfo({ module: "basic-form" }), _dec(_class = _dec2(_class = class ScopeModuleBasicForm extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/cabloy-basic/modules/basic-form/src/config/locale/en-us.ts
var en_us_default;
var init_en_us = __esmMin((() => {
	en_us_default = { InputCaptcha: "Please input captcha" };
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-form/src/config/locale/zh-cn.ts
var zh_cn_default;
var init_zh_cn = __esmMin((() => {
	zh_cn_default = { InputCaptcha: "请输入验证码" };
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-form/src/.metadata/locales.ts
function $useLocale(key, ...args) {
	const app = useApp();
	const str = `basic-form::${key}`;
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
//#region src/suite/cabloy-basic/modules/basic-form/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_locales();
}));
//#endregion
export { components as a, BehaviorFormField as c, ScopeModuleBasicForm as i, ZFormFieldCaptcha as l, $useLocale as n, locale as o, locales as r, BehaviorFormFieldLayout as s, init_src as t, ControllerFormFieldCaptcha as u };
