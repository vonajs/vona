import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowTask',
  options: {
    disableDeleted: true,
    cacheName: { module: moduleInfo.relativeName, name: 'modelFlowTask' },
  },
})
export class ModelFlowTask extends BeanModelBase {}
