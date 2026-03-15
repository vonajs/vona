import { n as BeanBase, V as Virtual, l as BeanInfo, B as BeanSimple, m as cast, j as appResource, v as BeanScopeBase, d as createBeanDecorator } from "./zova-QgocPMzS.js";
import { Bean, Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$1, _dec2$1, _dec3, _class$1;
let BeanApiBase = (_dec$1 = Bean(), _dec2$1 = Virtual(), _dec3 = BeanInfo({
  module: "a-api"
}), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3(_class$1 = class BeanApiBase2 extends BeanBase {
  $pathTranslate(pathName, pathParams) {
    return this.sys.util.apiActionPathTranslate(pathName, pathParams);
  }
  $configPrepare(baseURL, options, authToken) {
    return this.sys.util.apiActionConfigPrepare(baseURL, options, authToken);
  }
  $formData(body) {
    const formData = new FormData();
    for (const key in body) {
      const value = body[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          formData.append(key, item);
        }
      } else {
        formData.append(key, value);
      }
    }
    return formData;
  }
}) || _class$1) || _class$1) || _class$1);
const config = (_sys) => {
  return {
    defaultModuleApi: "home-api"
  };
};
const __ThisModule__ = "a-api";
class Monkey extends BeanSimple {
  constructor(moduleSelf) {
    super();
    this._moduleSelf = void 0;
    this._defaultModuleApi = void 0;
    this._moduleSelf = moduleSelf;
  }
  async moduleLoading(_module) {
  }
  async moduleLoaded(module) {
    const promises = [];
    promises.push(this._loadApis(module, "api"));
    promises.push(this._loadApis(module, "apiSchema"));
    await Promise.all(promises);
    if (this._moduleSelf === module) {
      const scopeSelf = await this.bean.getScope(__ThisModule__);
      this._defaultModuleApi = scopeSelf.config.defaultModuleApi;
      await this.app.meta.module.use(this._defaultModuleApi);
    }
  }
  async beanInit(bean, beanInstance) {
    const self = this;
    for (const sceneName of ["api", "apiSchema"]) {
      bean.defineProperty(beanInstance, `$${sceneName}`, {
        enumerable: false,
        configurable: true,
        get() {
          return cast(self.app.bean.scope(self._defaultModuleApi))[sceneName];
        }
      });
    }
  }
  async _loadApis(module, sceneName) {
    const onions = appResource.scenes[sceneName]?.[module.info.relativeName];
    if (!onions) return;
    const scope = this.bean.scope(module.info.relativeName);
    const beanFullNames = Object.keys(onions);
    const promises = [];
    for (const beanFullName of beanFullNames) {
      promises.push(this.bean._getBean(beanFullName, true));
    }
    const values = await Promise.all(promises);
    for (let index = 0; index < beanFullNames.length; index++) {
      const beanFullName = beanFullNames[index];
      const beanOptions = onions[beanFullName];
      scope[sceneName][beanOptions.name] = values[index];
    }
  }
}
var _dec, _dec2, _class;
let ScopeModuleAApi = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-api"
}), _dec(_class = _dec2(_class = class ScopeModuleAApi2 extends BeanScopeBase {
}) || _class) || _class);
function Api() {
  return createBeanDecorator("api", "app");
}
function ApiMeta() {
  return createBeanDecorator("apiMeta", "app");
}
function ApiSchema() {
  return createBeanDecorator("apiSchema", "app");
}
export {
  Api,
  ApiMeta,
  ApiSchema,
  BeanApiBase,
  Monkey,
  ScopeModuleAApi,
  config
};
