import { BeanModelBase, Model } from '@cabloy/core';

const ModelCache = require('../common/modelCache.js');

@Model({
  table: 'aAtomAction',
  options: {
    disableDeleted: false,
    cacheName: { module: moduleInfo.relativeName, name: 'modelAtomAction' },
  },
})
export class ModelAtomAction extends BeanModelBase {}
