"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    view: false,
    development: false,
    watcher: false,
    // need not redefined
    // static: {
    //   enable: true,
    //   package: 'egg-static',
    // },
    mysql: {
        enable: true,
        package: '@zhennann/egg-mysql',
    },
    passport: {
        enable: true,
        package: '@zhennann/egg-passport',
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
    io: {
        enable: true,
        package: '@cabloy/egg-socket.io',
    },
};
//# sourceMappingURL=plugin.prod.js.map