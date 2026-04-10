import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { c as createTextVNode, d as defineComponent, l as createVNode } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
import { E as catchError, z as init_dist } from "./zova-C8-MPvXl.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { K as BeanSimple, M as BeanBase, Y as useComputed, b as BeanControllerBase, c as createZovaComponentPage, h as BeanScopeBase, k as BeanInfo, l as prepareComponentOptions, s as useApp, u as useController, v as BeanControllerPageBase, w as Use } from "./zova-BXlOOlVL.js";
import { l as zh_CN_default, o as object, s as string, u as en_default } from "./zod-DXuNtoi4.js";
import { t as init_zod } from "./zod-Xas5f9JK.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { h as Controller, o as Scope, t as init_src$2, v as Service } from "./a-bean-BQjv0q8B.js";
import { i as init_lib_es2015, o as classes } from "./typestyle-CuQyLMpN.js";
import { o as init_vue_router, t as RouterLink } from "./vue-router-DF8M1khH.js";
import { p as BeanRouterGuardsBase, t as init_src$3 } from "./a-router-CO8JSvE3.js";
import { a as Theme, i as Css, n as BeanThemeBase, t as init_src$4 } from "./a-style-QMiOt_mj.js";
import { t as init_locales$1 } from "./zod-BtwPnRup.js";
//#region src/suite/a-home/modules/home-base/src/service/routerGuards.ts
var _dec$8, _dec2$8, _class$8, ServiceRouterGuards;
var init_routerGuards = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_dist();
	init_src$2();
	init_src$3();
	ServiceRouterGuards = (_dec$8 = Service(), _dec2$8 = BeanInfo({ module: "home-base" }), _dec$8(_class$8 = _dec2$8(_class$8 = class ServiceRouterGuards extends BeanRouterGuardsBase {
		onRouterGuards(router) {
			var _this = this;
			router.beforeEach(function() {
				var _ref = _asyncToGenerator(function* (to) {
					if (to.meta.requiresAuth !== false && !_this.$passport.isAuthenticated) {
						const [_res, err] = yield catchError(() => {
							return _this.$passport.ensurePassport();
						});
						if (err) {
							_this.$errorHandler(err, "onRouterGuards");
							return false;
						}
						if (!_this.$passport.isAuthenticated) {
							_this.app.$gotoLogin(to.fullPath);
							return false;
						}
					}
				});
				return function(_x) {
					return _ref.apply(this, arguments);
				};
			}());
		}
	}) || _class$8) || _class$8);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/service/ssr.ts
var _dec$7, _dec2$7, _class$7, ErrorMessageJwtExpired, ServiceSsr;
var init_ssr = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ErrorMessageJwtExpired = "jwt expired";
	ServiceSsr = (_dec$7 = Service(), _dec2$7 = BeanInfo({ module: "home-base" }), _dec$7(_class$7 = _dec2$7(_class$7 = class ServiceSsr extends BeanBase {
		initialize() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.ctx.meta.$ssr.onHydrated(() => {});
			})();
		}
		_ssrErrorHandler() {}
	}) || _class$7) || _class$7);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/component/page/controller.tsx
var _dec$6, _dec2$6, _class$6, _ControllerPage, ControllerPage;
var init_controller$3 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerPage = (_dec$6 = Controller(), _dec2$6 = BeanInfo({ module: "home-base" }), _dec$6(_class$6 = _dec2$6(_class$6 = (_ControllerPage = class ControllerPage extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			this.cPage = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.cPage = _this.$style({ padding: "16px" });
			})();
		}
		render() {
			var _this$$slotDefault;
			return createVNode("div", { "class": this.cPage }, [(_this$$slotDefault = this.$slotDefault) === null || _this$$slotDefault === void 0 ? void 0 : _this$$slotDefault.call(this)]);
		}
	}, _ControllerPage.$propsDefault = {}, _ControllerPage)) || _class$6) || _class$6);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/page/authCallback/controller.tsx
