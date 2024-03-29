"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModuleInfo = exports.parseModuleName = exports.ParseModuleNameLevelInit = void 0;
const module_info_1 = require("@cabloy/module-info");
const stack_utils_1 = __importDefault(require("stack-utils"));
exports.ParseModuleNameLevelInit = 1;
function parseModuleName(level = exports.ParseModuleNameLevelInit) {
    const info = parseModuleInfo(level + 1);
    if (!info)
        return;
    return info.relativeName;
}
exports.parseModuleName = parseModuleName;
function parseModuleInfo(level = exports.ParseModuleNameLevelInit) {
    const stackUtils = new stack_utils_1.default();
    const traces = stackUtils.capture(level);
    const trace = traces[level - 1];
    const fileName = trace.getFileName();
    return (0, module_info_1.parseInfoFromPath)(fileName);
}
exports.parseModuleInfo = parseModuleInfo;
//# sourceMappingURL=index.js.map