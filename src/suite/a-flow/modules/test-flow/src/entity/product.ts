import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('testFlowProduct')
export class EntityProduct extends EntityItemBase {
  productCode: string;
  productPrice: number;
}
