"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atom = void 0;
const index_js_1 = require("../../../index.js");
const util_js_1 = require("./util.js");
function Atom(options) {
    return function (target) {
        if (!options)
            options = {};
        // module
        const module = (0, util_js_1.parseModuleName)();
        // add
        index_js_1.appResource.addBean({
            module,
            scene: 'atom',
            name: options.name,
            beanClass: target,
        });
    };
}
exports.Atom = Atom;
//# sourceMappingURL=atom.js.map