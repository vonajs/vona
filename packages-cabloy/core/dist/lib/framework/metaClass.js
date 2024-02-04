"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_js_1 = require("../base/model.js");
const beanModuleScopeBase_js_1 = require("../bean/beanModuleScopeBase.js");
function default_1() {
    const __classes = {};
    const classes = new Proxy(__classes, {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            // only once
            if (!target[prop]) {
                target[prop] = value;
            }
            return true;
        },
    });
    // model
    classes.Model = model_js_1.Model;
    // BeanModuleScopeBase
    classes.BeanModuleScopeBase = beanModuleScopeBase_js_1.BeanModuleScopeBase;
    return classes;
}
exports.default = default_1;
//# sourceMappingURL=metaClass.js.map