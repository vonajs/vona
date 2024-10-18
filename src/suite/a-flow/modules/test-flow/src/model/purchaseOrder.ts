import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityPurchaseOrder } from '../entity/purchaseOrder.js';

@Model({
  table: 'testFlowPurchaseOrder',
  options: {
    disableDeleted: false,
  },
})
export class ModelPurchaseOrder extends BeanModelBase<EntityPurchaseOrder> {}
