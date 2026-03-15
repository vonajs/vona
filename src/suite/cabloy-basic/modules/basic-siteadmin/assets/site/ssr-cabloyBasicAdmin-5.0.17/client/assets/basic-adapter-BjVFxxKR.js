import { B as BeanSimple, h as deepExtend, v as BeanScopeBase, l as BeanInfo } from "./zova-QgocPMzS.js";
import { Scope } from "./a-bean-Bxu0OKjI.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
class MonkeySys extends BeanSimple {
  async sysInitialize() {
    const configCustom = {
      provider: {
        components: {
          restPage: "basic-restpage:restPage",
          restPageEntry: "basic-restpage:restPageEntry",
          table: "basic-table:table"
        }
      },
      form: {
        provider: {
          components: {
            captcha: "basic-form:formFieldCaptcha",
            dateRange: "basic-date:formFieldDateRange"
          },
          behaviors: {
            formField: "basic-form:formField",
            formFieldLayout: "basic-form:formFieldLayout"
          }
        }
      },
      table: {
        provider: {
          components: {
            actionOperationsTable: "basic-table:actionOperationsTable",
            actionOperationsRow: "basic-table.tableCell.actionOperationsRow",
            actionView: "basic-table.tableCell.actionView"
          },
          actions: {
            actionCreate: "rest-actions:create",
            actionView: "rest-actions:view",
            actionEdit: "rest-actions:edit",
            actionDelete: "rest-actions:delete"
          }
        }
      }
    };
    const scopeRestConfig = this.sys.util.getModuleConfigSafe("a-openapi");
    scopeRestConfig.resourceMeta = deepExtend({}, scopeRestConfig.resourceMeta, configCustom);
  }
}
var _dec, _dec2, _class;
let ScopeModuleBasicAdapter = (_dec = Scope(), _dec2 = BeanInfo({
  module: "basic-adapter"
}), _dec(_class = _dec2(_class = class ScopeModuleBasicAdapter2 extends BeanScopeBase {
}) || _class) || _class);
export {
  MonkeySys,
  ScopeModuleBasicAdapter
};
