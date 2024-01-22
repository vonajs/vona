// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // middlewares
  config.middlewares = {
    connection: {
      bean: 'connection',
      type: 'socketio.connection',
      dependencies: 'connectionAuth',
    },
    packet: {
      bean: 'packet',
      type: 'socketio.packet',
    },
  };

  // queues
  config.queues = {
    registerMessageClass: {
      bean: 'registerMessageClass',
    },
    process: {
      bean: 'process',
      concurrency: true,
    },
    delivery: {
      bean: 'delivery',
      concurrency: true,
    },
    push: {
      bean: 'push',
      concurrency: true,
    },
    pushDirect: {
      bean: 'pushDirect',
      concurrency: true,
    },
  };

  // broadcasts
  config.broadcasts = {
    socketEmit: {
      bean: 'socketEmit',
    },
  };

  // summer
  config.summer = {
    caches: {
      modelMessageClass: {
        mode: 'all',
        mem: {
          max: 500,
        },
        redis: {
          ttl: 4 * 60 * 60 * 1000, // 4 hours
        },
        ignoreNull: true,
      },
    },
  };

  // message
  config.message = {
    sync: {
      saveLimit: 200,
    },
  };

  return config;
};
