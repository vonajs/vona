import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
//#region \0vite/preload-helper.js
var scriptRel, assetsURL, seen, __vitePreload;
var init_preload_helper = __esmMin((() => {
	scriptRel = /* @__PURE__ */ (function detectScriptRel() {
		const relList = typeof document !== "undefined" && document.createElement("link").relList;
		return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
	})();
	assetsURL = function(dep) {
		return "/" + dep;
	};
	seen = {};
	__vitePreload = function preload(baseModule, deps, importerUrl) {
		let promise = Promise.resolve();
		if (deps && deps.length > 0) {
			const links = document.getElementsByTagName("link");
			const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
			const cspNonce = (cspNonceMeta === null || cspNonceMeta === void 0 ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta === null || cspNonceMeta === void 0 ? void 0 : cspNonceMeta.getAttribute("nonce"));
			function allSettled(promises) {
				return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
					status: "fulfilled",
					value
				}), (reason) => ({
					status: "rejected",
					reason
				}))));
			}
			promise = allSettled(deps.map((dep) => {
				dep = assetsURL(dep, importerUrl);
				if (dep in seen) return;
				seen[dep] = true;
				const isCss = dep.endsWith(".css");
				const cssSelector = isCss ? "[rel=\"stylesheet\"]" : "";
				if (!!importerUrl) for (let i = links.length - 1; i >= 0; i--) {
					const link = links[i];
					if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
				}
				else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
				const link = document.createElement("link");
				link.rel = isCss ? "stylesheet" : scriptRel;
				if (!isCss) link.as = "script";
				link.crossOrigin = "";
				link.href = dep;
				if (cspNonce) link.setAttribute("nonce", cspNonce);
				document.head.appendChild(link);
				if (isCss) return new Promise((res, rej) => {
					link.addEventListener("load", res);
					link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
				});
			}));
		}
		function handlePreloadError(err) {
			const e = new Event("vite:preloadError", { cancelable: true });
			e.payload = err;
			window.dispatchEvent(e);
			if (!e.defaultPrevented) throw err;
		}
		return promise.then((res) => {
			for (const item of res || []) {
				if (item.status !== "rejected") continue;
				handlePreloadError(item.reason);
			}
			return baseModule().catch(handlePreloadError);
		});
	};
}));
//#endregion
export { init_preload_helper as n, __vitePreload as t };
