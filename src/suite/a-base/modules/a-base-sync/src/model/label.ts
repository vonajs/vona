const ModelCache = require('../common/modelCache.js');

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
