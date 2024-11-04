import { TableIdentity } from 'vona';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityPartyExpense extends EntityBaseTemp {
  atomIdMain: TableIdentity;
  detailLineNo: number;
  name: string;
  price: number;
  quantity: number;
  amount: number;
  remark: string;
}
