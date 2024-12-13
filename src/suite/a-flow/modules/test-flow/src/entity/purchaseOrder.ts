import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('testFlowPurchaseOrder')
export class EntityPurchaseOrder extends EntityItemBase {
  description: string;
  _flowDefKey: string;
  detailsCount: number;
  detailsAmount: number;
  payMoneyAmount: number;
  payMoneyPerson: number;
  payMoneyTime: Date;
  receiveGoodsPics: string;
  receiveGoodsPerson: number;
  receiveGoodsTime: Date;
}
