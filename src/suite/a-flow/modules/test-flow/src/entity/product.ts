import { EntityItemBase } from 'vona';

export interface EntityProduct extends EntityItemBase {
  productCode: string;
  productPrice: number;
}
