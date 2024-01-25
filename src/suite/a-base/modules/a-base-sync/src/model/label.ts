import { BeanModelBase, Model } from '@cabloy/core';

const ModelCache = require('../common/modelCache.js');

@Model({
  table: 'aLabel',
  options: {
    disableDeleted: true,
    cacheName: { module: moduleInfo.relativeName, name: 'modelLabel' },
  },
})
export class ModelLabel extends BeanModelBase {}
