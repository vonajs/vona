const ModelCache = require('../common/modelCache.js');

const moduleInfo = module.info;
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
