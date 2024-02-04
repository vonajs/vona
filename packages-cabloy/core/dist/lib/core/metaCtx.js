"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtxMeta = void 0;
const extend_1 = __importDefault(require("@cabloy/extend"));
const utilCtx_js_1 = require("../utils/utilCtx.js");
const mockUtilCtx_js_1 = require("../utils/mockUtilCtx.js");
const beanSimple_js_1 = require("../bean/beanSimple.js");
class CtxMeta extends beanSimple_js_1.BeanSimple {
    __init__() {
        // util
        this.util = this.ctx.bean._newBean(utilCtx_js_1.CtxUtil);
        // mockUtil
        this.mockUtil = this.ctx.bean._newBean(mockUtilCtx_js_1.CtxMockUtil);
    }
    getMiddlewareOptions(middlewareName) {
        const item = this.app.meta.middlewaresNormal[middlewareName];
        // config options
        const config = this.ctx.config.module(item.module);
        const optionsConfig = config.middlewares ? config.middlewares[item.name] : null;
        // route options
        const route = this.ctx.route.route;
        const optionsRoute = route.meta ? route.meta[item.name] : null;
        // dynamic options
        const optionsDynamic = this.middlewares[item.name];
        // final options
        const options = (0, extend_1.default)(true, {}, optionsConfig, optionsRoute, optionsDynamic);
        // ok
        return options;
    }
}
exports.CtxMeta = CtxMeta;
//# sourceMappingURL=metaCtx.js.map