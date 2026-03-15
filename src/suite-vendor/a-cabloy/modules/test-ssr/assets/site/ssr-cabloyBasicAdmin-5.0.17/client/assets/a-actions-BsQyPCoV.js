import { Action } from "./a-action-8vTCicfl.js";
import { n as BeanBase, al as Preload, l as BeanInfo, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$1, _dec2$1, _dec3, _class$1;
let ActionLog = (_dec$1 = Action(), _dec2$1 = Preload(), _dec3 = BeanInfo({
  module: "a-actions"
}), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3(_class$1 = class ActionLog2 extends BeanBase {
  execute(options, _renderContext, next) {
    this.$logger.silly(options.message === void 0 ? "" : {
      message: options.message
    });
    return next();
  }
}) || _class$1) || _class$1) || _class$1);
var _dec, _dec2, _class;
let ScopeModuleAActions = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-actions"
}), _dec(_class = _dec2(_class = class ScopeModuleAActions2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ActionLog,
  ScopeModuleAActions
};