var _dec$5, _dec2$5, _class$5, ControllerPageAuthCallbackSchemaQuery, ControllerPageAuthCallback;
var init_controller$2 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_zod();
	init_src$2();
	ControllerPageAuthCallbackSchemaQuery = object({
		"returnTo": string().optional(),
		"x-vona-oauth-code": string().optional()
	});
	ControllerPageAuthCallback = (_dec$5 = Controller(), _dec2$5 = BeanInfo({ module: "home-base" }), _dec$5(_class$5 = _dec2$5(_class$5 = class ControllerPageAuthCallback extends BeanControllerPageBase {
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this._handleAuth();
			})();
		}
		_handleAuth() {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				const code = _this2.$query["x-vona-oauth-code"];
				yield _this2.$passport.loginByOauthCode().mutateAsync({ code });
			})();
		}
		render() {
			return null;
		}
	}) || _class$5) || _class$5);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/page/errorExpired/controller.tsx
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
var _dec$4, _dec2$4, _dec3, _dec4, _class$4, _class2, _descriptor, ControllerPageErrorExpiredSchemaQuery, ControllerPageErrorExpired;
var init_controller$1 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_zod();
	init_src$2();
	ControllerPageErrorExpiredSchemaQuery = object({ returnTo: string().optional() });
	ControllerPageErrorExpired = (_dec$4 = Controller(), _dec2$4 = BeanInfo({ module: "home-base" }), _dec3 = Use("home-api.service.jwtAdapter"), _dec4 = Reflect.metadata("design:type", typeof ServiceJwtAdapter === "undefined" ? Object : ServiceJwtAdapter), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2 = class ControllerPageErrorExpired extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty(this, "$$jwtAdapter", _descriptor, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this._refreshToken();
			})();
		}
		_refreshToken() {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				const returnTo = _this2.$query.returnTo;
				const jwtInfo = yield _this2.$$jwtAdapter.getJwtInfo();
				const refreshToken = jwtInfo === null || jwtInfo === void 0 ? void 0 : jwtInfo.refreshToken;
				if (!refreshToken) {
					_this2.app.$gotoPage(_this2.sys.env.ROUTER_PAGE_LOGIN, {
						returnTo,
						replace: true
					});
					return;
				}
				yield _this2.$$jwtAdapter.refreshAuthToken(refreshToken);
				_this2.app.$gotoReturnTo(returnTo);
			})();
		}
		render() {
			return null;
		}
	}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$jwtAdapter", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$4) || _class$4);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/page/errorNotFound/controller.tsx
var _dec$3, _dec2$3, _class$3, ControllerPageErrorNotFound;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_vue_router();
	init_lib_es2015();
	init_src$2();
	ControllerPageErrorNotFound = (_dec$3 = Controller(), _dec2$3 = BeanInfo({ module: "home-base" }), _dec$3(_class$3 = _dec2$3(_class$3 = class ControllerPageErrorNotFound extends BeanControllerPageBase {
		constructor(...args) {
			super(...args);
			this.cTitle = void 0;
			this.cDescription = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.cTitle = _this.$style({ fontSize: "30vh" });
				_this.cDescription = classes("text-3xl", _this.$style({ opacity: "0.4" }));
			})();
		}
		render() {
			return createVNode("div", { "class": "text-center" }, [createVNode("div", null, [
				createVNode("div", { "class": this.cTitle }, [createTextVNode("404")]),
				createVNode("div", { "class": this.cDescription }, [createTextVNode("Oops. Nothing here...")]),
				createVNode(RouterLink, { "to": this.sys.env.ROUTER_PAGE_HOME }, { default: () => [createTextVNode("Go Home")] })
			])]);
		}
	}) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/page/authCallback.ts
