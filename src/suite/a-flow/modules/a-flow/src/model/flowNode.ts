import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowNode',
  options: {
    disableDeleted: true,
    cacheName: { module: moduleInfo.relativeName, name: 'modelFlowNode' },
  },
})
export class ModelFlowNode extends BeanModelBase {}
