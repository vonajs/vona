import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { c as createTextVNode, l as createVNode, v as mergeProps } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler, t as init_jsx_runtime } from "./vue-C_EuNVEw.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { Y as useComputed, _ as BeanRenderBase, c as createZovaComponentPage, h as BeanScopeBase, k as BeanInfo, m as createZovaComponentAsync, s as useApp, v as BeanControllerPageBase, w as Use } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { _ as Render, h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
import { r as $QueryAutoLoad, t as init_src$3 } from "./a-model-B9Gmxi-X.js";
import { a as Behavior, d as BeanBehaviorBase, t as init_src$4 } from "./a-behavior-DMpiB_3-.js";
//#region src/suite/a-home/modules/home-login/src/page/login/controller.tsx
var _dec$3, _dec2$3, _class$3, ControllerPageLogin;
var init_controller = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	init_src$3();
	ControllerPageLogin = (_dec$3 = Controller(), _dec2$3 = BeanInfo({ module: "home-login" }), _dec$3(_class$3 = _dec2$3(_class$3 = class ControllerPageLogin extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			this.user = {
				username: "",
				password: "",
				captcha: {
					id: "",
					token: ""
				}
			};
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				yield $QueryAutoLoad(() => _this.$passport.apiSchemasLogin.sdk);
			})();
		}
		get schema() {
			return this.$passport.schemaLogin;
		}
		onSubmitLogin(data) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				yield _this2.$passport.login().mutateAsync(data.value);
			})();
		}
		onSubmitLoginGitHub() {
			var _this3 = this;
			return _asyncToGenerator(function* () {
				const apiUrl = _this3.$passport.getOauthLoginUrl("auth-github", "github", "default");
				window.location.assign(apiUrl);
			})();
		}
	}) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite/a-home/modules/home-login/src/page/login/render.tsx
