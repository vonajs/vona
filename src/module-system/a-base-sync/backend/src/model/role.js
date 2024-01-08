const ModelCache = require('../common/modelCache.js');

const moduleInfo = module.info;
module.exports = class Role extends ModelCache {
  constructor() {
    super({
      table: 'aRole',
      options: {
        disableDeleted: true,
        cacheName: { module: moduleInfo.relativeName, name: 'modelRole' },
      },
    });
  }
};
