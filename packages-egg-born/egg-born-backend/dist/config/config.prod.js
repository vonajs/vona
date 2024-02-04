"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line
module.exports = _appInfo => {
    const config = {};
    // proxy
    config.proxy = true;
    config.ipHeaders = 'x-real-ip,x-forwarded-for';
    // mysql
    config.mysql = {
        default: {
            hook: {
                meta: {
                    long_query_time: 500,
                },
            },
        },
    };
    return config;
};
//# sourceMappingURL=config.prod.js.map