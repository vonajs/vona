import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowNode',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlowNode extends BeanModelBase {}
