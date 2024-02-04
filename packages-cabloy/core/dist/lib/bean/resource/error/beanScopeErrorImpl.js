"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanScopeErrorImpl = void 0;
const beanSimple_js_1 = require("../../beanSimple.js");
const BeanModuleScope = Symbol('BeanScopeError#ModuleScope');
const BeanErrorCode = Symbol('BeanScopeError#BeanErrorCode');
class BeanScopeErrorImpl extends beanSimple_js_1.BeanSimple {
    constructor(moduleScope, errorCode) {
        super();
        this[BeanModuleScope] = moduleScope;
        this[BeanErrorCode] = errorCode;
    }
    throw(...args) {
        this.ctx.throw.module(this[BeanModuleScope], this[BeanErrorCode], ...args);
    }
    parseFail(...args) {
        return this.ctx.parseFail.module(this[BeanModuleScope], this[BeanErrorCode], ...args);
    }
}
exports.BeanScopeErrorImpl = BeanScopeErrorImpl;
//# sourceMappingURL=beanScopeErrorImpl.js.map