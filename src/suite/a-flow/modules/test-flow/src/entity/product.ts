import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('testFlowProduct')
export class EntityProduct extends EntityItemBase {
  productCode: string;
  productPrice: number;
}
