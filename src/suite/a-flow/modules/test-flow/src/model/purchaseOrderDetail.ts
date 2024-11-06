import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityPurchaseOrderDetail } from '../entity/purchaseOrderDetail.js';

@Model({ entity: EntityPurchaseOrderDetail, disableDeleted: false })
export class ModelPurchaseOrderDetail extends BeanModelBase<EntityPurchaseOrderDetail> {}
