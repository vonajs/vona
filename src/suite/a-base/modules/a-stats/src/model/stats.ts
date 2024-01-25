import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aStats',
  options: {
    disableDeleted: true,
    cacheName: { module: moduleInfo.relativeName, name: 'modelStats' },
  },
})
export class ModelStats extends BeanModelBase {}
