import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowNodeHistory',
  options: {
    disableDeleted: false,
  },
})
export class ModelFlowNodeHistory extends BeanModelBase {}
