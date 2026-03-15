import { n as BeanBase, m as cast, l as BeanInfo, B as BeanSimple, a3 as extend, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { Sys, Scope } from "./a-bean-Bxu0OKjI.js";
import { c as computed, d as watch, S as onActivated, T as onDeactivated, A as onUnmounted, l as ref, U as normalizeClass, V as isString, W as stringifyStyle, X as normalizeStyle, Y as isBooleanAttr, Z as includeBooleanAttr } from "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$1, _dec2$1, _class$1;
const SymbolSSRState$1 = /* @__PURE__ */ Symbol("SymbolSSRState");
const SymbolSSRStateDefer = /* @__PURE__ */ Symbol("SymbolSSRStateDefer");
let SysSsrState = (_dec$1 = Sys(), _dec2$1 = BeanInfo({
  module: "a-ssr"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class SysSsrState2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this[SymbolSSRState$1] = void 0;
    this[SymbolSSRStateDefer] = void 0;
  }
  async __init__() {
    {
      if (cast(window).__INITIAL_STATE__) {
        this[SymbolSSRState$1] = cast(window).__INITIAL_STATE__;
        delete cast(window).__INITIAL_STATE__;
        document.getElementById("ssr-state-init")?.remove();
        this._patchEnvConfig();
      } else {
        this[SymbolSSRState$1] = {};
      }
      if (cast(window).__INITIAL_STATE_DEFER__) {
        this[SymbolSSRStateDefer] = cast(window).__INITIAL_STATE_DEFER__;
        delete cast(window).__INITIAL_STATE_DEFER__;
        document.getElementById("ssr-state-defer-init")?.remove();
      } else {
        this[SymbolSSRStateDefer] = {};
      }
    }
  }
  _patchEnvConfig() {
    this.sys.env = Object.assign({}, this.sys.env, this.state.envClient);
    this.sys.config.app.name = this.sys.env.APP_NAME;
    this.sys.config.app.title = this.sys.env.APP_TITLE;
    this.sys.config.app.description = this.sys.env.APP_DESCRIPTION;
    this.sys.config.app.version = this.sys.env.APP_VERSION;
    this.sys.config.locale.default = this.sys.env.APP_LOCALE_DEFAULT;
  }
  get state() {
    return this[SymbolSSRState$1];
  }
  get stateDefer() {
    return this[SymbolSSRStateDefer];
  }
}) || _class$1) || _class$1);
const config = (sys) => {
  return {
    cookieTheme: sys.env.SSR_COOKIE_THEME === "true",
    cookieThemeDarkDefault: sys.env.SSR_COOKIE_THEMEDARK_DEFAULT === "true",
    optimization: {
      bodyReadyObserver: sys.env.SSR_BODYREADYOBSERVER === "true"
    }
  };
};
function useMeta(ctx, metaOptions) {
  {
    const meta = {
      active: true
    };
    if (typeof metaOptions === "function") {
      const content = computed(metaOptions);
      meta.val = content.value;
      watch(content, (val) => {
        meta.val = val;
        meta.active === true && ctx.meta.$ssr.metaStore.planClientUpdate();
      });
    } else {
      meta.val = metaOptions;
    }
    ctx.meta.$ssr.metaStore.addMetaOptions(meta);
    ctx.meta.$ssr.metaStore.planClientUpdate();
    onActivated(() => {
      try {
        meta.active = true;
        ctx.meta.$ssr.metaStore.planClientUpdate();
      } catch (_err) {
      }
    });
    onDeactivated(() => {
      try {
        meta.active = false;
        ctx.meta.$ssr.metaStore.planClientUpdate();
      } catch (_err) {
      }
    });
    onUnmounted(() => {
      try {
        ctx.meta.$ssr.metaStore.removeMetaOptions(meta);
        ctx.meta.$ssr.metaStore.planClientUpdate();
      } catch (_err) {
      }
    });
  }
}
class Monkey extends BeanSimple {
  appContextInitialize(ctx) {
    ctx.meta.$ssr = ctx.app.ctx.meta.$ssr;
  }
  async appInitialize() {
  }
  async moduleLoading(_module) {
  }
  async moduleLoaded(module) {
  }
  async beanInit(bean, beanInstance) {
    const self = this;
    bean.defineProperty(beanInstance, "$ssr", {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.ctx.meta.$ssr;
      }
    });
    bean.defineProperty(beanInstance, "$useMeta", {
      enumerable: false,
      configurable: true,
      get() {
        return function(options) {
          const ctx = cast(this).ctx;
          ctx.util.instanceScope(() => {
            useMeta(ctx, options);
          });
        };
      }
    });
  }
  _ssrErrorHandler() {
    return;
  }
  _errorHandlerDefaultServer(err) {
    return err;
  }
}
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
class DevalueError extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   * @param {any} [value] - The value that failed to be serialized
   * @param {any} [root] - The root value being serialized
   */
  constructor(message, keys, value, root) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
    this.value = value;
    this.root = root;
  }
}
function is_primitive(thing) {
  return Object(thing) !== thing;
}
const object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
const is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key) {
  return is_identifier.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}
