"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRedlock = exports.AppLimiter = void 0;
const bottleneck_1 = __importDefault(require("bottleneck"));
const redlock_1 = __importDefault(require("redlock"));
const beanSimple_js_1 = require("../bean/beanSimple.js");
class AppLimiter extends beanSimple_js_1.BeanSimple {
    // https://github.com/SGrondin/bottleneck#clustering
    create(options) {
        options = options || {};
        // datastore
        options.datastore = 'ioredis';
        // connection
        if (options.connection === undefined) {
            options.connection = new bottleneck_1.default.IORedisConnection({
                client: this.app.redis.get('limiter'),
            });
        }
        return new bottleneck_1.default(options);
    }
}
exports.AppLimiter = AppLimiter;
class AppRedlock extends beanSimple_js_1.BeanSimple {
    // https://github.com/mike-marcacci/node-redlock#configuration
    create(options) {
        // clients
        const clients = [];
        for (const clientName of this.app.config.queue.redlock.clients) {
            const client = this.app.redis.get(clientName) || this.app.redis.get('limiter');
            clients.push(client);
        }
        return new redlock_1.default(clients, options);
    }
}
exports.AppRedlock = AppRedlock;
function default_1(app) {
    // limiter
    app.meta.limiter = app.bean._newBean(AppLimiter);
    // redlock
    app.meta.redlock = app.bean._newBean(AppRedlock);
}
exports.default = default_1;
//# sourceMappingURL=redis.js.map