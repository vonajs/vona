import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowTask',
  options: {
    disableDeleted: true,
    cacheName: { name: 'modelFlowTask' },
  },
})
export class ModelFlowTask extends BeanModelBase {}
