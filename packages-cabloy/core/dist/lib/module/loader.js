"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleLoader = void 0;
const meta_js_1 = require("../core/meta.js");
const module_js_1 = require("./module.js");
const route_js_1 = __importDefault(require("./route.js"));
const model_js_1 = __importDefault(require("./model.js"));
const config_js_1 = __importDefault(require("./config.js"));
const moduleMeta_js_1 = __importDefault(require("./moduleMeta.js"));
const locales_js_1 = __importDefault(require("./locales.js"));
const errors_js_1 = __importDefault(require("./errors.js"));
const constant_js_1 = __importDefault(require("./constant.js"));
const messenger_js_1 = __importDefault(require("./messenger.js"));
const redis_js_1 = __importDefault(require("./redis.js"));
const queue_js_1 = __importDefault(require("./queue/queue.js"));
const broadcast_js_1 = __importDefault(require("./broadcast/broadcast.js"));
const startup_js_1 = __importDefault(require("./startup.js"));
const schedule_js_1 = __importDefault(require("./schedule.js"));
const app_js_1 = __importDefault(require("./cluster/app.js"));
const agent_js_1 = __importDefault(require("./cluster/agent.js"));
const index_js_1 = require("./bean/index.js");
const beanSimple_js_1 = require("../bean/beanSimple.js");
class ModuleLoader extends beanSimple_js_1.BeanSimple {
    async execute() {
        const app = this.app;
        // meta
        const meta = app.bean._newBean(meta_js_1.AppMeta);
        app.meta = meta;
        // messenger
        (0, messenger_js_1.default)(app);
        // modules
        const moduleTools = app.bean._newBean(module_js_1.ModuleTools);
        // prepare
        const modules = await moduleTools.prepare();
        // load modules
        await moduleTools.load();
        // monkey modules
        await moduleTools.monkey('moduleLoading');
        if (meta.inApp) {
            await (0, config_js_1.default)(app, modules);
            await (0, moduleMeta_js_1.default)(app, modules);
            (0, index_js_1.loadBeans)(app);
            (0, locales_js_1.default)(app, modules);
            (0, errors_js_1.default)(app, modules);
            (0, constant_js_1.default)(app, modules);
            (0, route_js_1.default)(app, modules);
            (0, model_js_1.default)(app);
            (0, redis_js_1.default)(app);
            (0, queue_js_1.default)(app, modules);
            (0, broadcast_js_1.default)(app, modules);
            (0, startup_js_1.default)(app);
            (0, schedule_js_1.default)(app);
            (0, app_js_1.default)(app);
        }
        else {
            await (0, config_js_1.default)(app, modules);
            (0, agent_js_1.default)(app);
        }
        // monkey modules
        await moduleTools.monkey('moduleLoaded');
    }
}
exports.ModuleLoader = ModuleLoader;
//# sourceMappingURL=loader.js.map