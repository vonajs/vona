"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extend_1 = __importDefault(require("@cabloy/extend"));
const errorClass_js_1 = require("../bean/resource/error/errorClass.js");
const ERROR = Symbol('Context#__error');
function default_1(app, modules) {
    // all errors
    const ebErrors = {};
    // load errors
    loadErrors();
    // patch service
    patchCreateContext();
    function patchCreateContext() {
        const createContext = app.createContext;
        app.createContext = (...args) => {
            const context = createContext.call(app, ...args);
            // maybe /favicon.ico
            if (context.module) {
                // error
                context[ERROR] = context.bean._newBean(errorClass_js_1.ErrorClass, ebErrors);
                // methods
                ['success', 'fail', 'throw', 'parseFail', 'parseSuccess', 'parseCode'].forEach(key => {
                    context[key] = function (...args) {
                        return context[ERROR][key](context.module.info.relativeName, ...args);
                    };
                    context[key].module = function (module, ...args) {
                        return context[ERROR][key](module, ...args);
                    };
                });
            }
            // createError
            context.createError = function (data) {
                return app.meta.util.createError(data);
            };
            return context;
        };
    }
    function loadErrors() {
        for (const key in modules) {
            const module = modules[key];
            const ebError = (ebErrors[module.info.relativeName] = {});
            // module errors
            if (module.resource.Errors)
                (0, extend_1.default)(true, ebError, module.resource.Errors);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=errors.js.map