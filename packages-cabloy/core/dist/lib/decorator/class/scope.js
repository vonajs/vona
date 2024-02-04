"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
const resource_js_1 = require("../../core/resource.js");
const util_js_1 = require("./util.js");
function Scope() {
    return function (target) {
        // module
        const module = (0, util_js_1.parseModuleName)();
        // add
        resource_js_1.appResource.addBean({
            module,
            scene: 'scope',
            name: 'module', // force to the same name
            beanClass: target,
        });
    };
}
exports.Scope = Scope;
//# sourceMappingURL=scope.js.map