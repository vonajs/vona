import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowTask',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlowTask extends BeanModelBase {}
