import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aStats',
  options: {
    disableDeleted: true,
    cacheName: { name: 'modelStats' },
  },
})
export class ModelStats extends BeanModelBase {}
