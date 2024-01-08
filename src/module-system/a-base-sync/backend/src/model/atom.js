const ModelCache = require('../common/modelCache.js');

const moduleInfo = module.info;
module.exports = class Atom extends ModelCache {
  constructor() {
    super({
      table: 'aAtom',
      options: {
        disableDeleted: false,
        cacheName: { module: moduleInfo.relativeName, name: 'modelAtom' },
        cacheKeyAux: 'atomClassId',
      },
    });
  }

  // async get(where, ...args) {
  //   const debug = app.bean.debug.get('atom');
  //   debug('atom get: ', where);
  //   const res = await super.get(where, ...args);
  //   debug('atom get end: ', where, res.atomName);
  //   return res;
  // }
};