function is_valid_array_index(s) {
  if (s.length === 0) return false;
  if (s.length > 1 && s.charCodeAt(0) === 48) return false;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 48 || c > 57) return false;
  }
  const n = +s;
  if (n >= 2 ** 32 - 1) return false;
  if (n < 0) return false;
  return true;
}
function valid_array_indices(array) {
  const keys = Object.keys(array);
  for (var i = keys.length - 1; i >= 0; i--) {
    if (is_valid_array_index(keys[i])) {
      break;
    }
  }
  keys.length = i + 1;
  return keys;
}
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (typeof thing === "function") {
        throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key) ? stringify_primitive(key) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          walk(thing.buffer);
          return;
        case "ArrayBuffer":
          return;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys,
              thing,
              value
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys,
              thing,
              value
            );
          }
          for (const key of Object.keys(thing)) {
            if (key === "__proto__") {
              throw new DevalueError(
                `Cannot stringify objects with __proto__ keys`,
                keys,
                thing,
                value
              );
            }
            keys.push(stringify_key(key));
            walk(thing[key]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(thing.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(thing.toString())})`;
      case "Array": {
        let has_holes = false;
        let result = "[";
        for (let i = 0; i < thing.length; i += 1) {
          if (i > 0) result += ",";
          if (Object.hasOwn(thing, i)) {
            result += stringify(thing[i]);
          } else if (!has_holes) {
            const populated_keys = valid_array_indices(
              /** @type {any[]} */
              thing
            );
            const population = populated_keys.length;
            const d = String(thing.length).length;
            const hole_cost = thing.length + 2;
            const sparse_cost = 25 + d + population * (d + 2);
            if (hole_cost > sparse_cost) {
              const entries = populated_keys.map((k) => `${k}:${stringify(thing[k])}`).join(",");
              return `Object.assign(Array(${thing.length}),{${entries}})`;
            }
            has_holes = true;
            i -= 1;
          }
        }
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return result + tail + "]";
      }
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        let str2 = `new ${type}`;
        if (counts.get(thing.buffer) === 1) {
          const array = new thing.constructor(thing.buffer);
          str2 += `([${array}])`;
        } else {
          str2 += `([${stringify(thing.buffer)}])`;
        }
        const a = thing.byteOffset;
        const b = a + thing.byteLength;
        if (a > 0 || b !== thing.buffer.byteLength) {
          const m = +/(\d+)/.exec(type)[1] / 8;
          str2 += `.subarray(${a / m},${b / m})`;
        }
        return str2;
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${type}.from(${stringify_string(thing.toString())})`;
      default:
        const keys2 = Object.keys(thing);
        const obj = keys2.map((key) => `${safe_key(key)}:${stringify(thing[key])}`).join(",");
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return keys2.length > 0 ? `{${obj},__proto__:null}` : `{__proto__:null}`;
        }
        return `{${obj}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`
          );
          break;
        case "ArrayBuffer":
          values.push(
            `new Uint8Array([${new Uint8Array(thing).join(",")}]).buffer`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key) => {
            statements.push(
              `${name}${safe_prop(key)}=${stringify(thing[key])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escape_unsafe_chars(JSON.stringify(key));
}
function safe_prop(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escape_unsafe_chars(JSON.stringify(key))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint") return thing + "n";
  return str;
}
function unevalPatch(value) {
  return uneval(value);
}
class CtxSSRMetaStore extends BeanSimple {
  constructor(...args) {
    super(...args);
    this._updateId = 0;
    this._currentClientMeta = void 0;
    this._clientList = [];
  }
  __init__() {
    if (this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      this._currentClientMeta = cast(window).__Q_META__;
      document.getElementById("ssr-meta-init")?.remove();
    }
  }
  _onRenderedLast(err) {
    if (!err) {
      const ssrContext = this.ctx.meta.$ssr.context;
      this._injectContextState(ssrContext);
      this._injectContextStateDefer(ssrContext);
      this._injectServerMeta(ssrContext);
    }
    this.app.close();
  }
  addMetaOptions(metaOptionsWrapper) {
    this._clientList.push(metaOptionsWrapper);
  }
  removeMetaOptions(metaOptionsWrapper) {
    this._clientList.splice(this._clientList.indexOf(metaOptionsWrapper), 1);
  }
  planClientUpdate() {
    if (this._updateId !== 0) {
      clearTimeout(this._updateId);
    }
    this._updateId = window.setTimeout(() => {
      this._updateId = 0;
      this._updateClientMeta();
    }, 50);
  }
  _updateClientMeta() {
    const data = {
      title: "",
      titleTemplate: void 0,
      meta: {},
      link: {},
      script: {},
      htmlAttr: {},
      bodyAttr: {}
    };
    for (let i = 0; i < this._clientList.length; i++) {
      const {
        active,
        val
      } = this._clientList[i];
      if (active === true) {
        extend(true, data, val);
      }
    }
    normalize(data);
    apply(diff(this._currentClientMeta, data));
    this._currentClientMeta = data;
  }
  _injectServerMeta(ssrContext) {
    const data = {
      title: "",
      titleTemplate: void 0,
      meta: {},
      link: {},
      htmlAttr: {},
      bodyAttr: {},
      bodyStyle: {},
      bodyClass: {},
      noscript: {}
    };
    const list = ssrContext.__qMetaList;
    for (let i = 0; i < list.length; i++) {
      extend(true, data, list[i]);
    }
    normalize(data);
    const nonce = ssrContext.nonce !== void 0 ? ` nonce="${ssrContext.nonce}"` : "";
    const ctx = ssrContext._meta;
    const htmlAttr = Object.keys(data.htmlAttr).filter(htmlFilter);
    if (htmlAttr.length !== 0) {
      ctx.htmlAttrs += (ctx.htmlAttrs.length !== 0 ? " " : "") + htmlAttr.map(getAttr(data.htmlAttr)).join(" ");
    }
    ctx.headTags += getHead(data);
    const bodyAttr = Object.keys(data.bodyAttr).filter(bodyFilter);
    if (bodyAttr.length !== 0) {
      ctx.bodyAttrs += (ctx.bodyAttrs.length !== 0 ? " " : "") + bodyAttr.map(getAttr(data.bodyAttr)).join(" ");
    }
    const bodyStyle = Object.keys(data.bodyStyle).filter((name) => !!data.bodyStyle[name]).map((name) => `${name}:${data.bodyStyle[name]};`).join("");
    if (bodyStyle) {
      ctx.bodyAttrs += `${ctx.bodyAttrs.length !== 0 ? " " : ""}style="${bodyStyle}"`;
    }
    const _bodyClass = ctx.bodyClasses.split(" ").filter((item) => !!item);
    const bodyClass = {};
    _bodyClass.forEach((item) => bodyClass[item] = true);
    extend(true, bodyClass, data.bodyClass);
    ctx.bodyClasses = Object.keys(bodyClass).filter((name) => bodyClass[name]).map((name) => name).join(" ");
    data.title = "'\"`";
    ctx.endingHeadTags += `${Object.keys(data.noscript).map((name) => `<noscript data-qmeta="${name}">${data.noscript[name]}</noscript>`).join("")}<script${nonce} id="ssr-meta-init">window.__Q_META__=${delete data.bodyStyle && delete data.bodyClass && delete data.noscript && unevalPatch(data)}<\/script>`;
    let ssr_local_themedark = this.sys.env.SSR_COOKIE_THEME === "true" ? `let ssr_cookie_themedark=document.cookie.split('; ')?.find(item=>item.indexOf('themedark=')>-1)?.split('=')[1];
        ssr_cookie_themedark=ssr_cookie_themedark==='true'?true:ssr_cookie_themedark==='false'?false:${this.sys.env.SSR_COOKIE_THEMEDARK_DEFAULT};
        window.ssr_themedark=window.ssr_cookie_themedark=ssr_cookie_themedark;` : `let ssr_local_themedark=window.ssr_load_local('themedark');
        if(ssr_local_themedark===undefined || ssr_local_themedark==='auto'){
          ssr_local_themedark=window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        window.ssr_themedark=window.ssr_local_themedark=ssr_local_themedark;`;
    ssr_local_themedark += `Object.defineProperty(window, 'ssr_themedark_data', {
          get: () => {
            let _data=document.body.getAttribute('data-ssr-theme-dark-'+window.ssr_themedark);
            if(_data===undefined || _data===null){
              _data=window.__INITIAL_STATE__ && window.__INITIAL_STATE__['data-ssr-theme-dark-'+window.ssr_themedark];
            }
            return _data;
          },
        });`;
    const ssr_local_themename = this.sys.env.SSR_COOKIE_THEME === "true" ? "" : "window.ssr_local_themename=window.ssr_load_local('themename');";
    ctx.endingHeadTags += `<script id="ssr-prefers-color-schema-dark">
        window.ssr_load_local=function(key){
          const __ssr_local=localStorage.getItem(key);
          return __ssr_local?JSON.parse(__ssr_local):undefined;
        };
        ${ssr_local_themedark}
        ${ssr_local_themename}
        document.querySelector('#ssr-prefers-color-schema-dark').remove();
    <\/script>`.replaceAll("\n", "");
    if (this.sys.env.SSR_BODYREADYOBSERVER === "true") {
      ctx.bodyTags += `<script id="ssr-body-ready-observer">
        window.ssr_bodyReadyObserverClear=()=>{
          if(window.ssr_bodyReadyObserver){
            window.ssr_body_ready_condition=undefined;
            window.ssr_body_ready_callback=undefined;
            window.ssr_bodyReadyObserver.disconnect();
            window.ssr_bodyReadyObserver=undefined;
            document.body.style.display='block';
            document.querySelector('#ssr-body-ready-observer').remove();
          }
        };
        window.ssr_bodyReadyObserver = new MutationObserver(() => {
          if(window.ssr_body_ready_condition && window.ssr_body_ready_condition()){
            window.ssr_body_ready_callback();
            window.ssr_bodyReadyObserverClear();
          }
        });
        window.ssr_bodyReadyObserver.observe(document.body, {
          subtree: true,
          childList: true,
        });
        document.addEventListener("DOMContentLoaded", () => {
          window.ssr_bodyReadyObserverClear();
        });
      <\/script>`.replaceAll("\n", "");
    }
  }
  _injectContextState(ssrContext) {
    const ctx = ssrContext._meta;
    const nonce = ssrContext.nonce !== void 0 ? ` nonce="${ssrContext.nonce}"` : "";
    ctx.endingHeadTags += `<script${nonce} id="ssr-state-init">window.__INITIAL_STATE__=${unevalPatch(ssrContext.state)}<\/script>`;
  }
  _injectContextStateDefer(ssrContext) {
    const ctx = ssrContext._meta;
    const nonce = ssrContext.nonce !== void 0 ? ` nonce="${ssrContext.nonce}"` : "";
    ctx.endingBodyTags += `<script${nonce} id="ssr-state-defer-init">window.__INITIAL_STATE_DEFER__=${unevalPatch(ssrContext.stateDefer)}<\/script>`;
  }
}
function normalize(meta) {
  if (meta.title) {
    meta.title = meta.titleTemplate ? meta.titleTemplate(meta.title) : meta.title;
    delete meta.titleTemplate;
  }
  [["meta", "content"], ["link", "href"]].forEach((type) => {
    const metaType = meta[type[0]];
    const metaProp = type[1];
    for (const name in metaType) {
      const metaLink = metaType[name];
      if (metaLink.template) {
        if (Object.keys(metaLink).length === 1) {
          delete metaType[name];
        } else {
          metaLink[metaProp] = metaLink.template(metaLink[metaProp] || "");
          delete metaLink.template;
        }
      }
    }
  });
}
function changed(old, def) {
  if (Object.keys(old).length !== Object.keys(def).length) {
    return true;
  }
  for (const key in old) {
    if (old[key] !== def[key]) {
      return true;
    }
  }
}
function bodyFilter(name) {
  return ["class", "style"].includes(name) === false;
}
function htmlFilter(_name) {
  return true;
}
function diff(meta, other) {
  const add = {};
  const remove = {};
  if (meta === void 0) {
    return {
      add: other,
      remove
    };
  }
  if (meta.title !== other.title) {
    add.title = other.title;
  }
  ["meta", "link", "script", "htmlAttr", "bodyAttr"].forEach((type) => {
    const old = meta[type];
    const cur = other[type];
    remove[type] = [];
    if (old === void 0 || old === null) {
      add[type] = cur;
      return;
    }
    add[type] = {};
    for (const key in old) {
      if (Object.prototype.hasOwnProperty.call(cur, key) === false) {
        remove[type].push(key);
      }
    }
    for (const key in cur) {
      if (Object.prototype.hasOwnProperty.call(old, key) === false) {
        add[type][key] = cur[key];
      } else if (changed(old[key], cur[key]) === true) {
        remove[type].push(key);
        add[type][key] = cur[key];
      }
    }
  });
  return {
    add,
    remove
  };
}
function apply({
  add,
  remove
}) {
  if (add.title) {
    document.title = add.title;
  }
  if (Object.keys(remove).length !== 0) {
    ["meta", "link", "script"].forEach((type) => {
      remove[type].forEach((name) => {
        document.head.querySelector(`${type}[data-qmeta="${name}"]`)?.remove();
      });
    });
    remove.htmlAttr.filter(htmlFilter).forEach((name) => {
      document.documentElement.removeAttribute(name);
    });
    remove.bodyAttr.filter(bodyFilter).forEach((name) => {
      document.body.removeAttribute(name);
    });
  }
  ["meta", "link", "script"].forEach((type) => {
    const metaType = add[type];
    for (const name in metaType) {
      const tag = document.createElement(type);
      for (const att in metaType[name]) {
        if (att !== "innerHTML") {
          tag.setAttribute(att, metaType[name][att]);
        }
      }
      tag.setAttribute("data-qmeta", name);
      if (type === "script") {
        tag.innerHTML = metaType[name].innerHTML || "";
      }
      document.head.appendChild(tag);
    }
  });
  Object.keys(add.htmlAttr).filter(htmlFilter).forEach((name) => {
    document.documentElement.setAttribute(name, add.htmlAttr[name] || "");
  });
  Object.keys(add.bodyAttr).filter(bodyFilter).forEach((name) => {
    document.body.setAttribute(name, add.bodyAttr[name] || "");
  });
}
function getAttr(seed) {
  return (att) => {
    const val = seed[att];
    return att + (val !== true && val !== void 0 ? `="${val}"` : "");
  };
}
function getHead(meta) {
  let output = "";
  if (meta.title) {
    output += `<title>${meta.title}</title>`;
  }
  ["meta", "link", "script"].forEach((type) => {
    const metaType = meta[type];
    for (const att in metaType) {
      const attrs = Object.keys(metaType[att]).filter((att2) => att2 !== "innerHTML").map(getAttr(metaType[att]));
      output += `<${type} ${attrs.join(" ")} data-qmeta="${att}">`;
      if (type === "script") {
        output += `${metaType[att].innerHTML || ""}<\/script>`;
      }
    }
  });
  return output;
}
const SymbolIsRuntimeSsrPreHydration = /* @__PURE__ */ Symbol("SymbolIsRuntimeSsrPreHydration");
const SymbolSSRContext = /* @__PURE__ */ Symbol("SymbolSSRContext");
const SymbolSSRState = /* @__PURE__ */ Symbol("SymbolSSRState");
const SymbolOnHydrateds = /* @__PURE__ */ Symbol("SymbolOnHydrateds");
const SymbolOnHydratePropHasMismatches = /* @__PURE__ */ Symbol("SymbolOnHydratePropHasMismatches");
const SymbolInstanceUpdates = /* @__PURE__ */ Symbol("SymbolInstanceUpdates");
const SymbolHydratingCounter = /* @__PURE__ */ Symbol("SymbolHydratingCounter");
class CtxSSR extends BeanSimple {
  constructor(...args) {
    super(...args);
    this[SymbolIsRuntimeSsrPreHydration] = ref(false);
    this[SymbolSSRContext] = void 0;
    this[SymbolSSRState] = void 0;
    this[SymbolOnHydrateds] = [];
    this[SymbolOnHydratePropHasMismatches] = [];
    this[SymbolInstanceUpdates] = [];
    this[SymbolHydratingCounter] = 0;
    this.metaStore = void 0;
  }
  /** @internal */
  initialize() {
    this[SymbolSSRState] = this.sys.bean._getBeanSyncOnly("a-ssr.sys.ssrState");
    if (document.body.getAttribute("data-server-rendered") !== null) {
      this[SymbolIsRuntimeSsrPreHydration].value = true;
    }
    if (this.isRuntimeSsrPreHydration) {
      this.onHydratePropHasMismatch((el, key, clientValue, vnode, instance) => {
        return this._onHydratePropHasMismatchDefault(el, key, clientValue, vnode, instance);
      });
    }
    this.metaStore = this.bean._newBeanSimple(CtxSSRMetaStore, false);
    if (this.isRuntimeSsrPreHydration) {
      this.onHydrated(() => {
        document.querySelectorAll("style[vite-css-module-id]").forEach((node) => node.remove());
      });
    }
  }
  get isRuntimeSsrPreHydration() {
    return this[SymbolIsRuntimeSsrPreHydration].value;
  }
  set isRuntimeSsrPreHydration(value) {
    this[SymbolIsRuntimeSsrPreHydration].value = value;
  }
  get context() {
    throw new Error("cannot called in client");
  }
  get state() {
    {
      return this[SymbolSSRState].state;
    }
  }
  get stateDefer() {
    {
      return this[SymbolSSRState].stateDefer;
    }
  }
  getPerformAction(baseURL) {
    return void 0;
  }
  _initContext() {
    let ignorePublicPath;
    if (this.sys.env.APP_PUBLIC_PATH === this.sys.envOriginal.APP_PUBLIC_PATH) {
      ignorePublicPath = true;
    } else {
      if (this.sys.envOriginal.APP_PUBLIC_PATH) {
        throw new Error("Please specify the valid env: APP_PUBLIC_PATH");
      }
      ignorePublicPath = false;
    }
    const ssrContext = this[SymbolSSRContext];
    ssrContext._meta = defu(ssrContext._meta, {
      htmlAttrs: "",
      headTags: "",
      endingHeadTags: "",
      bodyClasses: "",
      bodyAttrs: "data-server-rendered",
      bodyTags: "",
      endingBodyTags: "",
      baseUrl: this.sys.util.getAbsoluteUrlFromPagePath(void 0, false, ignorePublicPath)
    });
    ssrContext.state = ssrContext.state || {};
    ssrContext.stateDefer = ssrContext.stateDefer || {};
  }
  onHydrated(fn) {
    this[SymbolOnHydrateds].push(fn);
  }
  onHydratePropHasMismatch(fn) {
    this[SymbolOnHydratePropHasMismatches].push(fn);
  }
  handleDirectOrOnHydrated(fn) {
    if (this.isRuntimeSsrPreHydration) {
      this.onHydrated(fn);
    } else {
      return fn();
    }
  }
  _onHydratePropHasMismatchDefault(el, key, clientValue, _vnode, _instance) {
    let ignore = false;
    let expected;
    if (key === "class") {
      ignore = true;
      if (clientValue !== void 0) {
        expected = normalizeClass(clientValue);
        el.setAttribute(key, expected);
      }
    } else if (key === "style") {
      ignore = true;
      if (clientValue !== void 0) {
        expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
        el.setAttribute(key, expected);
      }
    } else if (key === "for") {
      ignore = true;
      if (clientValue !== void 0) {
        expected = String(clientValue);
        el.setAttribute(key, expected);
      }
    } else if (key === "id") {
      ignore = true;
      if (clientValue !== void 0) {
        expected = String(clientValue);
        el.setAttribute(key, expected);
      }
    } else if (key === "d") {
      ignore = true;
      if (clientValue !== void 0) {
        expected = String(clientValue);
        el.setAttribute(key, expected);
      }
    } else if (key === "value") {
      ignore = true;
      if (clientValue !== void 0) {
        expected = String(clientValue);
        if (el.tagName === "TEXTAREA") {
          el.value = expected;
        } else {
          el.setAttribute(key, expected);
        }
      }
    } else if (isBooleanAttr(key)) {
      ignore = true;
      if (clientValue !== void 0) {
        const expected2 = includeBooleanAttr(clientValue);
        if (expected2) {
          el.setAttribute(key, "");
        } else {
          el.removeAttribute(key);
        }
      }
    } else if (el.getAttribute(`data-hydrate-ignore-${key}`) !== null) {
      ignore = true;
      if (clientValue !== void 0) {
        expected = String(clientValue);
        el.setAttribute(key, expected);
      }
    }
    if (!ignore) return {
      clientValue
    };
    return {
      ignore: true
    };
  }
  _hydrated() {
    if (!this.isRuntimeSsrPreHydration) return;
    this.isRuntimeSsrPreHydration = false;
    this[SymbolInstanceUpdates].forEach((instance) => {
      if (!instance.isUnmounted && instance.zova) {
        try {
          instance.update();
        } catch (err) {
          if (!err.message.includes("'insertBefore'")) {
            throw err;
          }
        }
      }
    });
    this[SymbolInstanceUpdates] = [];
    this[SymbolOnHydrateds].forEach((fn) => fn());
    this[SymbolOnHydrateds] = [];
    this[SymbolOnHydratePropHasMismatches] = [];
  }
  /** @internal */
  _hydratePropHasMismatch(el, key, clientValue, vnode, instance) {
    for (const fn of this[SymbolOnHydratePropHasMismatches]) {
      const res = fn(el, key, clientValue, vnode, instance);
      if (res.ignore) return res;
      clientValue = res.clientValue;
    }
    return {
      ignore: false,
      clientValue
    };
  }
  /** @internal */
  _hydratingInc() {
    ++this[SymbolHydratingCounter];
  }
  /** @internal */
  _hydratingDec() {
    if (--this[SymbolHydratingCounter] === 0) {
      this._hydrated();
    }
  }
  /** @internal */
  _hydratingInstanceRecord(instance) {
    if (!this[SymbolInstanceUpdates].includes(instance)) {
      this[SymbolInstanceUpdates].push(instance);
      return true;
    }
    return false;
  }
}
class MonkeySys extends BeanSimple {
  constructor(moduleSelf) {
    super();
    this._moduleSelf = void 0;
    this._sysSsrState = void 0;
    this._moduleSelf = moduleSelf;
  }
  async getSysSsrState() {
    if (!this._sysSsrState) {
      this._sysSsrState = await this.bean._getBean("a-ssr.sys.ssrState", false);
    }
    return this._sysSsrState;
  }
  async moduleLoading(module) {
    if (this._moduleSelf === module) return;
    await this.getSysSsrState();
  }
  async moduleLoaded(_module) {
  }
  async configLoaded(_module, _config) {
  }
  sysContextInitialize(ctx) {
    ctx.meta.$ssr = ctx.bean._newBeanSimple(CtxSSR, false);
    ctx.meta.$ssr.initialize();
  }
}
var _dec, _dec2, _class;
let ScopeModuleASsr = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-ssr"
}), _dec(_class = _dec2(_class = class ScopeModuleASsr2 extends BeanScopeBase {
}) || _class) || _class);
export {
  CtxSSR,
  CtxSSRMetaStore,
  Monkey,
  MonkeySys,
  ScopeModuleASsr,
  SysSsrState,
  config,
  unevalPatch
};
