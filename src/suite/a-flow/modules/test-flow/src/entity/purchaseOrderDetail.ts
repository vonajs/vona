import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityPurchaseOrderDetail extends EntityBaseTemp {
  atomIdMain: TableIdentity;
  price: number;
  quantity: number;
  amount: number;
  detailCodeId: number;
  detailCode: string;
  detailName: string;
  detailLineNo: number;
}
