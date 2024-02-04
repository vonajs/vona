"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanScopeLocale = void 0;
const beanScopeLocaleImpl_js_1 = require("./beanScopeLocaleImpl.js");
const beanSimple_js_1 = require("../../beanSimple.js");
const BeanModuleScope = Symbol('BeanScopeError#ModuleScope');
class BeanScopeLocale extends beanSimple_js_1.BeanSimple {
    constructor(moduleScope) {
        super();
        this.__instances = {};
        this[BeanModuleScope] = moduleScope;
    }
    __get__(prop) {
        if (!this.__instances[prop]) {
            this.__instances[prop] = (0, beanScopeLocaleImpl_js_1.BeanScopeLocaleImpl)(this.ctx, this[BeanModuleScope], prop);
        }
        return this.__instances[prop];
    }
}
exports.BeanScopeLocale = BeanScopeLocale;
//# sourceMappingURL=beanScopeLocale.js.map