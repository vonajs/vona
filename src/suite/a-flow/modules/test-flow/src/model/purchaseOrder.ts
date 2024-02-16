import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'testFlowPurchaseOrder',
  options: {
    disableDeleted: false,
  },
})
export class ModelPurchaseOrder extends BeanModelBase {}
