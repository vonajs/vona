const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/zova-D21Z9DVs.js","assets/fecha-5qJk_cbF.js","assets/rolldown-runtime-CSj9S6Td.js","assets/vue-BuTKVo3e.js","assets/vue-BeTi6w4D.js","assets/vue-C_EuNVEw.js","assets/vue-CsFxPVDb.js","assets/vue-DeT-l8pH.js","assets/utils-B36aiUmq.js","assets/preload-helper-DKAaKYKB.js","assets/-zova-config-cjtUNAK4.js","assets/zova-CLxwEO8x.js","assets/zova-C8-MPvXl.js","assets/zod-Xas5f9JK.js","assets/zod-DXuNtoi4.js","assets/zova-C-HYGWWK.js","assets/zova-BXlOOlVL.js","assets/zova-C2nh6Sr2.js","assets/zova-BJ0Q7wHc.js"])))=>i.map(i=>d[i]);
import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { f as getCurrentInstance, l as createVNode } from "./vue-DeT-l8pH.js";
import { n as createSSRApp } from "./vue-CsFxPVDb.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
import { J as defineBoot, Y as init_wrappers } from "./zova-C8-MPvXl.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { c as createZovaComponentPage, i as PluginZova, v as BeanControllerPageBase } from "./zova-BXlOOlVL.js";
import { t as init_src } from "./zova-BJ0Q7wHc.js";
import { n as init_utils, t as getPluginZovaOptions } from "./utils-B36aiUmq.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-DKAaKYKB.js";
//#region src/css/tailwind.css
var init_tailwind = __esmMin((() => {}));
//#endregion
//#region src/css/settings.scss
var init_settings = __esmMin((() => {}));
//#endregion
//#region src/boot/main.ts
var main_default;
var init_main = __esmMin((() => {
	init_wrappers();
	init_tailwind();
	init_settings();
	main_default = defineBoot(({ app: _app, ssrContext: _ssrContext }) => {});
}));
//#endregion
//#region .zova/app/controller.tsx
var ControllerPageApp;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src();
	init_utils();
	init_asyncToGenerator();
	ControllerPageApp = class extends BeanControllerPageBase {
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				const app = getCurrentInstance().appContext.app;
				if (!app.zova) yield _this.initApp(app);
				else yield _this.updateApp(app.zova);
			})();
		}
		render() {
			return createVNode(this.$zovaComponent(this.sys.config.layout.app.component), null, null);
		}
		initApp(app) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				const appZova = yield PluginZova.install(app, _this2.ctx, getPluginZovaOptions());
				yield appZova.meta.module._monkeyModule(true, "beanInit", void 0, appZova.bean, _this2);
			})();
		}
		updateApp(app) {
			var _this3 = this;
			return _asyncToGenerator(function* () {
				yield PluginZova.update(app, _this3.ctx);
			})();
		}
	};
}));
//#endregion
//#region src/boot/app/index.ts
var app_default$1;
var init_app$1 = __esmMin((() => {
	init_src();
	init_controller();
	app_default$1 = createZovaComponentPage(ControllerPageApp);
}));
//#endregion
//#region .quasar/prod-ssr/app.js
function app_default(_x, _x2) {
	return _ref.apply(this, arguments);
}
function _ref() {
	_ref = _asyncToGenerator(function* (createAppFn, ssrContext) {
		const app = createAppFn(app_default$1);
		main_default({
			app,
			ssrContext
		});
		return { app };
	});
	return _ref.apply(this, arguments);
}
var init_app = __esmMin((() => {
	init_main();
	init_vue_runtime_esm_bundler();
	init_app$1();
	init_asyncToGenerator();
}));
//#endregion
//#region .quasar/prod-ssr/client-entry.js
function start(_x, _x2) {
	return _start.apply(this, arguments);
}
function _start() {
	_start = _asyncToGenerator(function* ({ app }, bootFiles) {
		for (let i = 0; i < bootFiles.length; i++) yield bootFiles[i]({ app });
		app.mount("#q-app");
	});
	return _start.apply(this, arguments);
}
function initApp() {
	return _initApp.apply(this, arguments);
}
function _initApp() {
	_initApp = _asyncToGenerator(function* () {
		return app_default(createSSRApp).then((app) => {
			const [method, mapFn] = Promise.allSettled !== void 0 ? ["allSettled", (bootFiles) => bootFiles.map((result) => {
				if (result.status === "rejected") {
					console.error("[Quasar] boot error:", result.reason);
					return;
				}
				return result.value.default;
			})] : ["all", (bootFiles) => bootFiles.map((entry) => entry.default)];
			return Promise[method]([__vitePreload(() => import("./zova-D21Z9DVs.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]))]).then((bootFiles) => {
				return start(app, mapFn(bootFiles).filter((entry) => typeof entry === "function"));
			});
		});
	});
	return _initApp.apply(this, arguments);
}
var init_client_entry = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_app();
	init_asyncToGenerator();
	init_preload_helper();
	initApp();
}));
//#endregion
__esmMin((() => {
	init_client_entry();
}))();
