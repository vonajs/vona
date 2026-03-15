import { Z as BeanControllerPageBase, l as BeanInfo, ae as createZovaComponentPage, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { P as createVNode, N as createTextVNode } from "./vue-CRNsYCTs.js";
import { Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$1, _dec2$1, _class$1;
let ControllerPageHome = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "home-index"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ControllerPageHome2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.message = void 0;
  }
  async __init__() {
    this.message = "Hello Zova";
  }
  render() {
    return createVNode("div", {
      "style": "text-align: center;"
    }, [createVNode("div", null, [createVNode("div", {
      "style": "font-size: 36px;"
    }, [this.message]), createVNode("div", {
      "style": "font-size: 24px;opacity:.4;"
    }, [createTextVNode("Less is more, while more is less")])])]);
  }
}) || _class$1) || _class$1);
const ZPageHome = createZovaComponentPage(ControllerPageHome, void 0, void 0);
const routes = [
  //
  {
    path: "",
    component: ZPageHome
  }
];
var _dec, _dec2, _class;
const pagePathSchemas = {};
const pageNameSchemas = {};
let ScopeModuleHomeIndex = (_dec = Scope(), _dec2 = BeanInfo({
  module: "home-index"
}), _dec(_class = _dec2(_class = class ScopeModuleHomeIndex2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ControllerPageHome,
  ScopeModuleHomeIndex,
  ZPageHome,
  pageNameSchemas,
  pagePathSchemas,
  routes
};
