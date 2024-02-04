"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanScopeBean = void 0;
const beanSimple_js_1 = require("../beanSimple.js");
const BeanModuleScope = Symbol('BeanScopeScene#ModuleScope');
class BeanScopeBean extends beanSimple_js_1.BeanSimple {
    constructor(moduleScope) {
        super();
        this.__instances = {};
        this[BeanModuleScope] = moduleScope;
    }
    __get__(prop) {
        if (!this.__instances[prop]) {
            const beanFullName = prop;
            this.__instances[prop] = this.bean._injectBeanInstanceProp(beanFullName, this[BeanModuleScope]);
        }
        return this.__instances[prop];
    }
}
exports.BeanScopeBean = BeanScopeBean;
//# sourceMappingURL=beanScopeBean.js.map