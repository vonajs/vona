"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanBase = void 0;
const resource_js_1 = require("../core/resource.js");
const beanSimple_js_1 = require("./beanSimple.js");
class BeanBase extends beanSimple_js_1.BeanSimple {
    constructor(moduleBelong) {
        super();
        this.__moduleBelong__ = moduleBelong;
    }
    get moduleBelong() {
        return this.__moduleBelong__ || resource_js_1.appResource._getModuleBelong(this.__beanFullName__);
    }
    get scope() {
        return this.getScope();
    }
    getScope(moduleScope) {
        if (!moduleScope) {
            return this.bean.scope(this.moduleBelong);
        }
        return this.bean.scope(moduleScope);
    }
}
exports.BeanBase = BeanBase;
//# sourceMappingURL=beanBase.js.map