var _dec$2, _dec2$2, _class$2, ZIcon$1, ZFormSubscribe, ZFormFieldWrapper, ZFormField, ZForm, RenderPageLogin;
var init_render = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	ZIcon$1 = createZovaComponentAsync("a-icon", "icon");
	ZFormSubscribe = createZovaComponentAsync("a-form", "formSubscribe");
	ZFormFieldWrapper = createZovaComponentAsync("a-form", "formFieldWrapper");
	ZFormField = createZovaComponentAsync("a-form", "formField");
	ZForm = createZovaComponentAsync("a-form", "form");
	RenderPageLogin = (_dec$2 = Render(), _dec2$2 = BeanInfo({ module: "home-login" }), _dec$2(_class$2 = _dec2$2(_class$2 = class RenderPageLogin extends BeanRenderBase {
		render() {
			return createVNode("div", { "class": "min-h-screen bg-base-200 flex items-center" }, [createVNode("div", { "class": "card mx-auto w-full max-w-5xl  shadow-xl" }, [createVNode("div", { "class": "grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl" }, [this._renderLandingInfo(), createVNode("div", { "class": "py-24 px-10" }, [createVNode("h2", { "class": "text-2xl font-semibold mb-2 text-center" }, [this.scope.locale.Login()]), createVNode("div", { "class": "mb-4" }, [
				this._renderForm(),
				createVNode("div", { "class": "divider" }, [createTextVNode("OR")]),
				this._renderGithub()
			])])])])]);
		}
		_renderLandingInfo() {
			return createVNode("div", { "class": "min-h-full rounded-l-xl bg-base-200" }, [createVNode("div", { "class": "py-12" }, [createVNode("h1", { "class": "text-3xl text-center font-bold" }, [createTextVNode("Zova")]), createVNode("h5", { "class": "text-2xl text-center opacity-40" }, [createTextVNode("Less is more, while more is less")])])]);
		}
		_renderForm() {
			return createVNode(ZForm, {
				"data": this.user,
				"schema": this.schema,
				"formProvider": { behaviors: { formFieldLayout: "home-login:formFieldLayoutLogin" } },
				"onSubmitData": (data) => {
					return this.onSubmitLogin(data);
				},
				"onShowError": ({ error }) => {
					window.alert(error.message);
				}
			}, { default: () => [
				createVNode(ZFormField, {
					"name": "username",
					"iconPrefix": ":daisy:person",
					"slotDefault": ({ props }) => {
						return createVNode("input", mergeProps(props, {
							"type": "text",
							"class": "grow",
							"placeholder": this.scope.locale.YourUsername()
						}), null);
					}
				}, null),
				createVNode(ZFormField, {
					"name": "password",
					"class": "grow",
					"inputType": "password",
					"iconPrefix": ":daisy:lock"
				}, null),
				createVNode(ZFormFieldWrapper, { "name": "captcha" }, null),
				createVNode(ZFormSubscribe, { "slotDefault": ($$form) => {
					return createVNode("button", {
						"disabled": $$form.formState.isSubmitting,
						"type": "submit",
						"class": "btn mt-2 w-full btn-primary"
					}, [this.scope.locale.Login()]);
				} }, null)
			] });
		}
		_renderGithub() {
			return createVNode("button", {
				"class": "btn mt-2 w-full btn-default",
				"onClick": () => {
					this.onSubmitLoginGitHub();
				}
			}, [createVNode(ZIcon$1, { "name": ":auth:github" }, null), this.scope.locale.LoginGitHub()]);
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite/a-home/modules/home-login/src/.metadata/page/login.ts
var ZPageLogin;
var init_login = __esmMin((() => {
	init_src$1();
	init_controller();
	init_render();
	ZPageLogin = createZovaComponentPage(ControllerPageLogin, RenderPageLogin, void 0);
}));
//#endregion
//#region src/suite/a-home/modules/home-login/src/routes.ts
var routes;
var init_routes = __esmMin((() => {
	init_login();
	routes = [{
		path: "",
		component: ZPageLogin,
		meta: {
			layout: "empty",
			requiresAuth: false
		}
	}];
}));
//#endregion
//#region src/suite/a-home/modules/home-login/src/bean/behavior.formFieldLayoutLogin.tsx
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
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor, ZIcon, BehaviorFormFieldLayoutLogin;
var init_behavior_formFieldLayoutLogin = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$4();
	ZIcon = createZovaComponentAsync("a-icon", "icon");
	BehaviorFormFieldLayoutLogin = (_dec$1 = Behavior(), _dec2$1 = BeanInfo({ module: "home-login" }), _dec3 = Use({ injectionScope: "host" }), _dec4 = Reflect.metadata("design:type", typeof ControllerFormField === "undefined" ? Object : ControllerFormField), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class BehaviorFormFieldLayoutLogin extends BeanBehaviorBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty(this, "$$formField", _descriptor, this);
		}
		render(renderContext, next) {
			const field = this.$$formField.field;
			this._patchProps(renderContext);
			const vnode = next(renderContext);
			const iconPrefix = renderContext.propsBucket.iconPrefix;
			const error = field.state.meta.errors[0];
			return createVNode("label", { "class": "input input-bordered flex items-center gap-2 w-full" }, [
				createVNode(ZIcon, {
					"class": "opacity-70",
					"name": iconPrefix,
					"width": 16
				}, null),
				vnode,
				!field.state.meta.isValid && createVNode("div", { "class": "label" }, [createVNode("span", { "class": "label-text-alt text-error" }, [error === null || error === void 0 ? void 0 : error.message])])
			]);
		}
		_patchProps(renderContext) {
			const field = this.$$formField.field;
			if (renderContext.propsBucket.renderProvider === "input") this._patchProps_input(field, renderContext);
		}
		_patchProps_input(_field, _renderContext) {}
	}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$formField", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/a-home/modules/home-login/src/.metadata/index.ts
/** behaviors: end */
/** locale: begin */
/** locale: end */
/** scope: begin */
function locale(key) {
	return `home-login::${key}`;
}
var _dec, _dec2, _class, pagePathSchemas, pageNameSchemas, ScopeModuleHomeLogin;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller();
	init_login();
	init_routes();
	init_render();
	init_behavior_formFieldLayoutLogin();
	init_src$4();
	init_vue_runtime_esm_bundler();
	init_jsx_runtime();
	init_src$2();
	pagePathSchemas = {};
	pageNameSchemas = {};
	ScopeModuleHomeLogin = (_dec = Scope(), _dec2 = BeanInfo({ module: "home-login" }), _dec(_class = _dec2(_class = class ScopeModuleHomeLogin extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/a-home/modules/home-login/src/config/locale/en-us.ts
var en_us_default;
var init_en_us = __esmMin((() => {
	en_us_default = {
		YourUsername: "Your Username",
		YourPassword: "Your Password",
		Login: "Login",
		LoginGitHub: "Sign in with GitHub"
	};
}));
//#endregion
//#region src/suite/a-home/modules/home-login/src/config/locale/zh-cn.ts
var zh_cn_default;
var init_zh_cn = __esmMin((() => {
	zh_cn_default = {
		YourUsername: "您的用户名",
		YourPassword: "您的密码",
		Login: "登录",
		LoginGitHub: "使用GitHub登录"
	};
}));
//#endregion
//#region src/suite/a-home/modules/home-login/src/.metadata/locales.ts
function $useLocale(key, ...args) {
	const app = useApp();
	const str = `home-login::${key}`;
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
//#region src/suite/a-home/modules/home-login/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_locales();
}));
//#endregion
export { locale as a, BehaviorFormFieldLayoutLogin as c, RenderPageLogin as d, ControllerPageLogin as f, ScopeModuleHomeLogin as i, routes as l, $useLocale as n, pageNameSchemas as o, locales as r, pagePathSchemas as s, init_src as t, ZPageLogin as u };
