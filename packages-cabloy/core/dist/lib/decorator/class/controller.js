"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const index_js_1 = require("../../../index.js");
const util_js_1 = require("./util.js");
function Controller(options) {
    return function (target) {
        if (!options)
            options = {};
        // module
        const module = (0, util_js_1.parseModuleName)();
        // add
        index_js_1.appResource.addBean({
            module,
            scene: 'controller',
            name: options.name,
            beanClass: target,
        });
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map