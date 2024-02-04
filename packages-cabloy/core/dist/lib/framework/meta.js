"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metaClass_js_1 = __importDefault(require("./metaClass.js"));
const util_js_1 = __importDefault(require("./util.js"));
function default_1(app) {
    // meta
    const meta = {};
    // class
    meta.class = (0, metaClass_js_1.default)();
    // util
    meta.util = (0, util_js_1.default)();
    // env
    meta.isProd = app.meta.isProd;
    meta.isTest = app.meta.isTest;
    meta.isLocal = app.meta.isLocal;
    // meta
    return meta;
}
exports.default = default_1;
//# sourceMappingURL=meta.js.map