import { l as BeanInfo, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { BeanBehaviorBase, Behavior } from "./a-behavior-BVEM_kq-.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./a-logger-CYjH9aBA.js";
var _dec$1, _dec2$1, _class$1;
let BehaviorFocus = (_dec$1 = Behavior(), _dec2$1 = BeanInfo({
  module: "a-behaviors"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class BehaviorFocus2 extends BeanBehaviorBase {
  constructor(...args) {
    super(...args);
    this.inputRef = void 0;
  }
  render(props, next) {
    const refOuter = props?.ref;
    props = {
      ...props,
      ref: (ref) => {
        if (this.$options.always || !this.inputRef) {
          ref.focus?.();
        }
        this.inputRef = ref;
        refOuter?.(ref);
      }
    };
    return next(props);
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
let ScopeModuleABehaviors = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-behaviors"
}), _dec(_class = _dec2(_class = class ScopeModuleABehaviors2 extends BeanScopeBase {
}) || _class) || _class);
export {
  BehaviorFocus,
  ScopeModuleABehaviors
};
