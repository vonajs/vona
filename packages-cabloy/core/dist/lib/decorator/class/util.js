"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModuleName = exports.ParseModuleNameLevel = void 0;
const module_info_1 = require("@cabloy/module-info");
exports.ParseModuleNameLevel = module_info_1.ParseModuleNameLevelInit + 5;
function parseModuleName() {
    return (0, module_info_1.parseModuleName)(exports.ParseModuleNameLevel);
}
exports.parseModuleName = parseModuleName;
//# sourceMappingURL=util.js.map