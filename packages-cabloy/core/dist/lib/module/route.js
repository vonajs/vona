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
exports.AppRouter = void 0;
const is_type_of_1 = __importDefault(require("is-type-of"));
const egg_path_matching_1 = __importDefault(require("egg-path-matching"));
const ModuleInfo = __importStar(require("@cabloy/module-info"));
const middleware_js_1 = __importDefault(require("./middleware.js"));
const beanSimple_js_1 = require("../bean/beanSimple.js");
const MWSTATUS = Symbol('Context#__wmstatus');
class AppRouter extends beanSimple_js_1.BeanSimple {
    register(info, route) {
        // info
        if (typeof info === 'string') {
            info = ModuleInfo.parseInfo(info);
        }
        // app
        const app = this.app;
        // args
        const args = [];
        // name
        if (route.name)
            args.push(route.name);
        // path
        args.push(typeof route.path === 'string' ? app.meta.util.combineFetchPath(info, route.path) : route.path);
        // constroller
        let controllerBeanFullName;
        let _route;
        if (route.controller) {
            if (is_type_of_1.default.function(route.controller)) {
                throw new Error(`Controller should be bean: ${info.relativeName}.${route.controller(app).name}`);
            }
            if (typeof route.controller === 'string') {
                controllerBeanFullName = `${info.relativeName}.controller.${route.controller}`;
            }
            else {
                controllerBeanFullName = `${route.controller.module || info.relativeName}.controller.${route.controller.name}`;
            }
            // _route
            _route = {
                pid: info.pid,
                module: info.name,
                controller: route.controller,
                action: route.action || route.path.substr(route.path.lastIndexOf('/') + 1),
                route,
            };
        }
        // middlewares: start
        const fnStart = async (ctx, next) => {
            // status
            ctx[MWSTATUS] = {};
            // route
            ctx.route = _route;
            // dynamic options
            ctx.meta.middlewares = {};
            // next
            await next();
            // invoke callbackes: handle secondly
            await ctx.tailDone();
        };
        fnStart._name = 'start';
        args.push(fnStart);
        // middlewares: globals
        app.meta.middlewaresGlobal.forEach(item => {
            args.push(wrapMiddleware(item));
        });
        // middlewares: tailDone
        const fnTailDone = async (ctx, next) => {
            // next
            await next();
            // invoke callbackes: handle firstly
            await ctx.tailDone();
        };
        fnStart._name = 'tailDone';
        args.push(fnTailDone);
        // middlewares: route
        if (route.middlewares) {
            let middlewares = route.middlewares;
            if (is_type_of_1.default.string(middlewares))
                middlewares = middlewares.split(',');
            middlewares.forEach(key => {
                if (is_type_of_1.default.string(key)) {
                    const item = app.meta.middlewaresNormal[key];
                    if (item) {
                        args.push(wrapMiddleware(item));
                    }
                    else {
                        args.push(wrapMiddlewareApp(key, route, app));
                    }
                }
                else {
                    args.push(key);
                }
            });
        }
        // controller
        if (route.controller) {
            // middleware controller
            args.push(methodToMiddleware(controllerBeanFullName, _route));
        }
        // load
        app.router[route.method](...args);
    }
    unRegister(name) {
        const app = this.app;
        const index = app.router.stack.findIndex(layer => layer.name && layer.name === name);
        if (index > -1)
            app.router.stack.splice(index, 1);
    }
    findByPath(moduleName, arg) {
        const app = this.app;
        const path = app.meta.util.combineFetchPath(moduleName, arg);
        return app.router.stack.find(layer => layer.path === path);
    }
}
exports.AppRouter = AppRouter;
function default_1(app, modules) {
    // load middlewares
    (0, middleware_js_1.default)(app);
    // patch router
    patchRouter();
    // load routes
    loadRoutes();
    function patchRouter() {
        app.meta.router = app.bean._newBean(AppRouter);
    }
    function loadRoutes() {
        // load routes
        for (const key in modules) {
            const module = modules[key];
            // routes and controllers
            const routes = module.resource.routes;
            if (routes) {
                for (const route of routes) {
                    app.meta.router.register(module.info, route);
                }
            }
        }
    }
}
exports.default = default_1;
function wrapMiddlewareApp(key, route, app) {
    try {
        const middleware = app.middlewares[key];
        const optionsRoute = route.meta ? route.meta[key] : null;
        const mw = middleware(optionsRoute, app);
        mw._name = key;
        return mw;
    }
    catch (err) {
        console.log(`\nmiddleware error: ${key}\n`);
        throw err;
    }
}
function wrapMiddleware(item) {
    const fn = (ctx, next) => {
        // options
        const options = ctx.meta.getMiddlewareOptions(item.name);
        // enable match ignore dependencies
        if (options.enable === false || !middlewareMatch(ctx, options) || !middlewareDeps(ctx, options)) {
            ctx[MWSTATUS][item.name] = false;
            return next();
        }
        // bean
        const bean = item.bean;
        // execute
        const beanFullName = `${bean.module}.middleware.${bean.name}`;
        const beanInstance = ctx.bean._getBean(beanFullName);
        if (!beanInstance) {
            throw new Error(`middleware bean not found: ${beanFullName}`);
        }
        return beanInstance.execute(options, next);
    };
    fn._name = item.name;
    return fn;
}
function middlewareMatch(ctx, options) {
    if (!options.match && !options.ignore) {
        return true;
    }
    const match = (0, egg_path_matching_1.default)(options);
    return match(ctx);
}
function middlewareDeps(ctx, options) {
    let deps = options.dependencies || [];
    if (typeof deps === 'string')
        deps = deps.split(',');
    return deps.every(key => ctx[MWSTATUS][key] !== false);
}
function methodToMiddleware(controllerBeanFullName, _route) {
    return function classControllerMiddleware(...args) {
        const controller = this.bean._getBean(controllerBeanFullName);
        if (!controller) {
            throw new Error(`controller not found: ${controllerBeanFullName}`);
        }
        if (!controller[_route.action]) {
            throw new Error(`controller action not found: ${controllerBeanFullName}.${_route.action}`);
        }
        return controller[_route.action](...args);
    };
}
//# sourceMappingURL=route.js.map