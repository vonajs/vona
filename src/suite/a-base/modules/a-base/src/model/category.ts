import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aCategory',
  options: {
    disableDeleted: false,
  },
})
export class ModelCategory extends BeanModelBase {}
