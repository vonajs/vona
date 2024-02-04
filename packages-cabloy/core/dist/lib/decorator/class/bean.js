"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bean = void 0;
const resource_js_1 = require("../../core/resource.js");
const util_js_1 = require("./util.js");
function Bean(options) {
    return function (target) {
        if (!options)
            options = {};
        // module
        const module = (0, util_js_1.parseModuleName)();
        // add
        resource_js_1.appResource.addBean({
            module,
            scene: options.scene,
            name: options.name,
            containerScope: options.containerScope,
            beanClass: target,
        });
    };
}
exports.Bean = Bean;
//# sourceMappingURL=bean.js.map