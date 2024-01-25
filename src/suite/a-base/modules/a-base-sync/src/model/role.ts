import { BeanModelBase, Model } from '@cabloy/core';

const ModelCache = require('../common/modelCache.js');

@Model({
  table: 'aRole',
  options: {
    disableDeleted: true,
    cacheName: { module: moduleInfo.relativeName, name: 'modelRole' },
  },
})
export class ModelRole extends BeanModelBase {}
