import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'testFlowPurchaseOrderDetail',
  options: {
    disableDeleted: false,
  },
})
export class ModelPurchaseOrderDetail extends BeanModelBase {}
