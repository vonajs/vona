import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aUserOnline',
  options: {
    disableDeleted: false,
  },
})
export class ModelUserOnline extends BeanModelBase {}
