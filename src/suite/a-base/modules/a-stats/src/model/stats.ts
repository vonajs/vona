import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aStats',
  options: {
    disableDeleted: true,
  },
})
export class ModelStats extends BeanModelBase {}
