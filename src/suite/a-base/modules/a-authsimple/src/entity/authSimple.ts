import { EntityBase } from 'vona';

export interface EntityAuthSimple extends EntityBase {
  userId: number;
  hash: string;
}
