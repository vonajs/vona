import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlow',
  options: {
    disableDeleted: true,
    cacheName: { name: 'modelFlow' },
  },
})
export class ModelFlow extends BeanModelBase {}
