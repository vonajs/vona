"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extend_1 = __importDefault(require("@cabloy/extend"));
function default_1(app, modules) {
    // all constants
    const ebConstants = (app.meta.constants = {});
    // load constants
    loadConstants();
    // patch service
    patchCreateContext();
    function patchCreateContext() {
        const createContext = app.createContext;
        app.createContext = (...args) => {
            const context = createContext.call(app, ...args);
            // maybe /favicon.ico
            if (context.module) {
                // constant
                context.constant = ebConstants[context.module.info.relativeName];
            }
            return context;
        };
    }
    function loadConstants() {
        for (const key in modules) {
            const module = modules[key];
            const ebConstant = (ebConstants[module.info.relativeName] = {});
            // module constants
            if (module.resource.constants)
                (0, extend_1.default)(true, ebConstant, module.resource.constants);
            // patchConstant
            patchConstant(ebConstant);
        }
    }
    function patchConstant(ebConstant) {
        Object.defineProperty(ebConstant, 'module', {
            enumerable: false,
            get() {
                return function (moduleName) {
                    return ebConstants[moduleName];
                };
            },
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=constant.js.map