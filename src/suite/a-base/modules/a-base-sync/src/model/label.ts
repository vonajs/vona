const ModelCache = require('../common/modelCache.js');

const moduleInfo = module.info;
module.exports = class Label extends ModelCache {
  constructor() {
    super({
      table: 'aLabel',
      options: {
        disableDeleted: true,
        cacheName: { module: moduleInfo.relativeName, name: 'modelLabel' },
      },
    });
  }
};
