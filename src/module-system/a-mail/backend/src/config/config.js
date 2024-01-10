// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // startups
  config.startups = {
    cacheMailScenes: {
      bean: 'cacheMailScenes',
      instance: true,
    },
  };

  // broadcasts
  config.broadcasts = {
    mailSceneChanged: {
      bean: 'mailSceneChanged',
    },
  };

  // default
  config.scene = {
    default: {
      // title: undefined,
      transport: {
        host: '',
        port: 0,
        secure: false,
        auth: {
          user: '',
          pass: '',
        },
        logger: false,
        debug: false,
      },
      defaults: {
        from: '',
      },
    },
  };
  // scenes
  config.scenes = {
    system: {
      title: 'System',
      ...config.scene.default,
    },
  };

  return config;
};
