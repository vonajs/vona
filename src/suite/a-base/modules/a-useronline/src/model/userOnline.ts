import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aUserOnline',
  options: {
    disableDeleted: false,
    cacheName: { name: 'modelUserOnline' },
  },
})
export class ModelUserOnline extends BeanModelBase {}
