"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queueClient_js_1 = require("./queueClient.js");
function default_1(app, modules) {
    // queue
    app.meta.queue = app.bean._newBean(queueClient_js_1.QueueClient);
    // all queues
    const ebQueues = (app.meta.queues = {});
    // load queues
    loadQueues();
    function loadQueues() {
        for (const key in modules) {
            const module = modules[key];
            const config = app.meta.configs[module.info.relativeName];
            if (!config.queues)
                continue;
            for (const queueName in config.queues) {
                const queueConfig = config.queues[queueName];
                const fullKey = `${module.info.relativeName}:${queueName}`;
                // bean
                const beanName = queueConfig.bean;
                if (!beanName)
                    throw new Error(`bean not set for queue: ${fullKey}`);
                let bean;
                if (typeof beanName === 'string') {
                    bean = {
                        module: module.info.relativeName,
                        name: beanName,
                    };
                }
                else {
                    bean = {
                        module: beanName.module || module.info.relativeName,
                        name: beanName.name,
                    };
                }
                ebQueues[fullKey] = {
                    module: module.info.relativeName,
                    name: queueName,
                    config: queueConfig,
                    bean,
                };
            }
        }
    }
    app.meta._loadQueueWorkers = ({ subdomain }) => {
        for (const fullKey in ebQueues) {
            const queue = ebQueues[fullKey];
            const info = {
                subdomain,
                module: queue.module,
                queueName: queue.name,
            };
            app.meta.queue._ensureWorker(info);
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=queue.js.map