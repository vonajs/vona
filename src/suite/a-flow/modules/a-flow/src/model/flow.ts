import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlow',
  options: {
    disableDeleted: true,
    cacheName: { module: moduleInfo.relativeName, name: 'modelFlow' },
  },
})
export class ModelFlow extends BeanModelBase {}
