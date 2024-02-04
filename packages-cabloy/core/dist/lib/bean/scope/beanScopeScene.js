"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanScopeScene = void 0;
const beanSimple_js_1 = require("../beanSimple.js");
const BeanModuleScope = Symbol('BeanScopeScene#ModuleScope');
const BeanModuleScene = Symbol('BeanScopeScene#BeanModuleScene');
class BeanScopeScene extends beanSimple_js_1.BeanSimple {
    constructor(moduleScope, scene) {
        super();
        this.__instances = {};
        this[BeanModuleScope] = moduleScope;
        this[BeanModuleScene] = scene;
    }
    __get__(prop) {
        if (!this.__instances[prop]) {
            const beanFullName = `${this[BeanModuleScope]}.${this[BeanModuleScene]}.${prop}`;
            this.__instances[prop] = this.bean._injectBeanInstanceProp(beanFullName);
        }
        return this.__instances[prop];
    }
}
exports.BeanScopeScene = BeanScopeScene;
//# sourceMappingURL=beanScopeScene.js.map