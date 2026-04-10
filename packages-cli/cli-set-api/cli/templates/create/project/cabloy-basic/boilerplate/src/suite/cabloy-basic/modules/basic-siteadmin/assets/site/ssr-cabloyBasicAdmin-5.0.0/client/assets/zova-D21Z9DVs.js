import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { J as defineBoot, Y as init_wrappers } from "./zova-C8-MPvXl.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { f as bootstrap } from "./zova-BXlOOlVL.js";
import { t as init_src } from "./zova-BJ0Q7wHc.js";
import { n as init_utils, t as getPluginZovaOptions } from "./utils-B36aiUmq.js";
//#region src/boot/zova.ts
var zova_default;
//#endregion
__esmMin((() => {
	init_wrappers();
	init_src();
	init_utils();
	init_asyncToGenerator();
	zova_default = defineBoot(function() {
		var _ref = _asyncToGenerator(function* ({ app }) {
			yield bootstrap(app, getPluginZovaOptions());
		});
		return function(_x) {
			return _ref.apply(this, arguments);
		};
	}());
}))();
export { zova_default as default };
