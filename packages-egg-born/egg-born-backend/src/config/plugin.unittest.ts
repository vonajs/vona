export default {
  view: false,
  development: false,
  watcher: false,
  redis: false,

  // need not redefined
  // static: {
  //   enable: true,
  //   package: 'egg-static',
  // },

  passport: {
    enable: true,
    package: '@zhennann/egg-passport',
  },

  io: {
    enable: true,
    package: '@cabloy/egg-socket.io',
  },
};
