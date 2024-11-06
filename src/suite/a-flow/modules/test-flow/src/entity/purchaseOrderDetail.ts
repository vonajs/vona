import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('testFlowPurchaseOrderDetail')
export class EntityPurchaseOrderDetail extends EntityBaseTemp {
  atomIdMain: TableIdentity;
  price: number;
  quantity: number;
  amount: number;
  detailCodeId: number;
  detailCode: string;
  detailName: string;
  detailLineNo: number;
}
