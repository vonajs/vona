import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aRole',
  options: {
    disableDeleted: true,
  },
})
export class ModelRole extends BeanModelBase {}
