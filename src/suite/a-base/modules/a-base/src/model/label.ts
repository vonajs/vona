import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aLabel',
  options: {
    disableDeleted: true,
    cacheName: { name: 'modelLabel' },
  },
})
export class ModelLabel extends BeanModelBase {}
