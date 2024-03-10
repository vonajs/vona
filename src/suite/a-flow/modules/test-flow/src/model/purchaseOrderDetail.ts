import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityPurchaseOrderDetail } from '../entity/purchaseOrderDetail.js';

@Model({
  table: 'testFlowPurchaseOrderDetail',
  options: {
    disableDeleted: false,
  },
})
export class ModelPurchaseOrderDetail extends BeanModelBase<EntityPurchaseOrderDetail> {}
