"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanLocal = void 0;
const beanModuleScopeBase_js_1 = require("./beanModuleScopeBase.js");
class BeanLocal extends beanModuleScopeBase_js_1.BeanModuleScopeBase {
    // magic
    __get__(prop) {
        return this.bean._getBean(`${this.moduleScope}.local.${prop}`);
    }
    // beanLocal has no __beanFullName__
    module(moduleScope) {
        return this.bean._newBeanScope(BeanLocal, moduleScope);
    }
}
exports.BeanLocal = BeanLocal;
//# sourceMappingURL=_beanLocal_.js.map