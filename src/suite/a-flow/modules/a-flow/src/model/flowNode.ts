import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowNode',
  options: {
    disableDeleted: true,
    cacheName: { name: 'modelFlowNode' },
  },
})
export class ModelFlowNode extends BeanModelBase {}
