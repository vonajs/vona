const ModelCache = require('../common/modelCache.js');

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
