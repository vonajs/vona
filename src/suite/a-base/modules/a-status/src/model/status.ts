import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aStatus',
  options: {
    disableDeleted: true,
    cacheName: { module: moduleInfo.relativeName, name: 'modelStatus' },
  },
})
export class ModelStatus extends BeanModelBase {}
