// eslint-disable-next-line
module.exports = app => {
  const config = {};

  // summer
  config.summer = {
    caches: {
      fieldsRightOfAtomClass: {
        bean: 'fieldsRightOfAtomClass',
        mode: 'all',
        mem: {
          max: 500,
        },
        redis: {
          ttl: 4 * 60 * 60 * 1000, // 4 hours
        },
      },
      fieldsRightOfUser: {
        bean: 'fieldsRightOfUser',
        mode: 'all',
        mem: {
          max: 500,
        },
        redis: {
          ttl: 4 * 60 * 60 * 1000, // 4 hours
        },
      },
    },
  };

  return config;
};
