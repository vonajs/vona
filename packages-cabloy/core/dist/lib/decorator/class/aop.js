"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aop = void 0;
const index_js_1 = require("../../../index.js");
const util_js_1 = require("./util.js");
function Aop(options) {
    return function (target) {
        // module
        const module = (0, util_js_1.parseModuleName)();
        // add
        index_js_1.appResource.addAop({
            module,
            scene: 'aop',
            name: options.name,
            beanClass: target,
            aop: true,
            aopMatch: options.match,
            gate: options.gate,
        });
    };
}
exports.Aop = Aop;
//# sourceMappingURL=aop.js.map