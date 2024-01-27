import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aRole',
  options: {
    disableDeleted: true,
    cacheName: { name: 'modelRole' },
  },
})
export class ModelRole extends BeanModelBase {}
