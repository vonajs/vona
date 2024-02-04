"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@cabloy/core");
class AppBootHook {
    constructor(app) {
        this.app = app;
        this.bootstrap = new core_1.Bootstrap(app);
    }
    async didLoad() {
        await this.bootstrap.loadModules();
    }
}
exports.default = AppBootHook;
//# sourceMappingURL=agent.js.map