import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityPurchaseOrder } from '../entity/purchaseOrder.js';

@Model({
  table: 'testFlowPurchaseOrder',
  options: {
    disableDeleted: false,
  },
})
export class ModelPurchaseOrder extends BeanModelBase<EntityPurchaseOrder> {}
