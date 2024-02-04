"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = __importDefault(require("module"));
const ModuleInfo = __importStar(require("@cabloy/module-info"));
const meta_js_1 = __importDefault(require("./meta.js"));
let __patched = false;
function default_1(app) {
    // only once
    if (__patched)
        return;
    __patched = true;
    // meta
    const meta = (0, meta_js_1.default)(app);
    // compile
    const Module2 = module_1.default;
    const originalCompile = Module2.prototype._compile;
    Module2.prototype._compile = function (...args) {
        const _module = this;
        let _moduleInfo;
        // meta
        Object.defineProperty(_module, 'meta', {
            enumerable: false,
            get() {
                return meta;
            },
        });
        // info
        Object.defineProperty(_module, 'info', {
            enumerable: false,
            get() {
                if (!_moduleInfo) {
                    _moduleInfo = ModuleInfo.parseInfoFromPackage(_module.path);
                }
                return _moduleInfo;
            },
        });
        return originalCompile.apply(_module, args);
    };
}
exports.default = default_1;
//# sourceMappingURL=moduleInfo.js.map