var NSControllerPageAuthCallback, ZPageAuthCallback;
var init_authCallback = __esmMin((() => {
	init_src$1();
	init_controller$2();
	(function(_NSControllerPageAuthCallback) {
		_NSControllerPageAuthCallback.querySchema = ControllerPageAuthCallbackSchemaQuery;
	})(NSControllerPageAuthCallback || (NSControllerPageAuthCallback = {}));
	ZPageAuthCallback = createZovaComponentPage(ControllerPageAuthCallback, void 0, void 0);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/page/errorExpired.ts
var NSControllerPageErrorExpired, ZPageErrorExpired;
var init_errorExpired = __esmMin((() => {
	init_src$1();
	init_controller$1();
	(function(_NSControllerPageErrorExpired) {
		_NSControllerPageErrorExpired.querySchema = ControllerPageErrorExpiredSchemaQuery;
	})(NSControllerPageErrorExpired || (NSControllerPageErrorExpired = {}));
	ZPageErrorExpired = createZovaComponentPage(ControllerPageErrorExpired, void 0, void 0);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/page/errorNotFound.ts
var ZPageErrorNotFound;
var init_errorNotFound = __esmMin((() => {
	init_src$1();
	init_controller();
	ZPageErrorNotFound = createZovaComponentPage(ControllerPageErrorNotFound, void 0, void 0);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/routes.ts
var routes;
var init_routes = __esmMin((() => {
	init_authCallback();
	init_errorExpired();
	init_errorNotFound();
	routes = [
		{
			path: "/:catchAll(.*)*",
			component: ZPageErrorNotFound,
			meta: {
				absolute: true,
				layout: "empty",
				requiresAuth: false
			}
		},
		{
			path: "errorNotFound",
			component: ZPageErrorNotFound,
			meta: {
				layout: "empty",
				requiresAuth: false
			}
		},
		{
			path: "errorExpired",
			component: ZPageErrorExpired,
			meta: {
				layout: "empty",
				requiresAuth: false
			}
		},
		{
			path: "authCallback",
			component: ZPageAuthCallback,
			meta: {
				layout: "empty",
				requiresAuth: false
			}
		}
	];
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/component/page.ts
var ZPage;
var init_page = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$3();
	ZPage = defineComponent((_props) => {
		useController(ControllerPage, void 0, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/bean/css.default.ts
var _dec$2, _dec2$2, _class$2, CssDefault;
var init_css_default = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$4();
	CssDefault = (_dec$2 = Css(), _dec2$2 = BeanInfo({ module: "home-base" }), _dec$2(_class$2 = _dec2$2(_class$2 = class CssDefault extends BeanBase {
		constructor(...args) {
			super(...args);
			this.textCenter = void 0;
			this.buttonPrimary = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.textCenter = _this.$style({ textAlign: "center" });
				_this.buttonPrimary = useComputed(() => {
					return _this.$style({
						color: _this.$token.color.primary,
						borderColor: _this.$token.var.borderColor
					});
				});
			})();
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/bean/theme.default.ts
var _dec$1, _dec2$1, _class$1, ThemeDefault;
var init_theme_default = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$4();
	ThemeDefault = (_dec$1 = Theme(), _dec2$1 = BeanInfo({ module: "home-base" }), _dec$1(_class$1 = _dec2$1(_class$1 = class ThemeDefault extends BeanThemeBase {
		apply({ name, dark }) {
			var _this = this;
			return _asyncToGenerator(function* () {
				const token = {
					color: { primary: "oklch(45% 0.24 277.023)" },
					var: { borderColor: "#297acc" },
					component: { page: {
						background: dark ? "#121212" : "#fff",
						color: dark ? "#fff" : "#000"
					} }
				};
				return { token: _this.mergeOptionsToken({
					name,
					dark
				}, token) };
			})();
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/this.ts
var __ThisModule__;
var init_this = __esmMin((() => {
	init__metadata();
	__ThisModule__ = "home-base";
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/lib/utils.ts
function definePropertyScopeBase(bean, beanInstance) {
	bean.defineProperty(beanInstance, "$scopeBase", {
		enumerable: false,
		configurable: true,
		get() {
			return bean.scope(__ThisModule__);
		}
	});
}
var init_utils = __esmMin((() => {
	init_this();
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/monkey.ts
var Monkey;
var init_monkey = __esmMin((() => {
	init_src$1();
	init_utils();
	init_routerGuards();
	init_ssr();
	init_asyncToGenerator();
	Monkey = class extends BeanSimple {
		constructor(...args) {
			super(...args);
			this.serviceRouterGuards = void 0;
			this.serviceSsr = void 0;
		}
		appInitialize() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.serviceRouterGuards = yield _this.bean._newBean(ServiceRouterGuards, false);
				_this.serviceSsr = yield _this.bean._newBean(ServiceSsr, false);
				yield _this.serviceSsr.initialize();
			})();
		}
		appClose() {
			if (this.serviceRouterGuards) this.serviceRouterGuards.dispose();
		}
		beanInit(bean, beanInstance) {
			return _asyncToGenerator(function* () {
				definePropertyScopeBase(bean, beanInstance);
			})();
		}
	};
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/monkeySys.ts
var MonkeySys;
var init_monkeySys = __esmMin((() => {
	init_src$1();
	init_utils();
	init_asyncToGenerator();
	MonkeySys = class extends BeanSimple {
		beanInit(bean, beanInstance) {
			return _asyncToGenerator(function* () {
				definePropertyScopeBase(bean, beanInstance);
			})();
		}
	};
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/main.ts
var Main;
var init_main = __esmMin((() => {
	init_locales$1();
	init_src$1();
	init_asyncToGenerator();
	Main = class extends BeanSimple {
		moduleLoading() {
			return _asyncToGenerator(function* () {})();
		}
		moduleLoaded() {
			var _this = this;
			return _asyncToGenerator(function* () {
				{
					const localeErrors = {
						"en-us": en_default,
						"zh-cn": zh_CN_default
					};
					_this.app.util.setLocaleErrors(localeErrors, _this.sys.config.locale.default);
				}
			})();
		}
	};
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/index.ts
/** main: end */
/** scope: begin */
function locale(key) {
	return `home-base::${key}`;
}
var _dec, _dec2, _class, pagePathSchemas, pageNameSchemas, components, ScopeModuleHomeBase;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_routerGuards();
	init_ssr();
	init_src$2();
	init_controller$3();
	init_controller$2();
	init_controller$1();
	init_controller();
	init_authCallback();
	init_authCallback();
	init_errorExpired();
	init_errorExpired();
	init_errorNotFound();
	init_routes();
	init_page();
	init_page();
	init_css_default();
	init_src$4();
	init_theme_default();
	init_monkey();
	init_monkeySys();
	init_main();
	pagePathSchemas = {
		"/home/base/authCallback": { query: NSControllerPageAuthCallback.querySchema },
		"/home/base/errorExpired": { query: NSControllerPageErrorExpired.querySchema }
	};
	pageNameSchemas = {};
	components = { "page": ZPage };
	ScopeModuleHomeBase = (_dec = Scope(), _dec2 = BeanInfo({ module: "home-base" }), _dec(_class = _dec2(_class = class ScopeModuleHomeBase extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/a-home/modules/home-base/src/config/locale/en-us.ts
var en_us_default;
var init_en_us = __esmMin((() => {
	en_us_default = { Home: "Home" };
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/config/locale/zh-cn.ts
var zh_cn_default;
var init_zh_cn = __esmMin((() => {
	zh_cn_default = { Home: "主页" };
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/.metadata/locales.ts
function $useLocale(key, ...args) {
	const app = useApp();
	const str = `home-base::${key}`;
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
//#region src/suite/a-home/modules/home-base/src/lib/index.ts
var init_lib = __esmMin((() => {
	init_utils();
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/types/style.ts
var init_style = __esmMin((() => {
	init_src$1();
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/types/themeToken.ts
var init_themeToken = __esmMin((() => {
	init_src$4();
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/types/index.ts
var init_types = __esmMin((() => {
	init_style();
	init_themeToken();
}));
//#endregion
//#region src/suite/a-home/modules/home-base/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_locales();
	init_lib();
	init_types();
}));
//#endregion
export { ServiceRouterGuards as A, ControllerPageErrorExpired as C, ControllerPage as D, ControllerPageAuthCallbackSchemaQuery as E, ErrorMessageJwtExpired as O, ControllerPageErrorNotFound as S, ControllerPageAuthCallback as T, ZPageErrorNotFound as _, components as a, NSControllerPageAuthCallback as b, pagePathSchemas as c, Monkey as d, definePropertyScopeBase as f, routes as g, ZPage as h, ScopeModuleHomeBase as i, ServiceSsr as k, Main as l, CssDefault as m, $useLocale as n, locale as o, ThemeDefault as p, locales as r, pageNameSchemas as s, init_src as t, MonkeySys as u, NSControllerPageErrorExpired as v, ControllerPageErrorExpiredSchemaQuery as w, ZPageAuthCallback as x, ZPageErrorExpired as y };
