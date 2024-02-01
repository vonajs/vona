import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlow',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlow extends BeanModelBase {}
