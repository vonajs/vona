export default {
  view: false,
  development: false,
  watcher: false,

  // need not redefined
  // static: {
  //   enable: true,
  //   package: 'egg-static',
  // },

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
