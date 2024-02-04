"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = _appInfo => {
    const config = {};
    // queue
    config.queue = {
        redlock: {
            options: {
                lockTTL: 60 * 1000,
            },
        },
    };
    // mysql
    config.mysql = {
        default: {
            connectionLimit: 1,
            connectionLimitInner: 1,
            hook: {
                meta: {
                    long_query_time: 200,
                },
            },
        },
    };
    return config;
};
//# sourceMappingURL=config.unittest.js.map