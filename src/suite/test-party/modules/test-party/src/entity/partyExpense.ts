import { TableIdentity } from 'vona-module-a-database';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

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
