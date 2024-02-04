"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Virtual = void 0;
const resource_js_1 = require("../../core/resource.js");
const util_js_1 = require("./util.js");
function Virtual(options) {
    return function (target) {
        if (!options)
            options = {};
        // module
        const module = (0, util_js_1.parseModuleName)();
        // add
        resource_js_1.appResource.addBean({
            module,
            scene: options.scene || 'virtual',
            name: options.name,
            containerScope: options.containerScope,
            beanClass: target,
            virtual: true,
        });
    };
}
exports.Virtual = Virtual;
//# sourceMappingURL=virtual.js.map