import { l as BeanInfo, n as BeanBase, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { BeanApiBase, Api, ApiSchema } from "./a-api-DhA-gIeb.js";
import { Service, Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
const OpenApiBaseURL = (sys) => {
  return sys.util.getOpenApiBaseURL("OPENAPI_BASE_URL_HOME_API");
};
var _dec$d, _dec2$d, _class$d;
const ApiApiCaptchacreatePath = "/api/captcha/create";
const ApiApiCaptcharefreshPath = "/api/captcha/refresh";
const ApiApiCaptchaverifyImmediatePath = "/api/captcha/verifyImmediate";
let ApiCaptcha = (_dec$d = Api(), _dec2$d = BeanInfo({
  module: "home-api"
}), _dec$d(_class$d = _dec2$d(_class$d = class ApiCaptcha2 extends BeanApiBase {
  create(body, options) {
    return this.$fetch.post(ApiApiCaptchacreatePath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
  refresh(body, options) {
    return this.$fetch.post(ApiApiCaptcharefreshPath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
  verifyImmediate(body, options) {
    return this.$fetch.post(ApiApiCaptchaverifyImmediatePath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
}) || _class$d) || _class$d);
var _dec$c, _dec2$c, _class$c;
const ApiApiHomeindexPath = "/";
let ApiHome = (_dec$c = Api(), _dec2$c = BeanInfo({
  module: "home-api"
}), _dec$c(_class$c = _dec2$c(_class$c = class ApiHome2 extends BeanApiBase {
  /** @description Home */
  index(options) {
    return this.$fetch.get(ApiApiHomeindexPath, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
}) || _class$c) || _class$c);
var _dec$b, _dec2$b, _class$b;
const ApiApiHomeBaseMenuretrieveMenusPath = "/api/home/base/menu/{publicPath?}";
let ApiHomeBaseMenu = (_dec$b = Api(), _dec2$b = BeanInfo({
  module: "home-api"
}), _dec$b(_class$b = _dec2$b(_class$b = class ApiHomeBaseMenu2 extends BeanApiBase {
  retrieveMenus(options) {
    return this.$fetch.get(this.$pathTranslate(ApiApiHomeBaseMenuretrieveMenusPath, options.params), this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
}) || _class$b) || _class$b);
var _dec$a, _dec2$a, _class$a;
const ApiApiHomeBasePermissionretrievePermissionsPath = "/api/home/base/permission/{resource}";
let ApiHomeBasePermission = (_dec$a = Api(), _dec2$a = BeanInfo({
  module: "home-api"
}), _dec$a(_class$a = _dec2$a(_class$a = class ApiHomeBasePermission2 extends BeanApiBase {
  retrievePermissions(options) {
    return this.$fetch.get(this.$pathTranslate(ApiApiHomeBasePermissionretrievePermissionsPath, options.params), this.$configPrepare(OpenApiBaseURL(this.sys), options, true));
  }
}) || _class$a) || _class$a);
var _dec$9, _dec2$9, _class$9;
const ApiApiHomeUserPassportcurrentPath = "/api/home/user/passport/current";
const ApiApiHomeUserPassportlogoutPath = "/api/home/user/passport/logout";
const ApiApiHomeUserPassportregisterPath = "/api/home/user/passport/register";
const ApiApiHomeUserPassportloginPath = "/api/home/user/passport/login";
const ApiApiHomeUserPassportloginOauthPath = "/api/home/user/passport/login/{module}/{providerName}/{clientName?}";
const ApiApiHomeUserPassportassociatePath = "/api/home/user/passport/associate/{module}/{providerName}/{clientName?}";
const ApiApiHomeUserPassportmigratePath = "/api/home/user/passport/migrate/{module}/{providerName}/{clientName?}";
const ApiApiHomeUserPassportrefreshAuthTokenPath = "/api/home/user/passport/refreshAuthToken";
const ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath = "/api/home/user/passport/createPassportJwtFromOauthCode";
const ApiApiHomeUserPassportcreateTempAuthTokenPath = "/api/home/user/passport/createTempAuthToken";
let ApiHomeUserPassport = (_dec$9 = Api(), _dec2$9 = BeanInfo({
  module: "home-api"
}), _dec$9(_class$9 = _dec2$9(_class$9 = class ApiHomeUserPassport2 extends BeanApiBase {
  current(options) {
    return this.$fetch.get(ApiApiHomeUserPassportcurrentPath, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
  logout(body, options) {
    return this.$fetch.post(ApiApiHomeUserPassportlogoutPath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options, true));
  }
  register(body, options) {
    return this.$fetch.post(ApiApiHomeUserPassportregisterPath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
  login(body, options) {
    return this.$fetch.post(ApiApiHomeUserPassportloginPath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
  loginOauth(options) {
    return this.$fetch.get(this.$pathTranslate(ApiApiHomeUserPassportloginOauthPath, options.params), this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
  associate(options) {
    return this.$fetch.get(this.$pathTranslate(ApiApiHomeUserPassportassociatePath, options.params), this.$configPrepare(OpenApiBaseURL(this.sys), options, true));
  }
  migrate(options) {
    return this.$fetch.get(this.$pathTranslate(ApiApiHomeUserPassportmigratePath, options.params), this.$configPrepare(OpenApiBaseURL(this.sys), options, true));
  }
  refreshAuthToken(body, options) {
    return this.$fetch.post(ApiApiHomeUserPassportrefreshAuthTokenPath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
  createPassportJwtFromOauthCode(body, options) {
    return this.$fetch.post(ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options));
  }
  createTempAuthToken(body, options) {
    return this.$fetch.post(ApiApiHomeUserPassportcreateTempAuthTokenPath, body, this.$configPrepare(OpenApiBaseURL(this.sys), options, true));
  }
}) || _class$9) || _class$9);
var _dec$8, _dec2$8, _class$8;
const ApiApiTestSsrToolOnetestGetPath = "/api/test/ssr/toolOne/test/{id?}";
const ApiApiTestSsrToolOnetestPath = "/api/test/ssr/toolOne/test/{id?}";
let ApiTestSsrToolOne = (_dec$8 = Api(), _dec2$8 = BeanInfo({
  module: "home-api"
}), _dec$8(_class$8 = _dec2$8(_class$8 = class ApiTestSsrToolOne2 extends BeanApiBase {
  testGet(options) {
    return this.$fetch.get(this.$pathTranslate(ApiApiTestSsrToolOnetestGetPath, options.params), this.$configPrepare(OpenApiBaseURL(this.sys), options, true));
  }
  test(body, options) {
    return this.$fetch.post(this.$pathTranslate(ApiApiTestSsrToolOnetestPath, options.params), body, this.$configPrepare(OpenApiBaseURL(this.sys), options, true));
  }
}) || _class$8) || _class$8);
var _dec$7, _dec2$7, _class$7;
let ApiSchemaCaptcha = (_dec$7 = ApiSchema(), _dec2$7 = BeanInfo({
  module: "home-api"
}), _dec$7(_class$7 = _dec2$7(_class$7 = class ApiSchemaCaptcha2 extends BeanBase {
  create(options) {
    return this.$sdk.createApiSchemas(ApiApiCaptchacreatePath, "post", options);
  }
  refresh(options) {
    return this.$sdk.createApiSchemas(ApiApiCaptcharefreshPath, "post", options);
  }
  verifyImmediate(options) {
    return this.$sdk.createApiSchemas(ApiApiCaptchaverifyImmediatePath, "post", options);
  }
}) || _class$7) || _class$7);
var _dec$6, _dec2$6, _class$6;
let ApiSchemaHome = (_dec$6 = ApiSchema(), _dec2$6 = BeanInfo({
  module: "home-api"
}), _dec$6(_class$6 = _dec2$6(_class$6 = class ApiSchemaHome2 extends BeanBase {
  index(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeindexPath, "get", options);
  }
}) || _class$6) || _class$6);
var _dec$5, _dec2$5, _class$5;
let ApiSchemaHomeBaseMenu = (_dec$5 = ApiSchema(), _dec2$5 = BeanInfo({
  module: "home-api"
}), _dec$5(_class$5 = _dec2$5(_class$5 = class ApiSchemaHomeBaseMenu2 extends BeanBase {
  retrieveMenus(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeBaseMenuretrieveMenusPath, "get", options);
  }
}) || _class$5) || _class$5);
var _dec$4, _dec2$4, _class$4;
let ApiSchemaHomeBasePermission = (_dec$4 = ApiSchema(), _dec2$4 = BeanInfo({
  module: "home-api"
}), _dec$4(_class$4 = _dec2$4(_class$4 = class ApiSchemaHomeBasePermission2 extends BeanBase {
  retrievePermissions(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeBasePermissionretrievePermissionsPath, "get", options);
  }
}) || _class$4) || _class$4);
var _dec$3, _dec2$3, _class$3;
let ApiSchemaHomeUserPassport = (_dec$3 = ApiSchema(), _dec2$3 = BeanInfo({
  module: "home-api"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class ApiSchemaHomeUserPassport2 extends BeanBase {
  current(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcurrentPath, "get", options);
  }
  logout(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportlogoutPath, "post", options);
  }
  register(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportregisterPath, "post", options);
  }
  login(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportloginPath, "post", options);
  }
  loginOauth(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportloginOauthPath, "get", options);
  }
  associate(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportassociatePath, "get", options);
  }
  migrate(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportmigratePath, "get", options);
  }
  refreshAuthToken(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportrefreshAuthTokenPath, "post", options);
  }
  createPassportJwtFromOauthCode(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath, "post", options);
  }
  createTempAuthToken(options) {
    return this.$sdk.createApiSchemas(ApiApiHomeUserPassportcreateTempAuthTokenPath, "post", options);
  }
}) || _class$3) || _class$3);
var _dec$2, _dec2$2, _class$2;
let ApiSchemaTestSsrToolOne = (_dec$2 = ApiSchema(), _dec2$2 = BeanInfo({
  module: "home-api"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class ApiSchemaTestSsrToolOne2 extends BeanBase {
  testGet(options) {
    return this.$sdk.createApiSchemas(ApiApiTestSsrToolOnetestGetPath, "get", options);
  }
  test(options) {
    return this.$sdk.createApiSchemas(ApiApiTestSsrToolOnetestPath, "post", options);
  }
}) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let ServiceJwtAdapter = (_dec$1 = Service(), _dec2$1 = BeanInfo({
  module: "home-api"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ServiceJwtAdapter2 extends BeanBase {
  async __init__() {
  }
  async getJwtInfo() {
    return await this.$passport.getJwtInfo();
  }
  async refreshAuthToken(refreshToken) {
    return await this.$passport.refreshAuthToken(refreshToken);
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
let ScopeModuleHomeApi = (_dec = Scope(), _dec2 = BeanInfo({
  module: "home-api"
}), _dec(_class = _dec2(_class = class ScopeModuleHomeApi2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ApiApiCaptchacreatePath,
  ApiApiCaptcharefreshPath,
  ApiApiCaptchaverifyImmediatePath,
  ApiApiHomeBaseMenuretrieveMenusPath,
  ApiApiHomeBasePermissionretrievePermissionsPath,
  ApiApiHomeUserPassportassociatePath,
  ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath,
  ApiApiHomeUserPassportcreateTempAuthTokenPath,
  ApiApiHomeUserPassportcurrentPath,
  ApiApiHomeUserPassportloginOauthPath,
  ApiApiHomeUserPassportloginPath,
  ApiApiHomeUserPassportlogoutPath,
  ApiApiHomeUserPassportmigratePath,
  ApiApiHomeUserPassportrefreshAuthTokenPath,
  ApiApiHomeUserPassportregisterPath,
  ApiApiHomeindexPath,
  ApiApiTestSsrToolOnetestGetPath,
  ApiApiTestSsrToolOnetestPath,
  ApiCaptcha,
  ApiHome,
  ApiHomeBaseMenu,
  ApiHomeBasePermission,
  ApiHomeUserPassport,
  ApiSchemaCaptcha,
  ApiSchemaHome,
  ApiSchemaHomeBaseMenu,
  ApiSchemaHomeBasePermission,
  ApiSchemaHomeUserPassport,
  ApiSchemaTestSsrToolOne,
  ApiTestSsrToolOne,
  OpenApiBaseURL,
  ScopeModuleHomeApi,
  ServiceJwtAdapter
};
