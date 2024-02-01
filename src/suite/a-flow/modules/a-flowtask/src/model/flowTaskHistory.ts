import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowTaskHistory',
  options: {
    disableDeleted: false,
  },
})
export class ModelFlowTaskHistory extends BeanModelBase {}
