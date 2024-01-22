const ModelCache = require('../common/modelCache.js');

const moduleInfo = module.info;
module.exports = class User extends ModelCache {
  constructor() {
    super({
      table: 'aUser',
      options: {
        disableDeleted: false,
        cacheName: { module: moduleInfo.relativeName, name: 'modelUser' },
      },
    });
  }
};
