import { B as BeanSimple, a9 as WebSocketClient, v as BeanScopeBase, l as BeanInfo } from "./zova-QgocPMzS.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
const config = (_sys) => {
  return {
    change: {
      debounce: 100
    }
  };
};
function debounce(function_, wait = 100, options = {}) {
  if (typeof function_ !== "function") {
    throw new TypeError(`Expected the first parameter to be a function, got \`${typeof function_}\`.`);
  }
  if (wait < 0) {
    throw new RangeError("`wait` must not be negative.");
  }
  if (typeof options === "boolean") {
    throw new TypeError("The `options` parameter must be an object, not a boolean. Use `{immediate: true}` instead.");
  }
  const { immediate } = options;
  let storedContext;
  let storedArguments;
  let timeoutId;
  let timestamp;
  let result;
  function run() {
    const callContext = storedContext;
    const callArguments = storedArguments;
    storedContext = void 0;
    storedArguments = void 0;
    result = function_.apply(callContext, callArguments);
    return result;
  }
  function later() {
    const last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeoutId = setTimeout(later, wait - last);
    } else {
      timeoutId = void 0;
      if (!immediate) {
        result = run();
      }
    }
  }
  const debounced = function(...arguments_) {
    if (storedContext && this !== storedContext && Object.getPrototypeOf(this) === Object.getPrototypeOf(storedContext)) {
      throw new Error("Debounced method called with different contexts of the same prototype.");
    }
    storedContext = this;
    storedArguments = arguments_;
    timestamp = Date.now();
    const callNow = immediate && !timeoutId;
    if (!timeoutId) {
      timeoutId = setTimeout(later, wait);
    }
    if (callNow) {
      result = run();
      return result;
    }
    return void 0;
  };
  Object.defineProperty(debounced, "isPending", {
    get() {
      return timeoutId !== void 0;
    }
  });
  debounced.clear = () => {
    if (!timeoutId) {
      return;
    }
    clearTimeout(timeoutId);
    timeoutId = void 0;
    storedContext = void 0;
    storedArguments = void 0;
  };
  debounced.flush = () => {
    if (!timeoutId) {
      return;
    }
    debounced.trigger();
  };
  debounced.trigger = () => {
    result = run();
    debounced.clear();
  };
  return debounced;
}
class MonkeySys extends BeanSimple {
  constructor(...args) {
    super(...args);
    this._ws = void 0;
    this._reload = void 0;
  }
  async sysReady() {
    if (this.sys.env.SSR_HMR !== "true") return;
    const scopeConfig = this.sys.util.getModuleConfigSafe("a-ssrhmr");
    this._reload = debounce(() => {
      this._reloadInner();
    }, scopeConfig.change.debounce);
    this._startWs();
  }
  sysClose() {
    if (this.sys.env.SSR_HMR !== "true") return;
    this._closeWs();
  }
  _closeWs() {
    if (this._ws) {
      this._ws.disconnect();
      this._ws = void 0;
    }
  }
  _startWs() {
    const ws = this._ws = new WebSocketClient({
      reconnectDelayMax: 1e3
    });
    ws.onEvent = (eventName, _data) => {
      if (eventName === "reload") {
        this._reload?.();
      }
    };
    ws.onOpen = (_event, reconnectAttempts) => {
      this.sys.meta.logger.get().log("silly", "[ssr hmr] ready");
      if (reconnectAttempts > 0) {
        this._reloadInner();
      }
    };
    const url = `${this.sys.config.ws.baseURL}${this.sys.config.ws.prefix}/ssrhmr`;
    ws.connect(url);
  }
  async _reloadInner() {
    await this.sys.meta.event.emit("a-ssrhmr:reload");
  }
}
var _dec, _dec2, _class;
let ScopeModuleASsrhmr = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-ssrhmr"
}), _dec(_class = _dec2(_class = class ScopeModuleASsrhmr2 extends BeanScopeBase {
}) || _class) || _class);
export {
  MonkeySys,
  ScopeModuleASsrhmr,
  config
};
