import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
//#region node_modules/.pnpm/vue-demi@0.14.10_vue@3.5.30_typescript@5.9.3_/node_modules/vue-demi/lib/index.mjs
function set(target, key, val) {
	if (Array.isArray(target)) {
		target.length = Math.max(target.length, key);
		target.splice(key, 1, val);
		return val;
	}
	target[key] = val;
	return val;
}
var init_lib = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_vue_runtime_esm_bundler();
}));
//#endregion
export { set as n, init_lib as t };
