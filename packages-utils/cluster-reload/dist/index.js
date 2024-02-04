"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const reload_js_1 = __importDefault(require("./reload.js"));
function default_1() {
    this.log('[master] reload workers...');
    for (const id in cluster_1.default.workers) {
        const worker = cluster_1.default.workers[id];
        worker.isDevReload = true;
    }
    (0, reload_js_1.default)(this, this.options.workers);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map