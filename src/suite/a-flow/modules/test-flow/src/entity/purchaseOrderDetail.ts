import { EntityBase, TableIdentity } from '@cabloy/core';

export interface EntityPurchaseOrderDetail extends EntityBase {
  atomIdMain: TableIdentity;
  price: number;
  quantity: number;
  amount: number;
  detailCodeId: number;
  detailCode: string;
  detailName: string;
  detailLineNo: number;
}
