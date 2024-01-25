import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowTaskHistory',
  options: {
    disableDeleted: false,
    cacheName: { module: moduleInfo.relativeName, name: 'modelFlowTaskHistory' },
  },
})
export class ModelFlowTaskHistory extends BeanModelBase {}
