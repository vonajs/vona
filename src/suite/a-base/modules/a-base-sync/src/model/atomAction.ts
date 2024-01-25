const ModelCache = require('../common/modelCache.js');

module.exports = class AtomAction extends ModelCache {
  constructor() {
    super({
      table: 'aAtomAction',
      options: {
        disableDeleted: false,
        cacheName: { module: moduleInfo.relativeName, name: 'modelAtomAction' },
      },
    });
  }
};
