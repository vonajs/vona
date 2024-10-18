import { EntityBase, TableIdentity } from 'vona';

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
