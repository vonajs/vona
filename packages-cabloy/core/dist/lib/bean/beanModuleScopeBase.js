"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanModuleScopeBase = void 0;
const beanBase_js_1 = require("./beanBase.js");
const BeanModuleScope = Symbol('BeanModuleScopeBase#ModuleScope');
class BeanModuleScopeBase extends beanBase_js_1.BeanBase {
    constructor(moduleScope) {
        super();
        this[BeanModuleScope] = moduleScope;
    }
    get moduleScope() {
        return this[BeanModuleScope] || this.ctx.module.info.relativeName;
    }
    // other module's bean
    module(moduleScope) {
        return this.bean._getBeanScope(this.__beanFullName__, moduleScope);
    }
}
exports.BeanModuleScopeBase = BeanModuleScopeBase;
//# sourceMappingURL=beanModuleScopeBase.js.map