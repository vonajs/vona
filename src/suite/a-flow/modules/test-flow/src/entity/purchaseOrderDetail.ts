import { EntityBase } from '@cabloy/core';

export interface EntityPurchaseOrderDetail extends EntityBase {
  atomIdMain: number;
  price: number;
  quantity: number;
  amount: number;
  detailCodeId: number;
  detailCode: string;
  detailName: string;
  detailLineNo: number;
}
