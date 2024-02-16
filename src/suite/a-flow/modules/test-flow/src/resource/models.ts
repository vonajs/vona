export * from '../model/product.js';
export * from '../model/purchaseOrder.js';
export * from '../model/purchaseOrderDetail.js';

import { ModelProduct } from '../model/product.js';
import { ModelPurchaseOrder } from '../model/purchaseOrder.js';
import { ModelPurchaseOrderDetail } from '../model/purchaseOrderDetail.js';

export interface IModuleModel {
  product: ModelProduct;
  purchaseOrder: ModelPurchaseOrder;
  purchaseOrderDetail: ModelPurchaseOrderDetail;
}
