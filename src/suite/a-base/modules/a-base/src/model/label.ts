import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aLabel',
  options: {
    disableDeleted: true,
  },
})
export class ModelLabel extends BeanModelBase {}
