const ModelCache = require('../common/modelCache.js');

const moduleInfo = module.info;
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
