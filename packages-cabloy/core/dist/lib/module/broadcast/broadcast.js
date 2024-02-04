"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const broadcastClient_js_1 = require("./broadcastClient.js");
function default_1(app, modules) {
    // broadcast
    app.meta.broadcast = app.bean._newBean(broadcastClient_js_1.BroadcastClient);
    // all broadcasts
    const ebBroadcasts = (app.meta.broadcasts = {});
    // load broadcasts
    loadBroadcasts();
    function loadBroadcasts() {
        for (const key in modules) {
            const module = modules[key];
            const config = app.meta.configs[module.info.relativeName];
            if (!config.broadcasts)
                continue;
            for (const broadcastKey in config.broadcasts) {
                const broadcastConfig = config.broadcasts[broadcastKey];
                const fullKey = `${broadcastConfig.module || module.info.relativeName}:${broadcastKey}`;
                if (!ebBroadcasts[fullKey])
                    ebBroadcasts[fullKey] = [];
                // bean
                const implementationName = broadcastConfig.bean;
                if (!implementationName) {
                    throw new Error(`bean not set for broadcast: ${module.info.relativeName}.${broadcastKey}`);
                }
                let bean;
                if (typeof implementationName === 'string') {
                    bean = {
                        module: module.info.relativeName,
                        name: implementationName,
                    };
                }
                else {
                    bean = {
                        module: implementationName.module || module.info.relativeName,
                        name: implementationName.name,
                    };
                }
                ebBroadcasts[fullKey].push({
                    bean,
                    config: broadcastConfig,
                });
            }
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=broadcast.js.map