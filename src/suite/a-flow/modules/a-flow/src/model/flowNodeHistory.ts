import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowNodeHistory',
  options: {
    disableDeleted: false,
    cacheName: { module: moduleInfo.relativeName, name: 'modelFlowNodeHistory' },
  },
})
export class ModelFlowNodeHistory extends BeanModelBase {}
