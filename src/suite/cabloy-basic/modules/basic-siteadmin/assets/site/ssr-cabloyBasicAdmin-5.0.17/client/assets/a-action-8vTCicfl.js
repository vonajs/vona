import { I as beanFullNameFromOnionName, h as deepExtend, B as BeanSimple, m as cast, v as BeanScopeBase, l as BeanInfo, d as createBeanDecorator } from "./zova-QgocPMzS.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
function $performAction(sys, actionName, options, renderContext, next) {
  if (!next) {
    next = (actionRes) => {
      return actionRes;
    };
  }
  const beanFullName = beanFullNameFromOnionName(actionName, "action");
  const beanInstance = sys.bean._getBeanSyncOnly(beanFullName);
  if (beanInstance) {
    return _renderEventActionNormal_inner(beanInstance, options, renderContext, next);
  }
  return sys.bean._getBean(beanFullName, false).then((beanInstance2) => {
    return _renderEventActionNormal_inner(beanInstance2, options, renderContext, next);
  });
}
function _renderEventActionNormal_inner(beanInstance, options, renderContext, next) {
  const onionOptions = beanInstance.$onionOptions;
  const props = onionOptions ? deepExtend({}, onionOptions, options) : options ?? {};
  return beanInstance.execute(props, renderContext, next);
}
class Monkey extends BeanSimple {
  async beanInit(bean, beanInstance) {
    const self = this;
    bean.defineProperty(beanInstance, "$performAction", {
      enumerable: false,
      configurable: true,
      get() {
        return function(actionName, options, renderContext, next) {
          renderContext = Object.assign({
            app: cast(beanInstance).app,
            ctx: cast(beanInstance).ctx,
            $host: beanInstance
          }, renderContext);
          return $performAction(self.sys, actionName, options, renderContext, next);
        };
      }
    });
  }
}
var _dec, _dec2, _class;
let ScopeModuleAAction = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-action"
}), _dec(_class = _dec2(_class = class ScopeModuleAAction2 extends BeanScopeBase {
}) || _class) || _class);
function Action(options) {
  return createBeanDecorator("action", "sys", true, options);
}
const SymbolActionResult = /* @__PURE__ */ Symbol("SymbolActionResult");
export {
  $performAction,
  Action,
  Monkey,
  ScopeModuleAAction,
  SymbolActionResult
};
