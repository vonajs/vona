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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@cabloy/set");
require("@cabloy/json5");
require("regenerator-runtime");
const module_alias_1 = __importDefault(require("module-alias"));
const cluster_reload_1 = __importDefault(require("@cabloy/cluster-reload"));
const master_js_1 = __importDefault(require("egg-cluster/lib/master.js"));
module_alias_1.default.addAlias('koa-static-cache', '@cabloy/koa-static-cache');
master_js_1.default.prototype.onReload = cluster_reload_1.default;
__exportStar(require("./types/index.js"), exports);
__exportStar(require("./lib/bean/index.js"), exports);
__exportStar(require("./lib/core/index.js"), exports);
__exportStar(require("./lib/decorator/index.js"), exports);
__exportStar(require("./lib/module/index.js"), exports);
__exportStar(require("./lib/framework/framework.js"), exports);
//# sourceMappingURL=index.js.map