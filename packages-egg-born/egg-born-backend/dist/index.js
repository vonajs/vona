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
const path_1 = __importDefault(require("path"));
const egg_1 = __importDefault(require("egg"));
const Framework = __importStar(require("@cabloy/core"));
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');
const eggPath = path_1.default.resolve(__dirname, './');
// process.traceDeprecation = true;
class Application extends Framework.Application {
    get [EGG_PATH]() {
        return eggPath;
    }
    get [EGG_LOADER]() {
        return Framework.AppWorkerLoader;
    }
}
class Agent extends Framework.Agent {
    get [EGG_PATH]() {
        return eggPath;
    }
    get [EGG_LOADER]() {
        return Framework.AgentWorkerLoader;
    }
}
module.exports = Object.assign(egg_1.default, {
    Application,
    Agent,
    AppWorkerLoader: Framework.AppWorkerLoader,
    AgentWorkerLoader: Framework.AppWorkerLoader,
});
//# sourceMappingURL=index.js.map