import { BeanModelBase, Model } from '@cabloy/core';

const ModelCache = require('../common/modelCache.js');

@Model({
  table: 'aAtom',
  options: {
    disableDeleted: false,
    cacheName: { module: moduleInfo.relativeName, name: 'modelAtom' },
    cacheKeyAux: 'atomClassId',
  },
})
export class ModelAtom extends BeanModelBase {
  // async get(where, ...args) {
  //   const debug = app.bean.debug.get('atom');
  //   debug('atom get: ', where);
  //   const res = await super.get(where, ...args);
  //   debug('atom get end: ', where, res.atomName);
  //   return res;
  // }
}
