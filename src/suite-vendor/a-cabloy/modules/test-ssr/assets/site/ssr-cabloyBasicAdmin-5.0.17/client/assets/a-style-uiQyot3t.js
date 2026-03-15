import { m as cast, I as beanFullNameFromOnionName, l as BeanInfo, X as UseScope, B as BeanSimple, a7 as useComputed, v as BeanScopeBase, d as createBeanDecorator, n as BeanBase, h as deepExtend } from "./zova-QgocPMzS.js";
import { Bean, Scope } from "./a-bean-Bxu0OKjI.js";
import { BeanModelBase } from "./a-model-DdQjWvuo.js";
import { a as createTypeStyle, s as style, b as cssRule, d as cssRaw } from "./typestyle-BzUluVB3.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor;
function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let BeanTheme = (_dec$1 = Bean(), _dec2$1 = BeanInfo({
  module: "a-style"
}), _dec3 = UseScope("a-ssr"), _dec4 = Reflect.metadata("design:type", typeof ScopeModuleASsr === "undefined" ? Object : ScopeModuleASsr), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class BeanTheme2 extends BeanModelBase {
  constructor(...args) {
    super(...args);
    this.name = void 0;
    this.darkMode = void 0;
    this._dark = void 0;
    this.token = void 0;
    this._mediaDark = void 0;
    this._onMediaDarkChange = void 0;
    _initializerDefineProperty(this, "$$scopeSsr", _descriptor, this);
  }
  get dark() {
    return this._dark;
  }
  async __init__() {
    const cookieTheme = this.$$scopeSsr.config.cookieTheme;
    const cookieThemeDarkDefault = this.$$scopeSsr.config.cookieThemeDarkDefault;
    this.name = this.$useState(cookieTheme ? "cookie" : "local", {
      queryKey: ["themename"],
      meta: {
        persister: {
          maxAge: this.scope.config.model.themename.persister.maxAge
        },
        defaultData: this.scope.config.defaultTheme
      }
    });
    this.darkMode = this.$useState(cookieTheme ? "cookie" : "local", {
      queryKey: ["themedark"],
      meta: {
        persister: {
          maxAge: this.scope.config.model.themename.persister.maxAge,
          deserialize: (value, deserializeDefault) => {
            if (cookieTheme && value === "auto") value = cookieThemeDarkDefault;
            return deserializeDefault(value);
          }
        },
        defaultData: cookieTheme ? cookieThemeDarkDefault : "auto"
      }
    });
    this._updateDark();
    this.$watch(() => this.darkMode, () => {
      this._updateDark();
    });
    {
      this.$watch([() => this.name, () => this._dark], () => {
        this._applyTheme();
      });
    }
    await this._applyThemeWrapper();
  }
  __dispose__() {
    this._listenMediaDarkChange(false);
  }
  _updateDark() {
    this._dark = this._getDarkFromDarkMode(this.darkMode);
  }
  async _applyThemeWrapper() {
    await this._applyTheme();
  }
  async _applyTheme() {
    const name = this.name;
    const dark = this._dark;
    const theme = await this._loadThemeBean(name);
    if (!theme) {
      this.name = this.scope.config.defaultTheme;
      await this._applyTheme();
      return;
    }
    const res = await theme.apply({
      name,
      dark
    });
    this.token = cast(res).token;
    const handler = res.handler ?? this.scope.config.defaultThemeHandler;
    if (handler) {
      const themeHandler = await this.bean._getBean(beanFullNameFromOnionName(handler, "meta"), true);
      await themeHandler.apply({
        name,
        dark,
        token: this.token
      });
    }
  }
  async _loadThemeBean(name) {
    const parts = name.split(":");
    if (parts.length === 1) {
      throw new Error(`invalid theme name: ${name}`);
    }
    const moduleName = parts[0];
    if (!this.app.meta.module.exists(moduleName)) return;
    return await this.bean._getBean(beanFullNameFromOnionName(name, "theme"), true);
  }
  toggleDark() {
    this.darkMode = !this._dark;
    this._updateDark();
  }
  _getDarkFromDarkMode(mode) {
    if (mode === void 0) mode = "auto";
    if (mode === "auto") {
      this._listenMediaDarkChange(true);
      return !!this._mediaDark?.matches;
    } else {
      this._listenMediaDarkChange(false);
      return mode;
    }
  }
  _listenMediaDarkChange(listen) {
    if (listen) {
      if (!this._mediaDark) {
        this._mediaDark = window.matchMedia("(prefers-color-scheme: dark)");
        this._onMediaDarkChange = async () => {
          this._updateDark();
          this._applyTheme();
        };
        this._mediaDark.addEventListener("change", this._onMediaDarkChange);
      }
    } else {
      if (this._mediaDark) {
        this._mediaDark.removeEventListener("change", this._onMediaDarkChange);
        this._onMediaDarkChange = void 0;
        this._mediaDark = void 0;
      }
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$scopeSsr", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
const config = (_sys) => {
  return {
    defaultCss: "home-base:default",
    defaultTheme: "home-base:default",
    defaultThemeHandler: "",
    model: {
      themename: {
        persister: {
          maxAge: Infinity
        }
      }
    }
  };
};
const __ThisModule__ = "a-style";
class Monkey extends BeanSimple {
  constructor(...args) {
    super(...args);
    this._beanTheme = void 0;
    this._beanCssDefault = void 0;
    this._styleInstance = void 0;
  }
  async appInitialize() {
    if (this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      this._styleInstance = createTypeStyle();
      this.ctx.meta.$ssr.onHydrated(() => {
        this._styleInstance.setStylesTarget(document.getElementById("styles-target"));
      });
    }
  }
  async appInitialized() {
    this._beanTheme = await this.bean._getBean(BeanTheme, true);
    const scope = await this.bean.getScope(__ThisModule__);
    this._beanCssDefault = await this.bean._getBean(beanFullNameFromOnionName(scope.config.defaultCss, "css"), true);
  }
  async beanInit(bean, beanInstance) {
    const self = this;
    bean.defineProperty(beanInstance, "$style", {
      enumerable: false,
      configurable: true,
      get() {
        return function(props, ...args) {
          return self._patchStyle(beanInstance, props, ...args);
        };
      }
    });
    bean.defineProperty(beanInstance, "$cssRule", {
      enumerable: false,
      configurable: true,
      get() {
        return function(selector, ...objects) {
          return self._patchCssRule(beanInstance, selector, ...objects);
        };
      }
    });
    bean.defineProperty(beanInstance, "$cssRaw", {
      enumerable: false,
      configurable: true,
      get() {
        return function(mustBeValidCSS) {
          return self._patchCssRaw(beanInstance, mustBeValidCSS);
        };
      }
    });
    bean.defineProperty(beanInstance, "$css", {
      enumerable: false,
      configurable: true,
      get() {
        return self._beanCssDefault;
      }
    });
    bean.defineProperty(beanInstance, "$theme", {
      enumerable: false,
      configurable: true,
      get() {
        return self._beanTheme;
      }
    });
    bean.defineProperty(beanInstance, "$token", {
      enumerable: false,
      configurable: true,
      get() {
        return useComputed(() => self._beanTheme.token);
      }
    });
  }
  _patchStyle(beanInstance, props, ...args) {
    if (this._styleInstance) {
      return this._styleInstance.style(props, ...args);
    } else {
      return style(props, ...args);
    }
  }
  _patchCssRule(_beanInstance, selector, ...objects) {
    if (this._styleInstance) {
      return this._styleInstance.cssRule(selector, ...objects);
    } else {
      return cssRule(selector, ...objects);
    }
  }
  _patchCssRaw(_beanInstance, mustBeValidCSS) {
    if (this._styleInstance) {
      return this._styleInstance.cssRaw(mustBeValidCSS);
    } else {
      return cssRaw(mustBeValidCSS);
    }
  }
}
var _dec, _dec2, _class;
let ScopeModuleAStyle = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-style"
}), _dec(_class = _dec2(_class = class ScopeModuleAStyle2 extends BeanScopeBase {
}) || _class) || _class);
function Css(options) {
  return createBeanDecorator("css", "app", true, options);
}
function Theme(options) {
  return createBeanDecorator("theme", "app", true, options);
}
function $getThemeName(themeName) {
  return themeName;
}
class BeanThemeBase extends BeanBase {
  getOptionsToken(params) {
    const options = this.$onionOptions;
    return options.token?.(params);
  }
  mergeOptionsToken(params, token) {
    const optionsToken = this.getOptionsToken(params);
    if (optionsToken) {
      token = deepExtend(token, optionsToken);
    }
    return token;
  }
}
export {
  $getThemeName,
  BeanTheme,
  BeanThemeBase,
  Css,
  Monkey,
  ScopeModuleAStyle,
  Theme,
  config
};
