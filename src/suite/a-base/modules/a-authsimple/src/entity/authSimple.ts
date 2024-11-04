import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityAuthSimple extends EntityBaseTemp {
  userId: number;
  hash: string;
}
