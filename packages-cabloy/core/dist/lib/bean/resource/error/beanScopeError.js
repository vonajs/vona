"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanScopeError = void 0;
const beanScopeErrorImpl_js_1 = require("./beanScopeErrorImpl.js");
const beanSimple_js_1 = require("../../beanSimple.js");
const BeanModuleScope = Symbol('BeanScopeError#ModuleScope');
class BeanScopeError extends beanSimple_js_1.BeanSimple {
    constructor(moduleScope) {
        super();
        this.__instances = {};
        this[BeanModuleScope] = moduleScope;
    }
    __get__(prop) {
        if (!this.__instances[prop]) {
            this.__instances[prop] = this.bean._newBean(beanScopeErrorImpl_js_1.BeanScopeErrorImpl, this[BeanModuleScope], prop);
        }
        return this.__instances[prop];
    }
}
exports.BeanScopeError = BeanScopeError;
//# sourceMappingURL=beanScopeError.js.map