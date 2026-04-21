import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
//#region \0@oxc-project+runtime@0.124.0/helpers/objectDestructuringEmpty.js
function _objectDestructuringEmpty(t) {
	if (null == t) throw new TypeError("Cannot destructure " + t);
}
var init_objectDestructuringEmpty = __esmMin((() => {}));
//#endregion
//#region \0@oxc-project+runtime@0.124.0/helpers/extends.js
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
var init_extends = __esmMin((() => {}));
//#endregion
export { init_objectDestructuringEmpty as i, init_extends as n, _objectDestructuringEmpty as r, _extends as t };
