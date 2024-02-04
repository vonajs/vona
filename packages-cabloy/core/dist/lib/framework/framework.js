"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = exports.Application = exports.AgentWorkerLoader = exports.AppWorkerLoader = exports.Bootstrap = void 0;
const path_1 = __importDefault(require("path"));
const egg_1 = __importDefault(require("egg"));
var bootstrap_js_1 = require("./bootstrap.js");
Object.defineProperty(exports, "Bootstrap", { enumerable: true, get: function () { return bootstrap_js_1.Bootstrap; } });
var loader_js_1 = require("./loader.js");
Object.defineProperty(exports, "AppWorkerLoader", { enumerable: true, get: function () { return loader_js_1.CustomAppWorkerLoader; } });
Object.defineProperty(exports, "AgentWorkerLoader", { enumerable: true, get: function () { return loader_js_1.CustomAgentWorkerLoader; } });
const EGG_PATH = Symbol.for('egg#eggPath');
const eggPath = path_1.default.resolve(__dirname, '../..');
class Application extends egg_1.default.Application {
    get [EGG_PATH]() {
        return eggPath;
    }
}
exports.Application = Application;
class Agent extends egg_1.default.Agent {
    get [EGG_PATH]() {
        return eggPath;
    }
}
exports.Agent = Agent;
//# sourceMappingURL=framework.js.map