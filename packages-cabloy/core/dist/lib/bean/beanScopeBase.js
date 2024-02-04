"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanScopeBase = void 0;
const beanScopeScene_js_1 = require("./beanScopeScene.js");
const beanBase_js_1 = require("./beanBase.js");
class BeanScopeBase extends beanBase_js_1.BeanBase {
    constructor() {
        super(...arguments);
        this.__scenes = {};
    }
    __get__(prop) {
        if (!this.__scenes[prop]) {
            this.__scenes[prop] = this.bean._newBean(beanScopeScene_js_1.BeanScopeScene, this.moduleBelong, prop);
        }
        return this.__scenes[prop];
    }
}
exports.BeanScopeBase = BeanScopeBase;
//# sourceMappingURL=beanScopeBase.js.map