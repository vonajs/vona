import { m as cast, l as BeanInfo, a2 as $customKey, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { BeanInterceptorBase, SymbolInterceptorBodyResponseFlag, Interceptor } from "./a-fetch-Df1cb9Db.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./axios-hebYYykT.js";
var _dec$5, _dec2$5, _class$5;
let InterceptorBody = (_dec$5 = Interceptor({
  dependencies: "a-interceptor:performAction"
}), _dec2$5 = BeanInfo({
  module: "a-interceptor"
}), _dec$5(_class$5 = _dec2$5(_class$5 = class InterceptorBody2 extends BeanInterceptorBase {
  async onResponse(response, _options, next) {
    response = await next();
    const contentType = response.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      response[SymbolInterceptorBodyResponseFlag] = true;
      return response;
    }
    if (response.data.code !== 0) {
      const error = new Error();
      error.code = response.data.code;
      error.message = response.data.message;
      throw error;
    }
    return response.data.data ?? null;
  }
  async onResponseError(error, _options, next) {
    error = await next();
    if (!(error instanceof Error)) return error;
    if (error.response) {
      error.code = cast(error.response.data)?.code ?? error.response.status;
      error.message = cast(error.response.data)?.message ?? error.response.statusText;
    }
    return error;
  }
}) || _class$5) || _class$5);
var _dec$4, _dec2$4, _class$4;
let InterceptorHeaders = (_dec$4 = Interceptor({
  dependencies: "a-interceptor:mock"
}), _dec2$4 = BeanInfo({
  module: "a-interceptor"
}), _dec$4(_class$4 = _dec2$4(_class$4 = class InterceptorHeaders2 extends BeanInterceptorBase {
  async onRequest(config2, options, next) {
    const keyLocale = this.sys.env.APP_LOCALE_HEADER_KEY;
    if (keyLocale && !config2.headers[keyLocale]) {
      config2.headers[keyLocale] = this.app.meta.locale.current;
    }
    const keyTz = this.sys.env.APP_TZ_HEADER_KEY;
    if (keyTz && !config2.headers[keyTz]) {
      config2.headers[keyTz] = this.app.meta.locale.tz;
    }
    if (options.openapiSchema) {
      config2.headers[$customKey("x-vona-openapi-schema")] = true;
    }
    return next(config2);
  }
}) || _class$4) || _class$4);
var _dec$3, _dec2$3, _class$3;
let InterceptorJwt = (_dec$3 = Interceptor({
  dependencies: "a-interceptor:headers"
}), _dec2$3 = BeanInfo({
  module: "a-interceptor"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class InterceptorJwt2 extends BeanInterceptorBase {
  constructor(...args) {
    super(...args);
    this._beanJwtAdapter = void 0;
    this._refreshAuthTokenPromise = void 0;
  }
  async __init__(_beanFetch, options) {
    const jwtAdapter = options.jwtAdapter || this.scope.config.jwtAdapter;
    const beanFullName = jwtAdapter.replace(":", ".service.");
    this._beanJwtAdapter = await this.app.bean._getBean(beanFullName, true);
  }
  async onRequest(config2, options, next) {
    try {
      const accessToken = await this.prepareAccessToken(config2, options.authToken);
      if (accessToken) {
        config2.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      error.config = config2;
      error.request = void 0;
      error.response = void 0;
      throw error;
    }
    return next(config2);
  }
  async prepareAccessToken(config2, authToken) {
    if (!this.sys.config.api.jwt) return;
    const authTokenCurrent = authToken ?? this.scope.config.authToken.default;
    if (typeof authTokenCurrent === "string") return authTokenCurrent;
    let jwtInfo = await this._beanJwtAdapter.getJwtInfo();
    if (!jwtInfo) {
      if (authToken === true) {
        this.app.throw(401);
      }
      return;
    }
    if (!jwtInfo.expireTime || jwtInfo.expireTime > Date.now()) {
      if (!jwtInfo.accessToken) {
        if (authToken === true) this.app.throw(401);
        return;
      }
      return jwtInfo.accessToken;
    }
    if (!jwtInfo.refreshToken) {
      if (authToken === true) this.app.throw(401);
      return;
    } else {
      if (authToken === false) {
        return;
      }
    }
    jwtInfo = await this._refreshAuthToken(jwtInfo.refreshToken);
    return jwtInfo.accessToken;
  }
  async _refreshAuthToken(refreshToken) {
    if (!this._refreshAuthTokenPromise) {
      this._refreshAuthTokenPromise = this._refreshAuthTokenInner(refreshToken);
    }
    return await this._refreshAuthTokenPromise;
  }
  async _refreshAuthTokenInner(refreshToken) {
    try {
      return await this._beanJwtAdapter.refreshAuthToken(refreshToken);
    } finally {
      this._refreshAuthTokenPromise = void 0;
    }
  }
}) || _class$3) || _class$3);
var _dec$2, _dec2$2, _class$2;
const __ErrorsShouldBeMocked = ["ECONNREFUSED", "ERR_NETWORK", "404"];
let InterceptorMock = (_dec$2 = Interceptor(), _dec2$2 = BeanInfo({
  module: "a-interceptor"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class InterceptorMock2 extends BeanInterceptorBase {
  async onResponseError(error, _options, next) {
    if (!(error instanceof Error)) return next();
    if (this.sys.env.MOCK_ENABLED === "true") {
      if (this.sys.env.MOCK_BUILD === "true") {
        if (__ErrorsShouldBeMocked.includes(String(error.code)) || error.status === 404) {
          const config2 = error.config;
          if (config2.baseURL) {
            const port = this.sys.env.MOCK_BUILD_PORT;
            let baseURL = `http://localhost:${port}`;
            if (config2.baseURL.endsWith(this.sys.env.API_PREFIX)) {
              baseURL = `${baseURL}${this.sys.env.API_PREFIX}`;
            }
            if (config2.baseURL !== baseURL && config2.baseURL !== this.sys.env.API_PREFIX) {
              const response = await this.$fetch.request(Object.assign({}, config2, {
                baseURL
              }));
              if (response && response[SymbolInterceptorBodyResponseFlag]) {
                return response.data;
              } else {
                return response;
              }
            }
          }
        }
      }
    }
    return next();
  }
}) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let InterceptorPerformAction = (_dec$1 = Interceptor({
  dependencies: "a-interceptor:jwt"
}), _dec2$1 = BeanInfo({
  module: "a-interceptor"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class InterceptorPerformAction2 extends BeanInterceptorBase {
  async onRequest(config2, _options, next) {
    return next();
  }
}) || _class$1) || _class$1);
const config = (_sys) => {
  return {
    jwtAdapter: "home-api:jwtAdapter",
    authToken: {
      default: true
    }
  };
};
var _dec, _dec2, _class;
let ScopeModuleAInterceptor = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-interceptor"
}), _dec(_class = _dec2(_class = class ScopeModuleAInterceptor2 extends BeanScopeBase {
}) || _class) || _class);
export {
  InterceptorBody,
  InterceptorHeaders,
  InterceptorJwt,
  InterceptorMock,
  InterceptorPerformAction,
  ScopeModuleAInterceptor,
  config
};
