import { EntityItemBase } from 'vona-module-a-base';

export interface EntityProduct extends EntityItemBase {
  productCode: string;
  productPrice: number;
}
