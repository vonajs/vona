import { BeanModelBase, Model } from '@cabloy/core';

const ModelCache = require('../common/modelCache.js');

@Model({
  table: 'aUser',
  options: {
    disableDeleted: false,
    cacheName: { module: moduleInfo.relativeName, name: 'modelUser' },
  },
})
export class ModelUser extends BeanModelBase {}
