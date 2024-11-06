import { TableIdentity } from 'vona-module-a-core';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('testPartyExpense')
export class EntityPartyExpense extends EntityBaseTemp {
  atomIdMain: TableIdentity;
  detailLineNo: number;
  name: string;
  price: number;
  quantity: number;
  amount: number;
  remark: string;
}
