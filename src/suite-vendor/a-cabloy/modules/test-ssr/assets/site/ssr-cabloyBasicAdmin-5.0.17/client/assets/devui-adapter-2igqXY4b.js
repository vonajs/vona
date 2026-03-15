import { n as BeanBase, l as BeanInfo, X as UseScope, B as BeanSimple, h as deepExtend, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { Meta } from "./a-meta-BC4YoIBL.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
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
let MetaThemeHandler = (_dec$1 = Meta(), _dec2$1 = BeanInfo({
  module: "devui-adapter"
}), _dec3 = UseScope("a-ssr"), _dec4 = Reflect.metadata("design:type", typeof ScopeModuleASsr === "undefined" ? Object : ScopeModuleASsr), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class MetaThemeHandler2 extends BeanBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$scopeSsr", _descriptor, this);
  }
  async apply({
    name: _name,
    dark,
    token
  }) {
    const themeName = dark ? "dark" : "light";
    const colorPrimary = token.color.primary;
    {
      this.$useMeta({
        bodyAttr: {
          "data-theme": themeName
        }
      });
      const body = window?.document?.body;
      if (body) {
        body.style.setProperty("--color-primary", colorPrimary);
      }
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$scopeSsr", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
class MonkeySys extends BeanSimple {
  async sysInitialize() {
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe("a-style");
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = "devui-adapter:themeHandler";
    }
    const configCustom = {
      provider: {
        components: {}
      },
      form: {
        provider: {
          components: {},
          behaviors: {}
        }
      },
      table: {
        provider: {
          components: {},
          actions: {}
        }
      }
    };
    const scopeRestConfig = this.sys.util.getModuleConfigSafe("a-openapi");
    scopeRestConfig.resourceMeta = deepExtend({}, scopeRestConfig.base, configCustom, scopeRestConfig.resourceMeta);
  }
}
var _dec, _dec2, _class;
let ScopeModuleDevuiAdapter = (_dec = Scope(), _dec2 = BeanInfo({
  module: "devui-adapter"
}), _dec(_class = _dec2(_class = class ScopeModuleDevuiAdapter2 extends BeanScopeBase {
}) || _class) || _class);
export {
  MetaThemeHandler,
  MonkeySys,
  ScopeModuleDevuiAdapter
};
