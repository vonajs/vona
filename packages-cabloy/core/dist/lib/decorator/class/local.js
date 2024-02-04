"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Local = void 0;
const index_js_1 = require("../../../index.js");
const util_js_1 = require("./util.js");
function Local(options) {
    return function (target) {
        if (!options)
            options = {};
        // module
        const module = (0, util_js_1.parseModuleName)();
        // add
        index_js_1.appResource.addBean({
            module,
            scene: 'local',
            name: options.name,
            containerScope: options.containerScope,
            beanClass: target,
        });
    };
}
exports.Local = Local;
//# sourceMappingURL=local.js.map