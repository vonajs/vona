import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aStatus',
  options: {
    disableDeleted: true,
  },
})
export class ModelStatus extends BeanModelBase {}
