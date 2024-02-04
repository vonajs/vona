"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = void 0;
const beanModuleScopeBase_js_1 = require("../../bean/beanModuleScopeBase.js");
const metadata_js_1 = require("../../core/metadata.js");
const resource_js_1 = require("../../core/resource.js");
const util_js_1 = require("./util.js");
function Use(options) {
    return function (target, prop) {
        if (!options)
            options = {};
        // beanClass maybe has no specific class type
        const beanClass = metadata_js_1.appMetadata.getDesignType(target, prop);
        // beanFullName
        let beanFullName = options.beanFullName;
        if (!beanFullName) {
            beanFullName = resource_js_1.appResource.getBeanFullName(beanClass);
            if (!beanFullName)
                throw new Error(`beanFullName not found for: ${beanClass.name}`);
        }
        // moduleScope
        let moduleScope = options.moduleScope;
        if (!moduleScope && beanClass.prototype instanceof beanModuleScopeBase_js_1.BeanModuleScopeBase) {
            moduleScope = (0, util_js_1.parseModuleName)();
        }
        // containerScope
        //   should dynamic get containerScope when invoke beanContainer
        //      because class has not inited
        const containerScope = options.containerScope;
        // record
        resource_js_1.appResource.addUse(target, {
            prop,
            beanFullName,
            moduleScope,
            containerScope,
        });
    };
}
exports.Use = Use;
//# sourceMappingURL=use.js.map