import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aCategory',
  options: {
    disableDeleted: false,
    cacheName: { name: 'modelCategory' },
  },
})
export class ModelCategory extends BeanModelBase {}
