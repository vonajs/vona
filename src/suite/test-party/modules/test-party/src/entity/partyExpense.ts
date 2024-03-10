import { EntityBase, TableIdentity } from '@cabloy/core';

export interface EntityPartyExpense extends EntityBase {
  atomIdMain: TableIdentity;
  detailLineNo: number;
  name: string;
  price: number;
  quantity: number;
  amount: number;
  remark: string;
}
