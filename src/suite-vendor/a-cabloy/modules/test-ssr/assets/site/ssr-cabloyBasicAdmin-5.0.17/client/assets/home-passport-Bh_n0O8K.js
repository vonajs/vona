import { a8 as combineQueries, o as isNil, l as BeanInfo, B as BeanSimple, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { BeanModelBase, Model } from "./a-model-DdQjWvuo.js";
import { ApiApiHomeUserPassportloginOauthPath, OpenApiBaseURL } from "./home-api-BsWdi2ni.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
import "./a-api-DhA-gIeb.js";
var _dec$1, _dec2$1, _class$1;
let ModelPassport = (_dec$1 = Model(), _dec2$1 = BeanInfo({
  module: "home-passport"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ModelPassport2 extends BeanModelBase {
  constructor(...args) {
    super(...args);
    this.passport = void 0;
    this.jwt = void 0;
    this.accessToken = void 0;
    this.expireTime = void 0;
    this.schemaLogin = void 0;
  }
  async __init__() {
    this.schemaLogin = this.$useComputed(() => {
      return this.apiSchemasLogin.requestBody;
    });
    this.passport = this.$useStateLocal({
      queryKey: ["passport"]
    });
    this.jwt = this.$useStateLocal({
      queryKey: ["jwt"]
    });
    this.expireTime = this.$useStateLocal({
      queryKey: ["expireTime"]
    });
    this.accessToken = this.$useStateCookie({
      queryKey: ["token"]
    });
    {
      this._setLocaleTz();
    }
  }
  get apiSchemasLogin() {
    return this.$apiSchema.homeUserPassport.login({
      authToken: false
    });
  }
  login() {
    return this.$useMutationData({
      mutationKey: ["login"],
      mutationFn: async (params) => {
        return this.$api.homeUserPassport.login(params, {
          authToken: false
        });
      },
      onSuccess: (data) => {
        this.afterLogin(data);
      }
    });
  }
  loginByOauthCode() {
    return this.$useMutationData({
      mutationKey: ["loginByOauthCode"],
      mutationFn: async (params) => {
        return this.$api.homeUserPassport.createPassportJwtFromOauthCode(params, {
          authToken: false
        });
      },
      onSuccess: (data) => {
        this.afterLogin(data);
      }
    });
  }
  getOauthLoginUrl(module, providerName, clientName) {
    const apiPath = this.sys.util.apiActionPathTranslate(ApiApiHomeUserPassportloginOauthPath, {
      module,
      providerName,
      clientName
    });
    const returnTo = this.app.$getReturnTo();
    const redirect = this.$router.getPagePath("/home/base/authCallback", {
      query: {
        returnTo
      }
    }, true);
    return combineQueries(`${OpenApiBaseURL(this.sys)}${apiPath}`, {
      redirect
    });
  }
  afterLogin(data) {
    this._setPassportJwt(data);
    this.app.$gotoReturnTo();
  }
  logout() {
    return this.$useMutationData({
      mutationKey: ["logout"],
      mutationFn: async () => {
        await this.$api.homeUserPassport.logout();
      },
      onSuccess: async () => {
        this._setPassportJwt();
        await this.app.$gotoLogin();
        this.$clear();
      }
    });
  }
  get isAuthenticated() {
    return !!this.passport;
  }
  get user() {
    return this.passport?.user;
  }
  get roles() {
    return this.passport?.roles;
  }
  async getJwtInfo() {
    if (!this.accessToken) return void 0;
    return {
      accessToken: this.accessToken,
      refreshToken: this.jwt?.refreshToken,
      expiresIn: this.jwt?.expiresIn,
      expireTime: this.expireTime
    };
  }
  async refreshAuthToken(refreshToken) {
    const jwt = await this.$api.homeUserPassport.refreshAuthToken({
      refreshToken
    }, {
      authToken: false
    });
    this._setJwt(jwt);
    return await this.getJwtInfo();
  }
  async ensurePassport() {
    return this.passport;
  }
  _setLocaleTz() {
    const user = this.passport?.user;
    if (!user) return;
    if (user.locale) {
      const cookieLocale = this.app.meta.cookie.getItem(this.sys.config.locale.storeKey);
      if (!cookieLocale) {
        this.app.meta.locale.current = user.locale;
      }
    }
    if (user.tz) {
      const cookieTz = this.app.meta.cookie.getItem(this.sys.config.tz.storeKey);
      if (!cookieTz) {
        this.app.meta.locale.tz = user.tz;
      }
    }
  }
  _setPassportJwt(data) {
    this._setPassport(data?.passport);
    this._setJwt(data?.jwt);
  }
  _setPassport(passport) {
    if (passport) {
      this.passport = passport;
    } else {
      this.passport = void 0;
    }
  }
  _setJwt(jwt) {
    if (jwt) {
      this.jwt = jwt;
      this.expireTime = Date.now() + (jwt.expiresIn - this.scope.config.accessToken.expireTimeDelay) * 1e3;
      this.accessToken = jwt.accessToken;
    } else {
      this.jwt = void 0;
      this.expireTime = void 0;
      this.accessToken = void 0;
    }
  }
  checkPermission(permissions, actionName) {
    if (isNil(permissions)) return false;
    if (permissions === false) return false;
    if (permissions === true) return true;
    if (permissions.roleIds && permissions.roleIds.some((roleId) => this.roles?.some((role) => role.id === roleId))) return true;
    if (permissions.roleNames && permissions.roleNames.some((roleName) => this.roles?.some((role) => role.name === roleName))) return true;
    if (permissions.actions && !!permissions.actions[actionName]) return true;
    return false;
  }
}) || _class$1) || _class$1);
const config = (_sys) => {
  return {
    accessToken: {
      expireTimeDelay: 2 * 60
    }
  };
};
class Monkey extends BeanSimple {
  constructor(moduleSelf) {
    super();
    this._moduleSelf = void 0;
    this.$$modelPassport = void 0;
    this._moduleSelf = moduleSelf;
  }
  async getModelPassport() {
    if (!this.$$modelPassport) {
      this.$$modelPassport = await this.bean._getBean("home-passport.model.passport", true);
    }
    return this.$$modelPassport;
  }
  async moduleLoading(_module) {
  }
  async moduleLoaded(module) {
    if (this._moduleSelf === module) {
      await this.getModelPassport();
    }
  }
  async beanInit(bean, beanInstance) {
    const self = this;
    bean.defineProperty(beanInstance, "$passport", {
      enumerable: false,
      configurable: true,
      get() {
        return self.$$modelPassport;
      }
    });
  }
}
var _dec, _dec2, _class;
let ScopeModuleHomePassport = (_dec = Scope(), _dec2 = BeanInfo({
  module: "home-passport"
}), _dec(_class = _dec2(_class = class ScopeModuleHomePassport2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ModelPassport,
  Monkey,
  ScopeModuleHomePassport,
  config
};
