import { a as __toESM, n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { c as require_object_hash, d as _objectSpread2, f as init_objectSpread2, i as init_objectWithoutProperties, k as require_dist, l as init_lib, m as init_asyncToGenerator, p as _asyncToGenerator, r as _objectWithoutProperties, u as Environment } from "./fecha-5qJk_cbF.js";
import { r as replaceTemplate, t as init_src } from "./zova-C-HYGWWK.js";
import { d as setParseAdapter$1, f as setLocaleAdapter$1, p as config } from "./zod-DXuNtoi4.js";
import { t as init_zod } from "./zod-Xas5f9JK.js";
//#region node_modules/.pnpm/@cabloy+quasar-app-vite@2.5.9_@cabloy+vue-router@4.4.16_vue@3.5.30_typescript@5.9.3___@_4e0e0ac2339508608c3a0e49734de065/node_modules/@cabloy/quasar-app-vite/exports/wrappers/wrappers.js
var wrapper, defineBoot;
var init_wrappers = __esmMin((() => {
	wrapper = (callback) => callback;
	defineBoot = wrapper;
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json5@1.0.19/node_modules/@cabloy/json5/dist/index.js
function __patchJSON() {
	const __dateTest = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
	function __jsonReviver(k, v, reviver) {
		if (v && typeof v === "string" && __dateTest.test(v)) v = new Date(v);
		if (!reviver) return v;
		return reviver(k, v);
	}
	const _jsonParse = JSON.parse;
	JSON.parse = function(source, reviver) {
		return _jsonParse(source, (k, v) => {
			return __jsonReviver(k, v, reviver);
		});
	};
	const _json5Parse = import_dist.default.parse;
	const parse = function(source, reviver) {
		return _json5Parse(source, (k, v) => {
			return __jsonReviver(k, v, reviver);
		});
	};
	globalThis.JSON5 = {
		parse,
		stringify: import_dist.default.stringify
	};
}
var import_dist;
var init_dist$11 = __esmMin((() => {
	import_dist = /* @__PURE__ */ __toESM(require_dist(), 1);
	__patchJSON();
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+utils@2.0.24/node_modules/@cabloy/utils/dist/index.js
function isEmptyObject(obj) {
	if (!obj) return true;
	return Object.keys(obj).length === 0;
}
function isClass(fn) {
	var _fn$prototype;
	return typeof fn === "function" && !!fn.name && ((_fn$prototype = fn.prototype) === null || _fn$prototype === void 0 ? void 0 : _fn$prototype.constructor) === fn;
}
function isPromise(obj) {
	return obj instanceof Promise || obj && typeof obj.then === "function";
}
function isNilOrEmptyString(str) {
	return str === void 0 || str === null || str === "";
}
function checkMeta(meta, data) {
	if (!meta) return true;
	for (const key in meta) {
		const metaItem = meta[key];
		if (isNil$1(metaItem)) continue;
		if (!Array.isArray(metaItem) && metaItem !== (data === null || data === void 0 ? void 0 : data[key])) return false;
		if (Array.isArray(metaItem) && !metaItem.includes(data === null || data === void 0 ? void 0 : data[key])) return false;
	}
	return true;
}
function catchError(_x) {
	return _catchError.apply(this, arguments);
}
function _catchError() {
	_catchError = _asyncToGenerator(function* (fnMethod) {
		let error;
		let data;
		try {
			data = yield fnMethod();
		} catch (err) {
			error = err;
		}
		return error ? [void 0, error] : [data, void 0];
	});
	return _catchError.apply(this, arguments);
}
function hasProperty(obj, name, sep) {
	return _hasProperty(obj, name, sep);
}
function getProperty$2(obj, name, sep) {
	return _getProperty$2(obj, name, sep, false);
}
function _hasProperty(_obj, name, sep) {
	if (!_obj) return false;
	let obj = _obj;
	const names = name.split(sep || ".");
	for (const _name of names) {
		const [name, index] = _parsePropertyKey(_name);
		if (__keysIgnore.includes(name)) throw new Error(`invalid prop: ${name}`);
		if (obj === void 0 || !Object.hasOwnProperty.call(obj, name)) return false;
		obj = obj[name];
		if (index !== void 0) obj = obj[index];
	}
	return true;
}
function _getProperty$2(_obj, name, sep, forceObject) {
	if (!_obj) return void 0;
	let obj = _obj;
	const names = name.split(sep || ".");
	for (const _name of names) {
		const [name, index] = _parsePropertyKey(_name);
		if (__keysIgnore.includes(name)) throw new Error(`invalid prop: ${name}`);
		if (obj[name] === void 0) if (forceObject) if (index === void 0) obj[name] = {};
		else obj[name] = [];
		else {
			obj = obj[name];
			break;
		}
		obj = obj[name];
		if (index !== void 0) obj = obj[index];
	}
	return obj;
}
function _parsePropertyKey(name) {
	const matched = name.match(/([^[]+)\[(\d+)\]/);
	if (!matched) return [name, void 0];
	return [matched[1], Number.parseInt(matched[2])];
}
function combineParamsAndQuery(path, options) {
	return combineQueries(defaultPathSerializer(path, options === null || options === void 0 ? void 0 : options.params), options === null || options === void 0 ? void 0 : options.query);
}
function combineQueries(pagePath, queries) {
	var _pagePath;
	pagePath = (_pagePath = pagePath) !== null && _pagePath !== void 0 ? _pagePath : "/";
	if (!queries) return pagePath;
	const query2 = [];
	const parts = [];
	if (queries) for (const key in queries) {
		const value = queries[key];
		if (isNil$1(value)) continue;
		if (typeof value === "object") query2.push([key, value]);
		else parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
	}
	for (const [key, value] of query2) parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`);
	if (parts.length === 0) return pagePath;
	const str = parts.join("&");
	const pos = pagePath.indexOf("?");
	if (pos === -1) return `${pagePath}?${str}`;
	if (pos === pagePath.length - 1) return `${pagePath}${str}`;
	return `${pagePath}&${str}`;
}
function defaultPathSerializer(pathName, pathParams) {
	var _pathParams;
	if (!pathName) return void 0;
	pathParams = (_pathParams = pathParams) !== null && _pathParams !== void 0 ? _pathParams : {};
	for (const item of [PATH_PARAM_RE, PATH_PARAM_RE2]) pathName = pathName.replace(item, (_, _part) => {
		if (_part.includes("?")) _part = _part.substring(0, _part.length - 1);
		const value = pathParams === null || pathParams === void 0 ? void 0 : pathParams[_part];
		if (value === void 0 || value === null) return "";
		if (typeof value === "object") return encodeURIComponent(JSON.stringify(value));
		return encodeURIComponent(value);
	});
	return pathName;
}
function forEach(_x3, _x4, _x5) {
	return _forEach.apply(this, arguments);
}
function _forEach() {
	_forEach = _asyncToGenerator(function* (arr, order, fn) {
		if (order) for (let index = 0; index < arr.length; index++) yield fn(arr[index], index);
		else for (let index = arr.length - 1; index >= 0; index--) yield fn(arr[index], index);
	});
	return _forEach.apply(this, arguments);
}
function forEachSync(arr, order, fn) {
	if (order) for (let index = 0; index < arr.length; index++) fn(arr[index], index);
	else for (let index = arr.length - 1; index >= 0; index--) fn(arr[index], index);
}
function _concat(...args) {
	return [].concat(...args);
}
function _join(list, sep) {
	if (!list) return "";
	return list.join(sep);
}
function createFunction(expression, scopeKeys) {
	let fn;
	try {
		const js = `return (${expression})`;
		fn = scopeKeys && scopeKeys.length > 0 ? new Function(scopeKeys.join(","), js) : new Function(js);
	} catch (_err) {
		fn = scopeKeys && scopeKeys.length > 0 ? new Function(scopeKeys.join(","), expression) : new Function(expression);
	}
	return fn;
}
function evaluateSimple(expression, scope) {
	const scopeKeys = scope ? Object.keys(scope) : void 0;
	const scopeValues = scope ? Object.values(scope) : void 0;
	const fn = createFunction(expression, scopeKeys);
	return scopeValues ? fn(...scopeValues) : fn();
}
function evaluateExpressions(expressions, context, celEnv, dry) {
	if (isNil$1(expressions)) return _returnExpressionWithDry(expressions, dry);
	if (Array.isArray(expressions)) return expressions.map((item) => _evaluateExpressionInner(item, context, celEnv, dry));
	else if (typeof expressions === "object") {
		const res = {};
		for (const key in expressions) res[key] = _evaluateExpressionInner(expressions[key], context, celEnv, dry);
		return res;
	}
	return _evaluateExpressionInner(expressions, context, celEnv, dry);
}
function _evaluateExpressionInner(expression, context, celEnv, dry) {
	if (isNil$1(expression)) return _returnExpressionWithDry(expression, dry);
	if (typeof expression === "object") return evaluateExpressions(expression, context, celEnv, dry);
	if (typeof expression !== "string") return _returnExpressionWithDry(expression, dry);
	if (!expression.startsWith("cel://")) return _returnExpressionWithDry(expression, dry);
	return dry ? true : evaluate(expression.substring(6), context, celEnv);
}
function _returnExpressionWithDry(expression, dry) {
	return dry ? false : expression;
}
function evaluate(expression, context, celEnv) {
	if (expression.startsWith("raw://")) return expression.substring(6);
	else if (expression.startsWith("regexp://")) return evaluateSimple(expression.substring(9));
	return (celEnv !== null && celEnv !== void 0 ? celEnv : celEnvBase).evaluate(expression, context);
}
function hashkey(key) {
	if (key === void 0 || key === null) return "";
	if (Array.isArray(key) || typeof key === "object") return (0, import_object_hash.default)(key, { respectType: false });
	if (typeof key !== "string") return String(key);
	return key;
}
function matchSelector(match, selector, matchThis, ...matchArgs) {
	if (!Array.isArray(match)) {
		if (typeof match === "string" && match.startsWith("regexp://")) match = evaluateSimple(match.substring(9));
		return typeof match === "string" && match.startsWith("cel://") && !!evaluateExpressions(match, {
			selector,
			context: matchArgs[0] && typeof matchArgs[0] === "object" ? _objectSpread2({}, matchArgs[0]) : matchArgs[0]
		}) || typeof match === "string" && !match.startsWith("cel://") && typeof selector === "string" && match === selector || match instanceof RegExp && typeof selector === "string" && match.test(selector) || typeof match === "function" && match.call(matchThis, selector, ...matchArgs);
	}
	return match.some((item) => matchSelector(item, selector));
}
function combineResourceNameParts(resourceName, moduleName, simplify, simplifyProviderId) {
	var _simplify, _simplifyProviderId;
	simplify = (_simplify = simplify) !== null && _simplify !== void 0 ? _simplify : true;
	simplifyProviderId = (_simplifyProviderId = simplifyProviderId) !== null && _simplifyProviderId !== void 0 ? _simplifyProviderId : true;
	if (!resourceName) resourceName = "";
	if (typeof moduleName !== "string") moduleName = moduleName.relativeName;
	const parts = moduleName.split("-");
	const res = [];
	if (!simplifyProviderId || parts[0] !== "a") res.push(parts[0]);
	if (!simplify || !resourceName.startsWith(parts[1])) res.push(parts[1]);
	if (resourceName) res.push(resourceName);
	return res;
}
function combineApiPath(path, moduleName, prefix, simplify, globalPrefixConfig) {
	var _simplify2;
	const globalPrefix = typeof prefix === "string" ? prefix : prefix === false ? "" : globalPrefixConfig;
	simplify = (_simplify2 = simplify) !== null && _simplify2 !== void 0 ? _simplify2 : true;
	if (!path) path = "";
	if (path.startsWith("//")) return path.substring(1);
	if (path.startsWith("/")) return `${globalPrefix}${path}`;
	return `${globalPrefix}/${combineResourceNameParts(path, moduleName !== null && moduleName !== void 0 ? moduleName : "", simplify, true).join("/")}`;
}
function combineApiPathControllerAndAction(moduleName, controllerPath, actionPath, prefix, simplify, globalPrefixConfig) {
	if (actionPath === void 0) actionPath = "";
	let routePath;
	if (typeof actionPath !== "string") throw new TypeError("regexp not supported");
	else if (actionPath.startsWith("/")) routePath = combineApiPath(actionPath, moduleName, prefix, simplify, globalPrefixConfig);
	else if (!controllerPath) routePath = combineApiPath(actionPath, moduleName, prefix, simplify, globalPrefixConfig);
	else {
		routePath = combineApiPath(controllerPath, moduleName, prefix, simplify, globalPrefixConfig);
		if (actionPath) routePath = `${routePath}/${actionPath}`;
	}
	return routePath;
}
var import_object_hash, isUndefined$2, isNil$1, __keysIgnore, PATH_PARAM_RE, PATH_PARAM_RE2, celEnvBase, params;
var init_dist$10 = __esmMin((() => {
	init_lib();
	import_object_hash = /* @__PURE__ */ __toESM(require_object_hash(), 1);
	init_asyncToGenerator();
	init_objectSpread2();
	isUndefined$2 = (obj) => typeof obj === "undefined";
	isNil$1 = (val) => isUndefined$2(val) || val === null;
	__keysIgnore = [
		"constructor",
		"prototype",
		"__proto__"
	];
	PATH_PARAM_RE = /\{([^{}/]+)\}/g;
	PATH_PARAM_RE2 = /:([^/]+)/g;
	celEnvBase = new Environment({
		unlistedVariablesAreDyn: true,
		enableOptionalTypes: true,
		homogeneousAggregateLiterals: false
	});
	params = [];
	for (let i = 0; i < 10; i++) {
		params.push("dyn");
		celEnvBase.registerFunction(`concat(${params.join(",")}):list`, _concat);
	}
	celEnvBase.registerFunction("join(list):string", (list) => {
		return _join(list);
	});
	celEnvBase.registerFunction("join(list,string):string", (list, sep) => {
		return _join(list, sep);
	});
	celEnvBase.registerFunction("string(null):string", (value) => {
		return String(value);
	});
	celEnvBase.registerOperator("string + int", (str, n) => str + String(n));
	celEnvBase.registerOperator("int + string", (n, str) => String(n) + str);
	celEnvBase.registerOperator("string + double", (str, n) => str + String(n));
	celEnvBase.registerOperator("double + string", (n, str) => String(n) + str);
	celEnvBase.registerOperator("string + null", (str, _n) => str);
	celEnvBase.registerOperator("null + string", (_n, str) => str);
	celEnvBase.registerOperator("string == null", (str, n) => str === n);
	celEnvBase.registerOperator("int == null", (num, n) => num === n);
	celEnvBase.registerOperator("bool == null", (b, n) => b === n);
	celEnvBase.registerFunction("get(map,string):dyn", (obj, name) => {
		var _getProperty2;
		return (_getProperty2 = getProperty$2(obj, name)) !== null && _getProperty2 !== void 0 ? _getProperty2 : null;
	});
	celEnvBase.registerFunction("get(map,string,string):dyn", (obj, name, sep) => {
		var _getProperty3;
		return (_getProperty3 = getProperty$2(obj, name, sep)) !== null && _getProperty3 !== void 0 ? _getProperty3 : null;
	});
	celEnvBase.registerFunction("get(bool,string):dyn", (_obj, _name) => {
		return null;
	});
	celEnvBase.registerFunction("get(bool,string,string):dyn", (_obj, _name, _sep) => {
		return null;
	});
	celEnvBase.registerFunction("get(null,string):dyn", (_obj, _name) => {
		return null;
	});
	celEnvBase.registerFunction("get(null,string,string):dyn", (_obj, _name, _sep) => {
		return null;
	});
	celEnvBase.registerFunction("exists(null,string):bool", (obj, name) => {
		return hasProperty(obj, name);
	});
	celEnvBase.registerFunction("exists(map,string):bool", (obj, name) => {
		return hasProperty(obj, name);
	});
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+extend@3.1.13/node_modules/@cabloy/extend/dist/index.js
function isArray(arr) {
	if (typeof Array.isArray === "function") return Array.isArray(arr);
	return toStr.call(arr) === "[object Array]";
}
function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== "[object Object]") return false;
	const hasOwnConstructor = hasOwn.call(obj, "constructor");
	const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) return false;
	let key;
	for (key in obj);
	return typeof key === "undefined" || hasOwn.call(obj, key);
}
function setProperty(target, options) {
	if (defineProperty && options.name === "__proto__") defineProperty(target, options.name, {
		enumerable: true,
		configurable: true,
		value: options.newValue,
		writable: true
	});
	else target[options.name] = options.newValue;
}
function getProperty$1(obj, name) {
	if (name === "__proto__") {
		if (!hasOwn.call(obj, name)) return;
		else if (gOPD) return gOPD(obj, name).value;
	}
	return obj[name];
}
function extend(...args) {
	let options, name, src, copy, copyIsArray, clone;
	let target = args[0];
	let i = 1;
	const length = arguments.length;
	let deep = false;
	if (typeof target === "boolean") {
		deep = target;
		target = args[1] || {};
		i = 2;
	}
	if (target == null || typeof target !== "object" && typeof target !== "function") target = {};
	for (; i < length; ++i) {
		options = args[i];
		if (options != null) {
			if (options.$$typeof) {
				target = options;
				continue;
			}
			for (name in options) {
				src = getProperty$1(target, name);
				copy = getProperty$1(options, name);
				if (target !== copy) if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = [];
					} else clone = src && isPlainObject(src) ? src : {};
					setProperty(target, {
						name,
						newValue: extend(deep, clone, copy)
					});
				} else setProperty(target, {
					name,
					newValue: copy
				});
			}
		}
	}
	return target;
}
var hasOwn, toStr, defineProperty, gOPD;
var init_dist$9 = __esmMin((() => {
	hasOwn = Object.prototype.hasOwnProperty;
	toStr = Object.prototype.toString;
	defineProperty = Object.defineProperty;
	gOPD = Object.getOwnPropertyDescriptor;
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+compose@2.0.15/node_modules/@cabloy/compose/dist/index.js
function __adapterDefault(_context, chain) {
	return {
		receiver: void 0,
		fn: chain
	};
}
function compose(chains, adapter) {
	if (!adapter) adapter = __adapterDefault;
	if (!chains) chains = [];
	return function(context, next) {
		let index = -1;
		return dispatch(0, context);
		function dispatch(i, context) {
			if (i <= index) throw new Error("next() called multiple times");
			index = i;
			let receiver;
			let fn;
			const chain = chains[i];
			if (chain) {
				const obj = adapter(context, chain);
				if (!obj) return dispatch(i + 1, context);
				receiver = obj.receiver;
				fn = obj.fn;
				if (!fn) throw new Error("fn is not defined");
			}
			if (i === chains.length) fn = next;
			if (!fn) return context;
			return fn.call(receiver, context, (...args) => {
				context = args.length === 0 ? context : args[0];
				return dispatch(i + 1, context);
			});
		}
	};
}
var init_dist$8 = __esmMin((() => {}));
//#endregion
//#region node_modules/.pnpm/@cabloy+zod-errors-custom@2.0.6/node_modules/@cabloy/zod-errors-custom/dist/index.js
function setLocaleAdapter(localeAdapterFn) {
	setLocaleAdapter$1(localeAdapterFn);
}
function setLocaleErrors(localeCurrentAdapterFn, localeErrors, localeDefault = "en-us") {
	const localeErrorsInstance = {};
	function getLocalErrorInstance(locale) {
		if (!localeErrorsInstance[locale]) localeErrorsInstance[locale] = localeErrors[locale]().localeError;
		return localeErrorsInstance[locale];
	}
	config({ localeError(issue) {
		const localeCurrent = localeCurrentAdapterFn();
		if (localeErrors[localeCurrent]) return getLocalErrorInstance(localeCurrent)(issue);
		if (localeCurrent !== localeDefault && localeErrors[localeDefault]) return getLocalErrorInstance(localeDefault)(issue);
	} });
}
function translateError(localeAdapterFn, key, scope) {
	const content = localeAdapterFn(key);
	const [, args] = _replaceTemplate(content, scope);
	if (args.length === 0) return content;
	let message = localeAdapterFn(key, ...args);
	message = replaceTemplate(message, scope);
	return message;
}
function _replaceTemplate(content, scope) {
	if (!content) return [content, []];
	if (!scope) return [content, []];
	const args = [];
	content = content.toString().replace(/(\\)?\{\{ *([\w.]+) *\}\}/g, (block, skip, key) => {
		if (skip) return block.substring(skip.length);
		let value = getProperty(scope, key);
		value = value !== void 0 ? value : "";
		args.push(value);
		return "%s";
	});
	return [content, args];
}
function getProperty(obj, name, sep) {
	return _getProperty$1(obj, name);
}
function _getProperty$1(obj, name, sep, forceObject) {
	if (!obj) return void 0;
	const names = name.split(".");
	for (const name of names) {
		if (obj[name] === void 0 || obj[name] === null) {
			obj = obj[name];
			break;
		}
		obj = obj[name];
	}
	return obj;
}
var init_dist$7 = __esmMin((() => {
	init_zod();
	init_src();
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+zod-to-openapi@8.1.5_zod@4.3.6/node_modules/@cabloy/zod-to-openapi/dist/index.mjs
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
function isZodType$1(schema, typeNames) {
	return (Array.isArray(typeNames) ? typeNames : [typeNames]).some((typeName) => {
		var _a;
		const typeNameMatch = ((_a = schema === null || schema === void 0 ? void 0 : schema.def) === null || _a === void 0 ? void 0 : _a.type) === ZodTypeKeys$1[typeName];
		if (typeName === "ZodDiscriminatedUnion") return typeNameMatch && "discriminator" in schema.def;
		return typeNameMatch;
	});
}
function isAnyZodType$1(schema) {
	return "def" in schema;
}
function registry() {
	return new $ZodRegistry();
}
function isUndefined$1(value) {
	return value === void 0;
}
function omit$1(object, keys) {
	const result = {};
	Object.entries(object).forEach(([key, value]) => {
		if (!keys.some((keyToOmit) => keyToOmit === key)) result[key] = value;
	});
	return result;
}
function omitBy(object, predicate) {
	const result = {};
	Object.entries(object).forEach(([key, value]) => {
		if (!predicate(value, key)) result[key] = value;
	});
	return result;
}
var ZodTypeKeys$1, $ZodRegistry, zodToOpenAPIRegistry, Metadata$1;
var init_dist$6 = __esmMin((() => {
	init_objectSpread2();
	ZodTypeKeys$1 = {
		ZodAny: "any",
		ZodArray: "array",
		ZodBigInt: "bigint",
		ZodBoolean: "boolean",
		ZodDefault: "default",
		ZodTransform: "transform",
		ZodEnum: "enum",
		ZodIntersection: "intersection",
		ZodLiteral: "literal",
		ZodNever: "never",
		ZodNull: "null",
		ZodNullable: "nullable",
		ZodNumber: "number",
		ZodNonOptional: "nonoptional",
		ZodObject: "object",
		ZodOptional: "optional",
		ZodPipe: "pipe",
		ZodReadonly: "readonly",
		ZodRecord: "record",
		ZodString: "string",
		ZodTuple: "tuple",
		ZodType: "type",
		ZodUnion: "union",
		ZodDiscriminatedUnion: "union",
		ZodUnknown: "unknown",
		ZodVoid: "void",
		ZodDate: "date"
	};
	$ZodRegistry = class {
		constructor() {
			this._map = /* @__PURE__ */ new WeakMap();
			this._idmap = /* @__PURE__ */ new Map();
		}
		add(schema, ..._meta) {
			const meta = _meta[0];
			this._map.set(schema, meta);
			if (meta && typeof meta === "object" && "id" in meta) {
				if (this._idmap.has(meta.id)) throw new Error(`ID ${meta.id} already exists in the registry`);
				this._idmap.set(meta.id, schema);
			}
			return this;
		}
		clear() {
			this._map = /* @__PURE__ */ new WeakMap();
			this._idmap = /* @__PURE__ */ new Map();
			return this;
		}
		remove(schema) {
			const meta = this._map.get(schema);
			if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
			this._map.delete(schema);
			return this;
		}
		get(schema) {
			const p = schema._zod.parent;
			if (p) {
				var _this$get;
				const pm = _objectSpread2({}, (_this$get = this.get(p)) !== null && _this$get !== void 0 ? _this$get : {});
				delete pm.id;
				const f = _objectSpread2(_objectSpread2({}, pm), this._map.get(schema));
				return Object.keys(f).length ? f : void 0;
			}
			return this._map.get(schema);
		}
		has(schema) {
			return this._map.has(schema);
		}
	};
	zodToOpenAPIRegistry = registry();
	Metadata$1 = class {
		static collectMetadata(schema, metadata) {
			const currentMetadata = this.getMetadataFromRegistry(schema);
			const _internal = Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata._internal), metadata === null || metadata === void 0 ? void 0 : metadata._internal);
			const param = Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.param), metadata === null || metadata === void 0 ? void 0 : metadata.param);
			const totalMetadata = Object.assign(Object.assign(Object.assign(Object.assign({}, Object.keys(_internal).length > 0 ? { _internal } : {}), currentMetadata), metadata), Object.keys(param).length > 0 ? { param } : {});
			if (isZodType$1(schema, [
				"ZodOptional",
				"ZodNullable",
				"ZodDefault",
				"ZodReadonly",
				"ZodNonOptional"
			]) && isAnyZodType$1(schema._zod.def.innerType)) return this.collectMetadata(schema._zod.def.innerType, totalMetadata);
			if (isZodType$1(schema, "ZodPipe")) {
				const inSchema = schema._zod.def.in;
				const outSchema = schema._zod.def.out;
				if (isZodType$1(inSchema, "ZodTransform") && isAnyZodType$1(outSchema)) return this.collectMetadata(outSchema, totalMetadata);
				if (isAnyZodType$1(inSchema)) return this.collectMetadata(inSchema, totalMetadata);
			}
			return totalMetadata;
		}
		/**
		* @deprecated Use one of `getOpenApiMetadata` or `getInternalMetadata` instead
		*/
		static getMetadata(zodSchema) {
			return this.collectMetadata(zodSchema);
		}
		static getOpenApiMetadata(zodSchema) {
			const metadata = this.collectMetadata(zodSchema);
			return __rest(metadata !== null && metadata !== void 0 ? metadata : {}, ["_internal"]);
		}
		static getInternalMetadata(zodSchema) {
			var _a;
			return (_a = this.collectMetadata(zodSchema)) === null || _a === void 0 ? void 0 : _a._internal;
		}
		static getParamMetadata(zodSchema) {
			const metadata = this.collectMetadata(zodSchema);
			return Object.assign(Object.assign({}, metadata), { param: Object.assign(Object.assign({}, (metadata === null || metadata === void 0 ? void 0 : metadata.description) ? { description: metadata.description } : {}), metadata === null || metadata === void 0 ? void 0 : metadata.param) });
		}
		/**
		* A method that omits all custom keys added to the regular OpenAPI
		* metadata properties
		*/
		static buildSchemaMetadata(metadata) {
			return omitBy(omit$1(metadata, ["param", "_internal"]), isUndefined$1);
		}
		static buildParameterMetadata(metadata) {
			return omitBy(metadata, isUndefined$1);
		}
		static applySchemaMetadata(initialData, metadata) {
			return omitBy(Object.assign(Object.assign({}, initialData), this.buildSchemaMetadata(metadata)), isUndefined$1);
		}
		static getRefId(zodSchema) {
			var _a;
			return (_a = this.getInternalMetadata(zodSchema)) === null || _a === void 0 ? void 0 : _a.refId;
		}
		static unwrapChained(schema) {
			return this.unwrapUntil(schema);
		}
		static getDefaultValue(zodSchema) {
			const unwrapped = this.unwrapUntil(zodSchema, "ZodDefault");
			return unwrapped === null || unwrapped === void 0 ? void 0 : unwrapped._zod.def.defaultValue;
		}
		static unwrapUntil(schema, typeName) {
			if (typeName && isZodType$1(schema, typeName)) return schema;
			if (isZodType$1(schema, [
				"ZodOptional",
				"ZodNullable",
				"ZodDefault",
				"ZodReadonly",
				"ZodNonOptional"
			]) && isAnyZodType$1(schema._zod.def.innerType)) return this.unwrapUntil(schema._zod.def.innerType, typeName);
			if (isZodType$1(schema, "ZodPipe")) {
				const inSchema = schema._zod.def.in;
				const outSchema = schema._zod.def.out;
				if (isZodType$1(inSchema, "ZodTransform") && isAnyZodType$1(outSchema)) return this.unwrapUntil(outSchema, typeName);
				if (isAnyZodType$1(inSchema)) return this.unwrapUntil(inSchema, typeName);
			}
			return typeName ? void 0 : schema;
		}
		static getMetadataFromInternalRegistry(zodSchema) {
			return zodToOpenAPIRegistry.get(zodSchema);
		}
		static getMetadataFromRegistry(zodSchema) {
			const internal = this.getMetadataFromInternalRegistry(zodSchema);
			const general = zodSchema.meta();
			if (!internal) return general;
			const { _internal } = internal, rest = __rest(internal, ["_internal"]);
			const _a = general !== null && general !== void 0 ? general : {}, { id, title } = _a, restGeneral = __rest(_a, ["id", "title"]);
			return Object.assign(Object.assign(Object.assign({ _internal: Object.assign(Object.assign({}, id ? { refId: id } : {}), _internal) }, rest), title ? { description: title } : {}), restGeneral);
		}
		static setMetadataInRegistry(zodSchema, metadata) {
			zodToOpenAPIRegistry.add(zodSchema, metadata);
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+zod-openapi@1.0.10_zod@4.3.6/node_modules/@cabloy/zod-openapi/dist/index.js
var ZodMetadata$1;
var init_dist$5 = __esmMin((() => {
	init_dist$6();
	ZodMetadata$1 = class {
		static unwrapUntil(schema, typeName) {
			return Metadata$1.unwrapUntil(schema, typeName);
		}
		static unwrapChained(schema) {
			if (!schema) return void 0;
			return Metadata$1.unwrapChained(schema);
		}
		static getDefaultValue(zodSchema) {
			return Metadata$1.getDefaultValue(zodSchema);
		}
		static getInternalMetadata(zodSchema) {
			return Metadata$1.getInternalMetadata(zodSchema);
		}
		static getLazySchema(zodSchema) {
			var _zodSchema$_zod$def$g;
			const innerSchema = this.unwrapChained(zodSchema);
			return (_zodSchema$_zod$def$g = zodSchema._zod.def.getter) !== null && _zodSchema$_zod$def$g !== void 0 ? _zodSchema$_zod$def$g : innerSchema._zod.def.getter;
		}
		static resolveLazySchema(zodSchema) {
			const getter = this.getLazySchema(zodSchema);
			if (!getter) return zodSchema;
			const metadata = this.getOpenapiMetadata(zodSchema);
			zodSchema = getter();
			return metadata ? zodSchema.openapi(metadata) : zodSchema;
		}
		static getRefId(zodSchema) {
			return Metadata$1.getRefId(zodSchema);
		}
		static getFieldSchema(zodSchema, key) {
			if (!zodSchema) return;
			const parts = key.split(".");
			for (const part of parts) {
				zodSchema = this._getFieldSchemaInner(zodSchema, part);
				if (!zodSchema) break;
			}
			return zodSchema;
		}
		static _getFieldSchemaInner(zodSchema, key) {
			if (!zodSchema) return;
			zodSchema = this.unwrapChained(zodSchema);
			let schema;
			if (zodSchema.def.type === "object") schema = zodSchema;
			else if (zodSchema.def.type === "union") schema = zodSchema.def.options.find((item) => item.def.type === "object");
			else throw new Error("invalid zod schema");
			return schema.shape[key];
		}
		static getOpenapiMetadata(zodSchema) {
			return Metadata$1.getOpenApiMetadata(zodSchema);
		}
		static isZodType(schema, typeNames) {
			return isZodType$1(schema, typeNames);
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+zod-query@2.0.4/node_modules/@cabloy/zod-query/dist/index.js
function isZodType(schema, typeNames) {
	return (Array.isArray(typeNames) ? typeNames : [typeNames]).some((typeName) => {
		var _schema$def;
		const typeNameMatch = (schema === null || schema === void 0 || (_schema$def = schema.def) === null || _schema$def === void 0 ? void 0 : _schema$def.type) === ZodTypeKeys[typeName];
		if (typeName === "ZodDiscriminatedUnion") return typeNameMatch && "discriminator" in schema.def;
		return typeNameMatch;
	});
}
function isAnyZodType(schema) {
	return "def" in schema;
}
function setParseAdapter(zodMetadata) {
	ZodMetadata = zodMetadata;
	setParseAdapter$1(__parseAdapter);
}
function __parseAdapter(inst, parse) {
	return (payload, _) => {
		switch (inst.type) {
			case "string": return __parseString(inst, parse, payload, _);
			case "number": return __parseNumber(inst, parse, payload, _);
			case "bigint": return __parseBigInt(inst, parse, payload, _);
			case "boolean": return __parseBoolean(inst, parse, payload, _);
			case "date": return __parseDate(inst, parse, payload, _);
			case "object": return __parseObject(inst, parse, payload, _);
			case "array": return __parseArray(inst, parse, payload, _);
			case "optional": return __parseOptional(inst, parse, payload, _);
			case "default": return __parseDefault(inst, parse, payload, _);
		}
		return parse(payload, _);
	};
}
function __parseString(inst, parse, payload, _) {
	const metadata = ZodMetadata === null || ZodMetadata === void 0 ? void 0 : ZodMetadata.getOpenapiMetadata(inst);
	if ((metadata === null || metadata === void 0 ? void 0 : metadata.format) === "binary" && !isNil(payload.value)) return payload;
	_coerceString(payload);
	return parse(payload, _);
}
function __parseNumber(_inst, parse, payload, _) {
	_coerceWithNil(payload, () => {
		payload.value = Number(payload.value);
	});
	return parse(payload, _);
}
function __parseBigInt(_inst, parse, payload, _) {
	_coerceWithNil(payload, () => {
		payload.value = BigInt(payload.value);
	});
	return parse(payload, _);
}
function __parseBoolean(_inst, parse, payload, _) {
	_coerceWithNil(payload, () => {
		if (payload.value === "false" || payload.value === "0") payload.value = false;
		else payload.value = Boolean(payload.value);
	});
	return parse(payload, _);
}
function __parseDate(_inst, parse, payload, _) {
	_coerceWithNil(payload, () => {
		payload.value = new Date(payload.value);
	});
	return parse(payload, _);
}
function __parseObject(_inst, parse, payload, _) {
	_coerceWithNil(payload, () => {
		if (typeof payload.value === "string") payload.value = JSON.parse(payload.value);
	});
	return parse(payload, _);
}
function __parseArray(_inst, parse, payload, _) {
	_coerceWithNil(payload, () => {
		if (typeof payload.value === "string") if (payload.value.startsWith("[") && payload.value.endsWith("]")) payload.value = JSON.parse(payload.value);
		else payload.value = payload.value.split(",");
	});
	return parse(payload, _);
}
function __parseOptional(_inst, parse, payload, _) {
	if (isZodType(Metadata.unwrapUntil(_inst), "ZodString")) _coerceString(payload);
	else _coerceWithNil(payload);
	if (payload.value === null) payload.value = void 0;
	return parse(payload, _);
}
function __parseDefault(_inst, parse, payload, _) {
	if (isZodType(Metadata.unwrapUntil(_inst), "ZodString")) _coerceString(payload);
	else _coerceWithNil(payload);
	return parse(payload, _);
}
function _coerceString(payload, fn) {
	if (!isNil(payload.value)) {
		if (payload.value === "") payload.value = void 0;
		else if (typeof payload.value !== "string") payload.value = String(payload.value);
	}
}
function _coerceWithNil(payload, fn) {
	if (!isNil(payload.value)) if (payload.value === "undefined" || payload.value === "") payload.value = void 0;
	else if (payload.value === "null") payload.value = null;
	else fn === null || fn === void 0 || fn(payload);
}
var ZodTypeKeys, Metadata, isUndefined, isNil, ZodMetadata;
var init_dist$4 = __esmMin((() => {
	init_zod();
	ZodTypeKeys = {
		ZodAny: "any",
		ZodArray: "array",
		ZodBigInt: "bigint",
		ZodBoolean: "boolean",
		ZodDefault: "default",
		ZodTransform: "transform",
		ZodEnum: "enum",
		ZodIntersection: "intersection",
		ZodLiteral: "literal",
		ZodNever: "never",
		ZodNull: "null",
		ZodNullable: "nullable",
		ZodNumber: "number",
		ZodNonOptional: "nonoptional",
		ZodObject: "object",
		ZodOptional: "optional",
		ZodPipe: "pipe",
		ZodReadonly: "readonly",
		ZodRecord: "record",
		ZodString: "string",
		ZodTuple: "tuple",
		ZodType: "type",
		ZodUnion: "union",
		ZodDiscriminatedUnion: "union",
		ZodUnknown: "unknown",
		ZodVoid: "void",
		ZodDate: "date"
	};
	Metadata = class {
		static unwrapUntil(schema, typeName) {
			if (typeName && isZodType(schema, typeName)) return schema;
			if (isZodType(schema, [
				"ZodOptional",
				"ZodNullable",
				"ZodDefault",
				"ZodReadonly",
				"ZodNonOptional"
			]) && isAnyZodType(schema._zod.def.innerType)) return this.unwrapUntil(schema._zod.def.innerType, typeName);
			if (isZodType(schema, "ZodPipe")) {
				const inSchema = schema._zod.def.in;
				const outSchema = schema._zod.def.out;
				if (isZodType(inSchema, "ZodTransform") && isAnyZodType(outSchema)) return this.unwrapUntil(outSchema, typeName);
				if (isAnyZodType(inSchema)) return this.unwrapUntil(inSchema, typeName);
			}
			return typeName ? void 0 : schema;
		}
	};
	isUndefined = (obj) => typeof obj === "undefined";
	isNil = (val) => isUndefined(val) || val === null;
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+localeutil@2.0.11/node_modules/@cabloy/localeutil/dist/index.js
function tryStringify(arg) {
	try {
		return JSON.stringify(arg);
	} catch (err) {
		if (!CIRCULAR_ERROR_MESSAGE) try {
			const a = {};
			a.a = a;
			JSON.stringify(a);
		} catch (err) {
			CIRCULAR_ERROR_MESSAGE = err.message;
		}
		if (err.name === "TypeError" && err.message === CIRCULAR_ERROR_MESSAGE) return "[Circular]";
		throw err;
	}
}
function format(f) {
	if (arguments.length === 1) return f;
	let str = "";
	let a = 1;
	let lastPos = 0;
	for (let i = 0; i < f.length;) {
		if (f.charCodeAt(i) === 37 && i + 1 < f.length) {
			if (f.charCodeAt(i + 1) !== 37 && a >= arguments.length) {
				++i;
				continue;
			}
			switch (f.charCodeAt(i + 1)) {
				case 100:
					if (lastPos < i) str += f.slice(lastPos, i);
					str += Number(arguments[a++]);
					break;
				case 105:
					if (lastPos < i) str += f.slice(lastPos, i);
					str += parseInt(arguments[a++]);
					break;
				case 102:
					if (lastPos < i) str += f.slice(lastPos, i);
					str += parseFloat(arguments[a++]);
					break;
				case 106:
					if (lastPos < i) str += f.slice(lastPos, i);
					str += tryStringify(arguments[a++]);
					break;
				case 115:
					if (lastPos < i) str += f.slice(lastPos, i);
					str += String(arguments[a++]);
					break;
				case 37:
					if (lastPos < i) str += f.slice(lastPos, i);
					str += "%";
					break;
				default:
					if (lastPos < i) str += f.slice(lastPos, i);
					str += "%";
					lastPos = i = i + 1;
					continue;
			}
			lastPos = i = i + 2;
			continue;
		}
		++i;
	}
	if (lastPos === 0) str = f;
	else if (lastPos < f.length) str += f.slice(lastPos);
	return str;
}
/**
* based on koa-locales
*
* https://github.com/koajs/locales/blob/master/index.js
*
*/
function getText(...args) {
	if (args.length === 0) return "";
	const [text, value] = args;
	if (!text) return "";
	if (args.length === 1) return text;
	if (args.length === 2) {
		if (isObject(value)) return formatWithObject(text, value);
		if (Array.isArray(value)) return formatWithArray(text, value);
		return format(text, value);
	}
	const _args = new Array(args.length);
	_args[0] = text;
	for (let i = 1; i < _args.length; i++) _args[i] = args[i];
	return format.apply(null, _args);
}
function isObject(obj) {
	return Object.prototype.toString.call(obj) === "[object Object]";
}
function formatWithArray(text, values) {
	return text.replace(ARRAY_INDEX_RE, function(orignal, matched) {
		const index = parseInt(matched);
		if (index < values.length) return values[index];
		return orignal;
	});
}
function formatWithObject(text, values) {
	return text.replace(Object_INDEX_RE, function(orignal, matched) {
		const value = values[matched];
		if (value) return value;
		return orignal;
	});
}
function getLocaleText(supportCustomMessage, locales1, locales2, locale, key, ...args) {
	const keyCaches = _parseKeyCaches(locales1, locales2, locale, key);
	if (keyCaches !== false) for (const keyCache of keyCaches) {
		var _flags$;
		const flags = keyCache[0];
		const _key = keyCache[1];
		if (args[(_flags$ = flags[1]) !== null && _flags$ !== void 0 ? _flags$ : 0] === flags[0]) return _getLocaleText_inner(supportCustomMessage, locales1, locales2, locale, _key, ...args);
	}
	return _getLocaleText_inner(supportCustomMessage, locales1, locales2, locale, key, ...args);
}
function _parseKeyCaches(locales1, locales2, locale, key) {
	if (!__keysCachesLocales[locale]) __keysCachesLocales[locale] = {};
	const keysCaches = __keysCachesLocales[locale];
	if (keysCaches[key] !== void 0) return keysCaches[key];
	const _keyCaches = [];
	_collectKeyCaches(_keyCaches, false, locales1, locale, key);
	_collectKeyCaches(_keyCaches, true, locales2, locale, key);
	keysCaches[key] = _keyCaches.length === 0 ? false : _keyCaches;
	return keysCaches[key];
}
function _collectKeyCaches(keyCaches, checkExists, locales, locale, key) {
	if (!locales || !locales[locale]) return;
	for (const _key in locales[locale]) {
		if (_key === key || !_key.startsWith(key)) continue;
		let flag = _key.substring(key.length);
		if (flag.startsWith("_")) flag = flag.substring(1);
		const flags = flag.split("_").map((item) => Number(item));
		if (!checkExists || !keyCaches.some((item) => item[1] === _key)) keyCaches.push([flags, _key]);
	}
}
function _getLocaleText_inner(supportCustomMessage, locales1, locales2, locale, key, ...args) {
	var _locales1$locale$key, _locales1$locale, _locales2$locale;
	if (!key) return "";
	let text = (_locales1$locale$key = locales1 === null || locales1 === void 0 || (_locales1$locale = locales1[locale]) === null || _locales1$locale === void 0 ? void 0 : _locales1$locale[key]) !== null && _locales1$locale$key !== void 0 ? _locales1$locale$key : locales2 === null || locales2 === void 0 || (_locales2$locale = locales2[locale]) === null || _locales2$locale === void 0 ? void 0 : _locales2$locale[key];
	if (text === void 0 && locale !== "en-us") {
		var _locales1$enUs$key, _locales1$enUs, _locales2$enUs;
		text = (_locales1$enUs$key = locales1 === null || locales1 === void 0 || (_locales1$enUs = locales1["en-us"]) === null || _locales1$enUs === void 0 ? void 0 : _locales1$enUs[key]) !== null && _locales1$enUs$key !== void 0 ? _locales1$enUs$key : locales2 === null || locales2 === void 0 || (_locales2$enUs = locales2["en-us"]) === null || _locales2$enUs === void 0 ? void 0 : _locales2$enUs[key];
	}
	if (text === void 0) text = key;
	if (supportCustomMessage && !text.replaceAll("%%", "").includes("%") && args[0]) return getText(...args);
	return getText(text, ...args);
}
var CIRCULAR_ERROR_MESSAGE, ARRAY_INDEX_RE, Object_INDEX_RE, __keysCachesLocales;
var init_dist$3 = __esmMin((() => {
	ARRAY_INDEX_RE = /\{(\d+)\}/g;
	Object_INDEX_RE = /\{(.+?)\}/g;
	__keysCachesLocales = {};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+module-info@2.0.0/node_modules/@cabloy/module-info/dist/index.mjs
function getOnionScenesMeta(modules) {
	if (!__onionScenesMeta) __onionScenesMeta = _getOnionScenesMeta(modules);
	return __onionScenesMeta;
}
function _getOnionScenesMeta(modules) {
	const result = {};
	for (const moduleName in modules) {
		var _module$info$onionsMe;
		const module = modules[moduleName];
		const onions = (_module$info$onionsMe = module.info.onionsMeta) === null || _module$info$onionsMe === void 0 ? void 0 : _module$info$onionsMe.onions;
		if (!onions) continue;
		for (const sceneName in onions) result[sceneName] = _objectSpread2(_objectSpread2({}, onions[sceneName]), {}, { module });
	}
	return result;
}
function parseInfo(moduleName) {
	if (!moduleName) return;
	if (moduleName.includes("://")) return;
	if (moduleName.charAt(0) === "/") moduleName = moduleName.substring(1);
	let parts = moduleName.split("/").filter((item) => item);
	if (parts.length < 2) {
		parts = moduleName.split("-").filter((item) => item);
		if (parts.length < 2) return;
		if (parts.length === 4) parts = parts.slice(2);
		if (parts.length === 5) parts = parts.slice(3);
	}
	return {
		pid: parts[0],
		name: parts[1],
		relativeName: `${parts[0]}-${parts[1]}`,
		url: `${parts[0]}/${parts[1]}`,
		originalName: parts.join("-")
	};
}
function parseName(moduleUrl) {
	const moduleName = _parseNameInner(moduleUrl);
	if (!moduleName) return;
	const [a, b] = moduleName.split("-");
	if (!a || !b) return;
	return moduleName;
}
function _parseNameInner(moduleUrl) {
	if (!moduleUrl) return;
	if (moduleUrl.indexOf("/api/static/") === 0) moduleUrl = `/api/${moduleUrl.substring(12)}`;
	if (moduleUrl.indexOf(PREFIX_A) === 0) return _parseNameLikeUrl(moduleUrl, PREFIX_A);
	else if (moduleUrl.indexOf(PREFIX_B) === 0) return _parseName(moduleUrl, PREFIX_B);
	else if (moduleUrl.indexOf(PREFIX_C) === 0) return _parseName(moduleUrl, PREFIX_C);
	else if (moduleUrl.indexOf(PREFIX_D) === 0) return _parseName(moduleUrl, PREFIX_D);
	else if (moduleUrl.indexOf(PREFIX_E) === 0) return _parseNameLikeUrl(moduleUrl, PREFIX_E);
	else return _parseName(moduleUrl.replace("/", "-"), "");
}
function _parseNameLikeUrl(moduleUrl, prefix) {
	const posA = prefix.length;
	const posB = moduleUrl.indexOf("/", posA) + 1;
	if (posB === 0) return;
	let posC = moduleUrl.indexOf("/", posB);
	if (posC === -1) posC = moduleUrl.length;
	return moduleUrl.substring(posA, posC).replace("/", "-");
}
function _parseName(moduleUrl, prefix) {
	const posA = prefix.length;
	let posB = moduleUrl.indexOf("/", posA);
	if (posB === -1) posB = moduleUrl.indexOf(":", posA);
	if (posB === -1) posB = moduleUrl.indexOf(".", posA);
	if (posB === -1) posB = moduleUrl.length;
	return moduleUrl.substring(posA, posB);
}
var __onionScenesMeta, PREFIX_A, PREFIX_B, PREFIX_C, PREFIX_D, PREFIX_E;
var init_dist$2 = __esmMin((() => {
	init_objectSpread2();
	PREFIX_A = "/api/";
	PREFIX_B = "vona-module-";
	PREFIX_C = "./vona-module-";
	PREFIX_D = "./";
	PREFIX_E = "/";
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+deps@1.0.20/node_modules/@cabloy/deps/dist/index.js
function swapDeps(items, options) {
	const depsDynamic = _handleDependents(items, options);
	while (true) if (!_swapDeps(depsDynamic, items, options)) break;
}
function _handleDependents(items, options) {
	const keyDependents = (options === null || options === void 0 ? void 0 : options.dependents) || "dependents";
	const keyName = (options === null || options === void 0 ? void 0 : options.name) || "name";
	const depsDynamic = {};
	for (const item of items) {
		const itemName = _getProperty(item, keyName);
		let dependents = typeof keyDependents === "function" ? keyDependents(item) : _getProperty(item, keyDependents);
		if (!dependents) continue;
		if (!Array.isArray(dependents)) dependents = dependents.split(",");
		for (const dep of dependents) {
			if (!depsDynamic[dep]) depsDynamic[dep] = [];
			if (depsDynamic[dep].findIndex((item) => item === itemName) === -1) depsDynamic[dep].push(itemName);
		}
	}
	return depsDynamic;
}
function _swapDeps(depsDynamic, items, options) {
	const keyDependencies = (options === null || options === void 0 ? void 0 : options.dependencies) || "dependencies";
	const keyName = (options === null || options === void 0 ? void 0 : options.name) || "name";
	let result = false;
	for (const item of items) {
		const name = _getProperty(item, keyName);
		let deps = (typeof keyDependencies === "function" ? keyDependencies(item) : _getProperty(item, keyDependencies)) || [];
		if (typeof deps === "string") deps = deps.split(",");
		if (depsDynamic[name]) {
			for (const depDynamic of depsDynamic[name]) if (deps.findIndex((item) => item === depDynamic) === -1) deps.push(depDynamic);
		}
		for (const dep of deps) if (_swapDep(items, dep, name, keyName)) result = true;
	}
	return result;
}
function _swapDep(arr, a, b, keyName) {
	const indexA = arr.findIndex((item) => _getProperty(item, keyName) === a);
	const indexB = arr.findIndex((item) => _getProperty(item, keyName) === b);
	if (indexA === -1 || indexB === -1 || indexA < indexB) return false;
	arr.splice(indexB, 0, arr.splice(indexA, 1)[0]);
	return true;
}
function _getProperty(obj, name) {
	if (!obj) return void 0;
	const names = name.split(".");
	for (const name of names) {
		if (obj[name] === void 0 || obj[name] === null) {
			obj = obj[name];
			break;
		}
		obj = obj[name];
	}
	return obj;
}
var init_dist$1 = __esmMin((() => {}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/Types.js
var init_Types = __esmMin((() => {}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseAnyOf.js
var parseAnyOf;
var init_parseAnyOf = __esmMin((() => {
	init_parseSchema();
	init_objectSpread2();
	parseAnyOf = (schema, refs) => {
		return schema.anyOf.length ? schema.anyOf.length === 1 ? parseSchema(schema.anyOf[0], _objectSpread2(_objectSpread2({}, refs), {}, { path: [
			...refs.path,
			"anyOf",
			0
		] })) : `z.union([${schema.anyOf.map((schema, i) => parseSchema(schema, _objectSpread2(_objectSpread2({}, refs), {}, { path: [
			...refs.path,
			"anyOf",
			i
		] }))).join(", ")}])` : `z.any()`;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseBoolean.js
var parseBoolean;
var init_parseBoolean = __esmMin((() => {
	parseBoolean = (_schema) => {
		return "z.boolean()";
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseDefault.js
var parseDefault;
var init_parseDefault = __esmMin((() => {
	parseDefault = (_schema) => {
		return "z.any()";
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseMultipleType.js
var parseMultipleType;
var init_parseMultipleType = __esmMin((() => {
	init_parseSchema();
	init_objectSpread2();
	parseMultipleType = (schema, refs) => {
		return `z.union([${schema.type.map((type) => parseSchema(_objectSpread2(_objectSpread2({}, schema), {}, { type }), _objectSpread2(_objectSpread2({}, refs), {}, { withoutDefaults: true }))).join(", ")}])`;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseNot.js
var parseNot;
var init_parseNot = __esmMin((() => {
	init_parseSchema();
	init_objectSpread2();
	parseNot = (schema, refs) => {
		return `z.any().refine((value) => !${parseSchema(schema.not, _objectSpread2(_objectSpread2({}, refs), {}, { path: [...refs.path, "not"] }))}.safeParse(value).success, "Invalid input: Should NOT be valid against schema")`;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseNull.js
var parseNull;
var init_parseNull = __esmMin((() => {
	parseNull = (_schema) => {
		return "z.null()";
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/utils/half.js
var half;
var init_half = __esmMin((() => {
	half = (arr) => {
		return [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2)];
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseAllOf.js
function parseAllOf(schema, refs) {
	if (schema.allOf.length === 0) return "z.never()";
	else if (schema.allOf.length === 1) {
		const item = schema.allOf[0];
		return parseSchema(item, _objectSpread2(_objectSpread2({}, refs), {}, { path: [
			...refs.path,
			"allOf",
			item[originalIndex]
		] }));
	} else {
		const [left, right] = half(ensureOriginalIndex(schema.allOf));
		return `z.intersection(${parseAllOf({ allOf: left }, refs)}, ${parseAllOf({ allOf: right }, refs)})`;
	}
}
var originalIndex, ensureOriginalIndex;
var init_parseAllOf = __esmMin((() => {
	init_parseSchema();
	init_half();
	init_objectSpread2();
	originalIndex = Symbol("Original index");
	ensureOriginalIndex = (arr) => {
		let newArr = [];
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			if (typeof item === "boolean") newArr.push(item ? { [originalIndex]: i } : {
				[originalIndex]: i,
				not: {}
			});
			else if (originalIndex in item) return arr;
			else newArr.push(_objectSpread2(_objectSpread2({}, item), {}, { [originalIndex]: i }));
		}
		return newArr;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/utils/withMessage.js
function withMessage(schema, key, get) {
	const value = schema[key];
	let r = "";
	if (key === "default" || value !== void 0) {
		const got = get({
			value,
			json: JSON.stringify(value)
		});
		if (got) {
			var _schema$errorMessage;
			const opener = got[0];
			const prefix = got.length === 3 ? got[1] : "";
			const closer = got.length === 3 ? got[2] : got[1];
			r += opener;
			if (((_schema$errorMessage = schema.errorMessage) === null || _schema$errorMessage === void 0 ? void 0 : _schema$errorMessage[key]) !== void 0) r += prefix + JSON.stringify(schema.errorMessage[key]);
			r += closer;
		}
	}
	return r;
}
var init_withMessage = __esmMin((() => {}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseArray.js
var parseArray;
var init_parseArray = __esmMin((() => {
	init_withMessage();
	init_parseSchema();
	init_objectSpread2();
	parseArray = (schema, refs) => {
		if (Array.isArray(schema.items)) return `z.tuple([${schema.items.map((v, i) => parseSchema(v, _objectSpread2(_objectSpread2({}, refs), {}, { path: [
			...refs.path,
			"items",
			i
		] })))}])`;
		let r = !schema.items ? "z.array(z.any())" : `z.array(${parseSchema(schema.items, _objectSpread2(_objectSpread2({}, refs), {}, { path: [...refs.path, "items"] }))})`;
		r += withMessage(schema, "minItems", ({ json }) => [
			`.min(${json}`,
			", ",
			")"
		]);
		r += withMessage(schema, "maxItems", ({ json }) => [
			`.max(${json}`,
			", ",
			")"
		]);
		return r;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseConst.js
var parseConst;
var init_parseConst = __esmMin((() => {
	parseConst = (schema) => {
		return `z.literal(${JSON.stringify(schema.const)})`;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseEnum.js
var parseEnum;
var init_parseEnum = __esmMin((() => {
	parseEnum = (schema) => {
		if (schema.enum.length === 0) return "z.never()";
		else if (schema.enum.length === 1) return `z.literal(${JSON.stringify(schema.enum[0])})`;
		else if (schema.enum.every((x) => typeof x === "string")) return `z.enum([${schema.enum.map((x) => JSON.stringify(x))}])`;
		else return `z.union([${schema.enum.map((x) => `z.literal(${JSON.stringify(x)})`).join(", ")}])`;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseIfThenElse.js
var parseIfThenElse;
var init_parseIfThenElse = __esmMin((() => {
	init_parseSchema();
	init_objectSpread2();
	parseIfThenElse = (schema, refs) => {
		const $if = parseSchema(schema.if, _objectSpread2(_objectSpread2({}, refs), {}, { path: [...refs.path, "if"] }));
		const $then = parseSchema(schema.then, _objectSpread2(_objectSpread2({}, refs), {}, { path: [...refs.path, "then"] }));
		const $else = parseSchema(schema.else, _objectSpread2(_objectSpread2({}, refs), {}, { path: [...refs.path, "else"] }));
		return `z.union([${$then}, ${$else}]).superRefine((value,ctx) => {
  const result = ${$if}.safeParse(value).success
    ? ${$then}.safeParse(value)
    : ${$else}.safeParse(value);
  if (!result.success) {
    result.error.errors.forEach((error) => ctx.addIssue(error))
  }
})`;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseNumber.js
var parseNumber;
var init_parseNumber = __esmMin((() => {
	init_withMessage();
	parseNumber = (schema) => {
		let r = withMessage(schema, "default", () => ["z.number(", ")"]);
		if (schema.type === "integer") r += withMessage(schema, "type", () => [".int(", ")"]);
		else r += withMessage(schema, "format", ({ value }) => {
			if (value === "int64") return [".int(", ")"];
		});
		r += withMessage(schema, "multipleOf", ({ value, json }) => {
			if (value === 1) {
				if (r.startsWith("z.number().int(")) return;
				return [".int(", ")"];
			}
			return [
				`.multipleOf(${json}`,
				", ",
				")"
			];
		});
		if (typeof schema.minimum === "number") if (schema.exclusiveMinimum === true) r += withMessage(schema, "minimum", ({ json }) => [
			`.gt(${json}`,
			", ",
			")"
		]);
		else r += withMessage(schema, "minimum", ({ json }) => [
			`.gte(${json}`,
			", ",
			")"
		]);
		else if (typeof schema.exclusiveMinimum === "number") r += withMessage(schema, "exclusiveMinimum", ({ json }) => [
			`.gt(${json}`,
			", ",
			")"
		]);
		if (typeof schema.maximum === "number") if (schema.exclusiveMaximum === true) r += withMessage(schema, "maximum", ({ json }) => [
			`.lt(${json}`,
			", ",
			")"
		]);
		else r += withMessage(schema, "maximum", ({ json }) => [
			`.lte(${json}`,
			", ",
			")"
		]);
		else if (typeof schema.exclusiveMaximum === "number") r += withMessage(schema, "exclusiveMaximum", ({ json }) => [
			`.lt(${json}`,
			", ",
			")"
		]);
		return r;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseOneOf.js
var parseOneOf;
var init_parseOneOf = __esmMin((() => {
	init_parseSchema();
	init_objectSpread2();
	parseOneOf = (schema, refs) => {
		return schema.oneOf.length ? schema.oneOf.length === 1 ? parseSchema(schema.oneOf[0], _objectSpread2(_objectSpread2({}, refs), {}, { path: [
			...refs.path,
			"oneOf",
			0
		] })) : `z.any().superRefine((x, ctx) => {
    const schemas = [${schema.oneOf.map((schema, i) => parseSchema(schema, _objectSpread2(_objectSpread2({}, refs), {}, { path: [
			...refs.path,
			"oneOf",
			i
		] }))).join(", ")}];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        path: ctx.path,
        code: "invalid_union",
        unionErrors: errors,
        message: "Invalid input: Should pass single schema",
      });
    }
  })` : "z.any()";
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/utils/jsdocs.js
var expandJsdocs, addJsdocs;
var init_jsdocs = __esmMin((() => {
	expandJsdocs = (jsdocs) => {
		const lines = jsdocs.split("\n");
		return `/**${lines.length === 1 ? lines[0] : `\n${lines.map((x) => `* ${x}`).join("\n")}\n`}*/\n`;
	};
	addJsdocs = (schema, parsed) => {
		const description = schema.description;
		if (!description) return parsed;
		return `\n${expandJsdocs(description)}${parsed}`;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseObject.js
function parseObject(objectSchema, refs) {
	let properties = void 0;
	if (objectSchema.properties) if (!Object.keys(objectSchema.properties).length) properties = "z.object({})";
	else {
		properties = "z.object({ ";
		properties += Object.keys(objectSchema.properties).map((key) => {
			const propSchema = objectSchema.properties[key];
			let result = `${JSON.stringify(key)}: ${parseSchema(propSchema, _objectSpread2(_objectSpread2({}, refs), {}, { path: [
				...refs.path,
				"properties",
				key
			] }))}`;
			if (refs.withJsdocs && typeof propSchema === "object") result = addJsdocs(propSchema, result);
			const hasDefault = typeof propSchema === "object" && propSchema.default !== void 0;
			const required = Array.isArray(objectSchema.required) ? objectSchema.required.includes(key) : typeof propSchema === "object" && propSchema.required === true;
			return !hasDefault && !required ? `${result}.optional()` : result;
		}).join(", ");
		properties += " })";
	}
	const additionalProperties = objectSchema.additionalProperties !== void 0 ? parseSchema(objectSchema.additionalProperties, _objectSpread2(_objectSpread2({}, refs), {}, { path: [...refs.path, "additionalProperties"] })) : void 0;
	let patternProperties = void 0;
	if (objectSchema.patternProperties) {
		const parsedPatternProperties = Object.fromEntries(Object.entries(objectSchema.patternProperties).map(([key, value]) => {
			return [key, parseSchema(value, _objectSpread2(_objectSpread2({}, refs), {}, { path: [
				...refs.path,
				"patternProperties",
				key
			] }))];
		}, {}));
		patternProperties = "";
		if (properties) if (additionalProperties) patternProperties += `.catchall(z.union([${[...Object.values(parsedPatternProperties), additionalProperties].join(", ")}]))`;
		else if (Object.keys(parsedPatternProperties).length > 1) patternProperties += `.catchall(z.union([${Object.values(parsedPatternProperties).join(", ")}]))`;
		else patternProperties += `.catchall(${Object.values(parsedPatternProperties)})`;
		else if (additionalProperties) patternProperties += `z.record(z.string(), z.union([${[...Object.values(parsedPatternProperties), additionalProperties].join(", ")}]))`;
		else if (Object.keys(parsedPatternProperties).length > 1) patternProperties += `z.record(z.string(), z.union([${Object.values(parsedPatternProperties).join(", ")}]))`;
		else patternProperties += `z.record(z.string(), ${Object.values(parsedPatternProperties)})`;
		patternProperties += ".superRefine((value, ctx) => {\n";
		patternProperties += "for (const key in value) {\n";
		if (additionalProperties) if (objectSchema.properties) patternProperties += `let evaluated = [${Object.keys(objectSchema.properties).map((key) => JSON.stringify(key)).join(", ")}].includes(key)\n`;
		else patternProperties += `let evaluated = false\n`;
		for (const key in objectSchema.patternProperties) {
			patternProperties += "if (key.match(new RegExp(" + JSON.stringify(key) + "))) {\n";
			if (additionalProperties) patternProperties += "evaluated = true\n";
			patternProperties += "const result = " + parsedPatternProperties[key] + ".safeParse(value[key])\n";
			patternProperties += "if (!result.success) {\n";
			patternProperties += `ctx.addIssue({
          path: [key],
          code: 'custom',
          message: \`Invalid input: Key matching regex /\${key}/ must match schema\`,
          params: {
            issues: result.error.issues
          }
        })\n`;
			patternProperties += "}\n";
			patternProperties += "}\n";
		}
		if (additionalProperties) {
			patternProperties += "if (!evaluated) {\n";
			patternProperties += "const result = " + additionalProperties + ".safeParse(value[key])\n";
			patternProperties += "if (!result.success) {\n";
			patternProperties += `ctx.addIssue({
          path: [key],
          code: 'custom',
          message: \`Invalid input: must match catchall schema\`,
          params: {
            issues: result.error.issues
          }
        })\n`;
			patternProperties += "}\n";
			patternProperties += "}\n";
		}
		patternProperties += "}\n";
		patternProperties += "})";
	}
	let output = properties ? patternProperties ? properties + patternProperties : additionalProperties ? additionalProperties === "z.never()" ? properties + ".strict()" : properties + `.catchall(${additionalProperties})` : properties : patternProperties ? patternProperties : additionalProperties ? `z.record(z.string(), ${additionalProperties})` : "z.record(z.string(), z.any())";
	if (its.an.anyOf(objectSchema)) output += `.and(${parseAnyOf(_objectSpread2(_objectSpread2({}, objectSchema), {}, { anyOf: objectSchema.anyOf.map((x) => typeof x === "object" && !x.type && (x.properties || x.additionalProperties || x.patternProperties) ? _objectSpread2(_objectSpread2({}, x), {}, { type: "object" }) : x) }), refs)})`;
	if (its.a.oneOf(objectSchema)) output += `.and(${parseOneOf(_objectSpread2(_objectSpread2({}, objectSchema), {}, { oneOf: objectSchema.oneOf.map((x) => typeof x === "object" && !x.type && (x.properties || x.additionalProperties || x.patternProperties) ? _objectSpread2(_objectSpread2({}, x), {}, { type: "object" }) : x) }), refs)})`;
	if (its.an.allOf(objectSchema)) output += `.and(${parseAllOf(_objectSpread2(_objectSpread2({}, objectSchema), {}, { allOf: objectSchema.allOf.map((x) => typeof x === "object" && !x.type && (x.properties || x.additionalProperties || x.patternProperties) ? _objectSpread2(_objectSpread2({}, x), {}, { type: "object" }) : x) }), refs)})`;
	return output;
}
var init_parseObject = __esmMin((() => {
	init_parseAnyOf();
	init_parseOneOf();
	init_parseSchema();
	init_parseAllOf();
	init_jsdocs();
	init_objectSpread2();
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseString.js
var parseString;
var init_parseString = __esmMin((() => {
	init_withMessage();
	init_parseSchema();
	parseString = (schema) => {
		let r = withMessage(schema, "default", () => ["z.string(", ")"]);
		r += withMessage(schema, "format", ({ value }) => {
			switch (value) {
				case "email": return [".email(", ")"];
				case "ip": return [".ip(", ")"];
				case "ipv4": return [
					".ip({ version: \"v4\"",
					", message: ",
					" })"
				];
				case "ipv6": return [
					".ip({ version: \"v6\"",
					", message: ",
					" })"
				];
				case "uri": return [".url(", ")"];
				case "uuid": return [".uuid(", ")"];
				case "date-time": return [
					".datetime({ offset: true",
					", message: ",
					" })"
				];
				case "time": return [".time(", ")"];
				case "date": return [".date(", ")"];
				case "binary": return [".base64(", ")"];
				case "duration": return [".duration(", ")"];
			}
		});
		r += withMessage(schema, "pattern", ({ json }) => [
			`.regex(new RegExp(${json})`,
			", ",
			")"
		]);
		r += withMessage(schema, "minLength", ({ json }) => [
			`.min(${json}`,
			", ",
			")"
		]);
		r += withMessage(schema, "maxLength", ({ json }) => [
			`.max(${json}`,
			", ",
			")"
		]);
		r += withMessage(schema, "contentEncoding", ({ value }) => {
			if (value === "base64") return [".base64(", ")"];
		});
		const contentMediaType = withMessage(schema, "contentMediaType", ({ value }) => {
			if (value === "application/json") return [
				".transform((str, ctx) => { try { return JSON.parse(str); } catch (err) { ctx.addIssue({ code: \"custom\", message: \"Invalid JSON\" }); }}",
				", ",
				")"
			];
		});
		if (contentMediaType != "") {
			r += contentMediaType;
			r += withMessage(schema, "contentSchema", ({ value }) => {
				if (value && value instanceof Object) return [
					`.pipe(${parseSchema(value)}`,
					", ",
					")"
				];
			});
		}
		return r;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/utils/omit.js
var omit;
var init_omit = __esmMin((() => {
	omit = (obj, ...keys) => Object.keys(obj).reduce((acc, key) => {
		if (!keys.includes(key)) acc[key] = obj[key];
		return acc;
	}, {});
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseNullable.js
var parseNullable;
var init_parseNullable = __esmMin((() => {
	init_omit();
	init_parseSchema();
	parseNullable = (schema, refs) => {
		return `${parseSchema(omit(schema, "nullable"), refs, true)}.nullable()`;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/parsers/parseSchema.js
var parseSchema, addDescribes, addDefaults, addAnnotations, selectParser, its;
var init_parseSchema = __esmMin((() => {
	init_parseAnyOf();
	init_parseBoolean();
	init_parseDefault();
	init_parseMultipleType();
	init_parseNot();
	init_parseNull();
	init_parseAllOf();
	init_parseArray();
	init_parseConst();
	init_parseEnum();
	init_parseIfThenElse();
	init_parseNumber();
	init_parseObject();
	init_parseString();
	init_parseOneOf();
	init_parseNullable();
	parseSchema = (schema, refs = {
		seen: /* @__PURE__ */ new Map(),
		path: []
	}, blockMeta) => {
		if (typeof schema !== "object") return schema ? "z.any()" : "z.never()";
		if (refs.parserOverride) {
			const custom = refs.parserOverride(schema, refs);
			if (typeof custom === "string") return custom;
		}
		let seen = refs.seen.get(schema);
		if (seen) {
			if (seen.r !== void 0) return seen.r;
			if (refs.depth === void 0 || seen.n >= refs.depth) return "z.any()";
			seen.n += 1;
		} else {
			seen = {
				r: void 0,
				n: 0
			};
			refs.seen.set(schema, seen);
		}
		let parsed = selectParser(schema, refs);
		if (!blockMeta) {
			if (!refs.withoutDescribes) parsed = addDescribes(schema, parsed);
			if (!refs.withoutDefaults) parsed = addDefaults(schema, parsed);
			parsed = addAnnotations(schema, parsed);
		}
		seen.r = parsed;
		return parsed;
	};
	addDescribes = (schema, parsed) => {
		if (schema.description) parsed += `.describe(${JSON.stringify(schema.description)})`;
		return parsed;
	};
	addDefaults = (schema, parsed) => {
		if (schema.default !== void 0) parsed += `.default(${JSON.stringify(schema.default)})`;
		return parsed;
	};
	addAnnotations = (schema, parsed) => {
		if (schema.readOnly) parsed += ".readonly()";
		return parsed;
	};
	selectParser = (schema, refs) => {
		if (its.a.nullable(schema)) return parseNullable(schema, refs);
		else if (its.an.object(schema)) return parseObject(schema, refs);
		else if (its.an.array(schema)) return parseArray(schema, refs);
		else if (its.an.anyOf(schema)) return parseAnyOf(schema, refs);
		else if (its.an.allOf(schema)) return parseAllOf(schema, refs);
		else if (its.a.oneOf(schema)) return parseOneOf(schema, refs);
		else if (its.a.not(schema)) return parseNot(schema, refs);
		else if (its.an.enum(schema)) return parseEnum(schema);
		else if (its.a.const(schema)) return parseConst(schema);
		else if (its.a.multipleType(schema)) return parseMultipleType(schema, refs);
		else if (its.a.primitive(schema, "string")) return parseString(schema);
		else if (its.a.primitive(schema, "number") || its.a.primitive(schema, "integer")) return parseNumber(schema);
		else if (its.a.primitive(schema, "boolean")) return parseBoolean(schema);
		else if (its.a.primitive(schema, "null")) return parseNull(schema);
		else if (its.a.conditional(schema)) return parseIfThenElse(schema, refs);
		else return parseDefault(schema);
	};
	its = {
		an: {
			object: (x) => x.type === "object",
			array: (x) => x.type === "array",
			anyOf: (x) => x.anyOf !== void 0,
			allOf: (x) => x.allOf !== void 0,
			enum: (x) => x.enum !== void 0
		},
		a: {
			nullable: (x) => x.nullable === true,
			multipleType: (x) => Array.isArray(x.type),
			not: (x) => x.not !== void 0,
			const: (x) => x.const !== void 0,
			primitive: (x, p) => x.type === p,
			conditional: (x) => Boolean("if" in x && x.if && "then" in x && "else" in x && x.then && x.else),
			oneOf: (x) => x.oneOf !== void 0
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/jsonSchemaToZod.js
var _excluded, jsonSchemaToZod;
var init_jsonSchemaToZod = __esmMin((() => {
	init_parseSchema();
	init_jsdocs();
	init_objectWithoutProperties();
	init_objectSpread2();
	_excluded = [
		"module",
		"name",
		"type",
		"noImport"
	];
	jsonSchemaToZod = (schema, _ref = {}) => {
		let { module, name, type, noImport } = _ref, rest = _objectWithoutProperties(_ref, _excluded);
		if (type && (!name || module !== "esm")) throw new Error("Option `type` requires `name` to be set and `module` to be `esm`");
		let result = parseSchema(schema, _objectSpread2({
			module,
			name,
			path: [],
			seen: /* @__PURE__ */ new Map()
		}, rest));
		const jsdocs = rest.withJsdocs && typeof schema !== "boolean" && schema.description ? expandJsdocs(schema.description) : "";
		if (module === "cjs") {
			result = `${jsdocs}module.exports = ${name ? `{ ${JSON.stringify(name)}: ${result} }` : result}
`;
			if (!noImport) result = `${jsdocs}const { z } = require("zod")

${result}`;
		} else if (module === "esm") {
			result = `${jsdocs}export ${name ? `const ${name} =` : `default`} ${result}
`;
			if (!noImport) result = `import { z } from "zod"

${result}`;
		} else if (name) result = `${jsdocs}const ${name} = ${result}`;
		if (type && name) {
			let typeName = typeof type === "string" ? type : `${name[0].toUpperCase()}${name.substring(1)}`;
			result += `export type ${typeName} = z.infer<typeof ${name}>
`;
		}
		return result;
	};
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+json-schema-to-zod@2.6.4/node_modules/@cabloy/json-schema-to-zod/dist/esm/index.js
var esm_default;
var init_esm = __esmMin((() => {
	init_Types();
	init_jsonSchemaToZod();
	init_parseAllOf();
	init_parseAnyOf();
	init_parseArray();
	init_parseBoolean();
	init_parseConst();
	init_parseDefault();
	init_parseEnum();
	init_parseIfThenElse();
	init_parseMultipleType();
	init_parseNot();
	init_parseNull();
	init_parseNullable();
	init_parseNumber();
	init_parseObject();
	init_parseOneOf();
	init_parseSchema();
	init_parseString();
	init_half();
	init_jsdocs();
	init_omit();
	init_withMessage();
	init_jsonSchemaToZod();
	esm_default = jsonSchemaToZod;
}));
//#endregion
//#region node_modules/.pnpm/@cabloy+socket@2.0.4/node_modules/@cabloy/socket/dist/index.js
var socketEventRecord, socketEventRecordReverse, SymbolPerformActionId, SymbolPerformActionRecord, __cabloyEventPrefix, __closeReasonNormal, WebSocketClient;
var init_dist = __esmMin((() => {
	socketEventRecord = {
		sysReady: "_a",
		sysPerformAction: "_b",
		sysPerformActionBack: "_c"
	};
	socketEventRecordReverse = {
		_a: "sysReady",
		_b: "sysPerformAction",
		_c: "sysPerformActionBack"
	};
	SymbolPerformActionId = Symbol("SymbolPerformActionId");
	SymbolPerformActionRecord = Symbol("SymbolPerformActionRecord");
	__cabloyEventPrefix = "_:";
	__closeReasonNormal = "Manual close";
	WebSocketClient = class {
		constructor(options) {
			this[SymbolPerformActionRecord] = {};
			this._ws = void 0;
			this._timeoutRetry = void 0;
			this._reconnectDelay = void 0;
			this._reconnectDelayMax = void 0;
			this._reconnectAttemptsMax = void 0;
			this._reconnectAttempts = 0;
			this.onReady = void 0;
			this.onEvent = void 0;
			this.onFallback = void 0;
			this.onOpen = void 0;
			this.onError = void 0;
			this.onClose = void 0;
			this._reconnectDelay = (options === null || options === void 0 ? void 0 : options.reconnectDelay) || 1e3;
			this._reconnectDelayMax = (options === null || options === void 0 ? void 0 : options.reconnectDelayMax) || 5e3;
			this._reconnectAttemptsMax = (options === null || options === void 0 ? void 0 : options.reconnectAttemptsMax) || Infinity;
		}
		get ws() {
			return this._ws;
		}
		connect(url, protocols) {
			this.disconnect();
			this._connect(url, protocols);
		}
		_connect(url, protocols) {
			const ws = this._ws = new WebSocket(url, protocols);
			const onMessage = (event) => {
				this._parseEvent(event);
			};
			const onOpen = (event) => {
				var _this$onOpen;
				(_this$onOpen = this.onOpen) === null || _this$onOpen === void 0 || _this$onOpen.call(this, event, this._reconnectAttempts);
				this._reconnectAttempts = 0;
			};
			const onError = (event) => {
				var _this$onError;
				(_this$onError = this.onError) === null || _this$onError === void 0 || _this$onError.call(this, event);
			};
			const onClose = (event) => {
				var _this$onClose;
				this._closeEvents();
				this._closeTimeoutRetry();
				ws.removeEventListener("message", onMessage);
				ws.removeEventListener("open", onOpen);
				ws.removeEventListener("error", onError);
				ws.removeEventListener("close", onClose);
				const reconnect = event.reason !== __closeReasonNormal && this._reconnectAttempts < this._reconnectAttemptsMax;
				(_this$onClose = this.onClose) === null || _this$onClose === void 0 || _this$onClose.call(this, event, reconnect);
				if (reconnect) this._startTimeoutRetry(url, protocols);
			};
			ws.addEventListener("message", onMessage);
			ws.addEventListener("open", onOpen);
			ws.addEventListener("error", onError);
			ws.addEventListener("close", onClose);
		}
		_closeTimeoutRetry() {
			if (this._timeoutRetry) {
				clearTimeout(this._timeoutRetry);
				this._timeoutRetry = void 0;
			}
		}
		_startTimeoutRetry(url, protocols) {
			this._closeTimeoutRetry();
			this._reconnectAttempts++;
			const delay = this._reconnectDelay * Math.min(this._reconnectAttempts, this._reconnectDelayMax);
			this._timeoutRetry = setTimeout(() => {
				this.connect(url, protocols);
			}, delay);
		}
		disconnect() {
			if (this._ws) {
				this._ws.close(1e3, __closeReasonNormal);
				this._ws = void 0;
			}
		}
		sendEvent(eventName, data) {
			var _socketEventRecord$ev;
			if (!this._ws) throw new Error("ws closed");
			const eventNameInner = (_socketEventRecord$ev = socketEventRecord[eventName]) !== null && _socketEventRecord$ev !== void 0 ? _socketEventRecord$ev : eventName;
			this._ws.send(__cabloyEventPrefix + JSON.stringify([eventNameInner, data]));
		}
		_parseEvent(event) {
			const data = event.data;
			let packet;
			if (typeof data === "string" && data.startsWith(__cabloyEventPrefix)) {
				var _socketEventRecordRev;
				const packetInner = JSON.parse(data.substring(2));
				packet = [(_socketEventRecordRev = socketEventRecordReverse[packetInner[0]]) !== null && _socketEventRecordRev !== void 0 ? _socketEventRecordRev : packetInner[0], packetInner[1]];
			} else packet = [void 0, data];
			const eventName = packet[0];
			const result = packet[1];
			if (eventName === "sysReady") {
				var _this$onReady;
				(_this$onReady = this.onReady) === null || _this$onReady === void 0 || _this$onReady.call(this);
			} else if (eventName === "sysPerformActionBack") {
				const id = result.i;
				const performActionBack = this[SymbolPerformActionRecord][id];
				delete this[SymbolPerformActionRecord][id];
				if (performActionBack) if (result.c === 0) performActionBack.resolve(result.d);
				else {
					const err = /* @__PURE__ */ new Error();
					err.code = result.c;
					err.message = result.m;
					performActionBack.reject(err);
				}
			} else if (eventName !== void 0) {
				var _this$onEvent;
				(_this$onEvent = this.onEvent) === null || _this$onEvent === void 0 || _this$onEvent.call(this, eventName, result, event);
			} else {
				var _this$onFallback;
				(_this$onFallback = this.onFallback) === null || _this$onFallback === void 0 || _this$onFallback.call(this, event);
			}
			return packet;
		}
		performAction(method, path, options) {
			var _this$SymbolPerformAc;
			const id = ((_this$SymbolPerformAc = this[SymbolPerformActionId]) !== null && _this$SymbolPerformAc !== void 0 ? _this$SymbolPerformAc : 0) + 1;
			this[SymbolPerformActionId] = id;
			return new Promise((resolve, reject) => {
				this[SymbolPerformActionRecord][id] = {
					resolve,
					reject
				};
				const data = {
					i: id,
					m: method,
					p: path,
					q: options === null || options === void 0 ? void 0 : options.query,
					b: options === null || options === void 0 ? void 0 : options.body,
					h: options === null || options === void 0 ? void 0 : options.headers
				};
				this.sendEvent("sysPerformAction", data);
			});
		}
		_closeEvents() {
			const callbacks = this[SymbolPerformActionRecord];
			this[SymbolPerformActionRecord] = {};
			for (const id in callbacks) {
				const callback = callbacks[id];
				const err = /* @__PURE__ */ new Error();
				err.code = 400;
				callback.reject(err);
			}
		}
	};
}));
//#endregion
export { combineParamsAndQuery as A, isClass as B, init_dist$8 as C, celEnvBase as D, catchError as E, forEach as F, isUndefined$2 as G, isNil$1 as H, forEachSync as I, defineBoot as J, matchSelector as K, getProperty$2 as L, defaultPathSerializer as M, evaluateExpressions as N, checkMeta as O, evaluateSimple as P, hashkey as R, compose as S, init_dist$9 as T, isNilOrEmptyString as U, isEmptyObject as V, isPromise as W, init_wrappers as Y, init_dist$5 as _, init_dist$1 as a, setLocaleErrors as b, init_dist$2 as c, getLocaleText as d, getText as f, ZodMetadata$1 as g, setParseAdapter as h, init_esm as i, combineQueries as j, combineApiPathControllerAndAction as k, parseInfo as l, init_dist$4 as m, init_dist as n, swapDeps as o, init_dist$3 as p, init_dist$11 as q, esm_default as r, getOnionScenesMeta as s, WebSocketClient as t, parseName as u, init_dist$7 as v, extend as w, translateError as x, setLocaleAdapter as y, init_dist$10 as z };
