import { BeanModelBase, Model } from '@cabloy/core';

const ModelCache = require('../common/modelCache.js');

@Model({
  table: 'aCategory',
  options: {
    disableDeleted: false,
    cacheName: { module: moduleInfo.relativeName, name: 'modelCategory' },
  },
})
export class ModelCategory extends BeanModelBase {}
