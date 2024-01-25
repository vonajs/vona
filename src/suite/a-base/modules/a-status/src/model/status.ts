import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aStatus',
  options: {
    disableDeleted: true,
    cacheName: { name: 'modelStatus' },
  },
})
export class ModelStatus extends BeanModelBase {}
