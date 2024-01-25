import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aFlowHistory',
  options: {
    disableDeleted: false,
    cacheName: { name: 'modelFlowHistory' },
  },
})
export class ModelFlowHistory extends BeanModelBase {}
