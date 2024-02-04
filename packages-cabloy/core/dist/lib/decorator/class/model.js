"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const index_js_1 = require("../../../index.js");
const util_js_1 = require("./util.js");
const __tableNames = new Set();
function Model(options) {
    return function (target) {
        // module
        const module = (0, util_js_1.parseModuleName)();
        // tableName
        const tableName = options.table;
        if (__tableNames.has(tableName)) {
            throw new Error(`model table exists: ${tableName}`);
        }
        __tableNames.add(tableName);
        // add
        index_js_1.appResource.addBean({
            module,
            scene: 'model',
            name: options.name,
            beanClass: target,
            options,
        });
    };
}
exports.Model = Model;
//# sourceMappingURL=model.js.map