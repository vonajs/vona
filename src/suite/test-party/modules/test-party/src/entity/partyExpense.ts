import { EntityBase } from '@cabloy/core';

export interface EntityPartyExpense extends EntityBase {
  atomIdMain: number;
  detailLineNo: number;
  name: string;
  price: number;
  quantity: number;
  amount: number;
  remark: string;
}
