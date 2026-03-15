import { n as BeanBase, l as BeanInfo, v as BeanScopeBase, aa as useApp, a7 as useComputed } from "./zova-QgocPMzS.js";
import { z } from "./zod-DcU_E_GK.js";
import { Tool, Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
var _dec$1, _dec2$1, _class$1;
let ToolV = (_dec$1 = Tool(), _dec2$1 = BeanInfo({
  module: "a-zod"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ToolV2 extends BeanBase {
  async __init__() {
  }
  required(schema, params) {
    params = params || this.scope.locale.ZodErrorRequired();
    schema._zod.def.error = z.util.normalizeParams(params).error;
    return schema;
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
let ScopeModuleAZod = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-zod"
}), _dec(_class = _dec2(_class = class ScopeModuleAZod2 extends BeanScopeBase {
}) || _class) || _class);
function locale(key) {
  return `a-zod::${key}`;
}
const locale_en_us = {
  ZodErrorRequired: "Required"
};
const locale_zh_cn = {
  ZodErrorRequired: "必填项"
};
const locales = {
  "en-us": locale_en_us,
  "zh-cn": locale_zh_cn
};
function $useLocale(key, ...args) {
  const app = useApp();
  const str = `a-zod::${key}`;
  return useComputed(() => {
    return app.meta.text(str, ...args);
  });
}
export {
  $useLocale,
  ScopeModuleAZod,
  ToolV,
  locale,
  locales
};
