"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compose_1 = __importDefault(require("koa-compose"));
function default_1(app) {
    function loadMiddlewares() {
        const _middlewares = [];
        // all middlewares
        const ebMiddlewares = app.meta.middlewaresSocketIoConnection;
        for (const item of ebMiddlewares) {
            _middlewares.push(wrapMiddleware(item));
        }
        return (0, koa_compose_1.default)(_middlewares);
    }
    let _middlewares = null;
    return async (ctx, next) => {
        if (!_middlewares) {
            _middlewares = loadMiddlewares();
        }
        await _middlewares(ctx, next);
    };
}
exports.default = default_1;
function wrapMiddleware(item) {
    const fn = (ctx, next) => {
        // enable match ignore dependencies
        if (item.options.enable === false) {
            return next();
        }
        // bean
        const bean = item.bean;
        // execute
        const beanFullName = `${bean.module}.middleware.io.${bean.name}`;
        const beanInstance = ctx.bean._getBean(beanFullName);
        if (!beanInstance) {
            throw new Error(`socketio middleware bean not found: ${beanFullName}`);
        }
        return beanInstance.execute(item.options, next);
    };
    fn._name = item.name;
    return fn;
}
//# sourceMappingURL=connection.js.map