const ModelCache = require('../common/modelCache.js');

module.exports = class Category extends ModelCache {
  constructor() {
    super({
      table: 'aCategory',
      options: {
        disableDeleted: false,
        cacheName: { module: moduleInfo.relativeName, name: 'modelCategory' },
      },
    });
  }
};
