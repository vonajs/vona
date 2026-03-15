import { Z as BeanControllerPageBase, l as BeanInfo, Y as BeanRenderBase, W as createZovaComponentAsync, ae as createZovaComponentPage, U as Use, v as BeanScopeBase, aa as useApp, a7 as useComputed } from "./zova-QgocPMzS.js";
import { Controller, Render, Scope } from "./a-bean-Bxu0OKjI.js";
import { $QueryAutoLoad } from "./a-model-DdQjWvuo.js";
import { P as createVNode, N as createTextVNode, Q as mergeProps } from "./vue-CRNsYCTs.js";
import { BeanBehaviorBase, Behavior } from "./a-behavior-BVEM_kq-.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
import "./a-logger-CYjH9aBA.js";
var _dec$3, _dec2$3, _class$3;
let ControllerPageLogin = (_dec$3 = Controller(), _dec2$3 = BeanInfo({
  module: "home-login"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class ControllerPageLogin2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.user = {
      username: "",
      password: "",
      captcha: {
        id: "",
        token: ""
      }
    };
  }
  async __init__() {
    await $QueryAutoLoad(() => this.$passport.apiSchemasLogin.sdk);
  }
  get schema() {
    return this.$passport.schemaLogin;
  }
  async onSubmitLogin(data) {
    await this.$passport.login().mutateAsync(data.value);
  }
  async onSubmitLoginGitHub() {
    const apiUrl = this.$passport.getOauthLoginUrl("auth-github", "github", "default");
    window.location.assign(apiUrl);
  }
}) || _class$3) || _class$3);
var _dec$2, _dec2$2, _class$2;
const ZIcon$1 = createZovaComponentAsync("a-icon", "icon");
const ZFormSubscribe = createZovaComponentAsync("a-form", "formSubscribe");
const ZFormFieldWrapper = createZovaComponentAsync("a-form", "formFieldWrapper");
const ZFormField = createZovaComponentAsync("a-form", "formField");
const ZForm = createZovaComponentAsync("a-form", "form");
let RenderPageLogin = (_dec$2 = Render(), _dec2$2 = BeanInfo({
  module: "home-login"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class RenderPageLogin2 extends BeanRenderBase {
  render() {
    return createVNode("div", {
      "class": "min-h-screen bg-base-200 flex items-center"
    }, [createVNode("div", {
      "class": "card mx-auto w-full max-w-5xl  shadow-xl"
    }, [createVNode("div", {
      "class": "grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl"
    }, [this._renderLandingInfo(), createVNode("div", {
      "class": "py-24 px-10"
    }, [createVNode("h2", {
      "class": "text-2xl font-semibold mb-2 text-center"
    }, [this.scope.locale.Login()]), createVNode("div", {
      "class": "mb-4"
    }, [this._renderForm(), createVNode("div", {
      "class": "divider"
    }, [createTextVNode("OR")]), this._renderGithub()])])])])]);
  }
  _renderLandingInfo() {
    return createVNode("div", {
      "class": "min-h-full rounded-l-xl bg-base-200"
    }, [createVNode("div", {
      "class": "py-12"
    }, [createVNode("h1", {
      "class": "text-3xl text-center font-bold"
    }, [createTextVNode("Zova")]), createVNode("h5", {
      "class": "text-2xl text-center opacity-40"
    }, [createTextVNode("Less is more, while more is less")])])]);
  }
  _renderForm() {
    return createVNode(ZForm, {
      "data": this.user,
      "schema": this.schema,
      "formProvider": {
        behaviors: {
          formFieldLayout: "home-login:formFieldLayoutLogin"
        }
      },
      "onSubmitData": (data) => {
        return this.onSubmitLogin(data);
      },
      "onShowError": ({
        error
      }) => {
        window.alert(error.message);
      }
    }, {
      default: () => [createVNode(ZFormField, {
        "name": "username",
        "iconPrefix": ":daisy:person",
        "slotDefault": ({
          props
        }) => {
          return createVNode("input", mergeProps(props, {
            "type": "text",
            "class": "grow",
            "placeholder": this.scope.locale.YourUsername()
          }), null);
        }
      }, null), createVNode(ZFormField, {
        "name": "password",
        "class": "grow",
        "inputType": "password",
        "iconPrefix": ":daisy:lock"
      }, null), createVNode(ZFormFieldWrapper, {
        "name": "captcha"
      }, null), createVNode(ZFormSubscribe, {
        "slotDefault": ($$form) => {
          return createVNode("button", {
            "disabled": $$form.formState.isSubmitting,
            "type": "submit",
            "class": "btn mt-2 w-full btn-primary"
          }, [this.scope.locale.Login()]);
        }
      }, null)]
    });
  }
  _renderGithub() {
    return createVNode("button", {
      "class": "btn mt-2 w-full btn-default",
      "onClick": () => {
        this.onSubmitLoginGitHub();
      }
    }, [createVNode(ZIcon$1, {
      "name": ":auth:github"
    }, null), this.scope.locale.LoginGitHub()]);
  }
}) || _class$2) || _class$2);
const ZPageLogin = createZovaComponentPage(ControllerPageLogin, RenderPageLogin, void 0);
const routes = [
  //
  {
    path: "",
    component: ZPageLogin,
    meta: {
      layout: "empty",
      requiresAuth: false
    }
  }
];
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
const ZIcon = createZovaComponentAsync("a-icon", "icon");
let BehaviorFormFieldLayoutLogin = (_dec$1 = Behavior(), _dec2$1 = BeanInfo({
  module: "home-login"
}), _dec3 = Use({
  injectionScope: "host"
}), _dec4 = Reflect.metadata("design:type", typeof ControllerFormField === "undefined" ? Object : ControllerFormField), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class BehaviorFormFieldLayoutLogin2 extends BeanBehaviorBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$formField", _descriptor, this);
  }
  render(renderContext, next) {
    const field = this.$$formField.field;
    this._patchProps(renderContext);
    const vnode = next(renderContext);
    const iconPrefix = renderContext.propsBucket.iconPrefix;
    const error = field.state.meta.errors[0];
    return createVNode("label", {
      "class": "input input-bordered flex items-center gap-2 w-full"
    }, [createVNode(ZIcon, {
      "class": "opacity-70",
      "name": iconPrefix,
      "width": 16
    }, null), vnode, !field.state.meta.isValid && createVNode("div", {
      "class": "label"
    }, [createVNode("span", {
      "class": "label-text-alt text-error"
    }, [error?.message])])]);
  }
  _patchProps(renderContext) {
    const field = this.$$formField.field;
    if (renderContext.propsBucket.renderProvider === "input") {
      this._patchProps_input(field, renderContext);
    }
  }
  _patchProps_input(_field, _renderContext) {
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$formField", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
var _dec, _dec2, _class;
const pagePathSchemas = {};
const pageNameSchemas = {};
let ScopeModuleHomeLogin = (_dec = Scope(), _dec2 = BeanInfo({
  module: "home-login"
}), _dec(_class = _dec2(_class = class ScopeModuleHomeLogin2 extends BeanScopeBase {
}) || _class) || _class);
function locale(key) {
  return `home-login::${key}`;
}
const locale_en_us = {
  YourUsername: "Your Username",
  YourPassword: "Your Password",
  Login: "Login",
  LoginGitHub: "Sign in with GitHub"
};
const locale_zh_cn = {
  YourUsername: "您的用户名",
  YourPassword: "您的密码",
  Login: "登录",
  LoginGitHub: "使用GitHub登录"
};
const locales = {
  "en-us": locale_en_us,
  "zh-cn": locale_zh_cn
};
function $useLocale(key, ...args) {
  const app = useApp();
  const str = `home-login::${key}`;
  return useComputed(() => {
    return app.meta.text(str, ...args);
  });
}
export {
  $useLocale,
  BehaviorFormFieldLayoutLogin,
  ControllerPageLogin,
  RenderPageLogin,
  ScopeModuleHomeLogin,
  ZPageLogin,
  locale,
  locales,
  pageNameSchemas,
  pagePathSchemas,
  routes
};
