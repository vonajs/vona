import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aAuthSimple')
export class EntityAuthSimple extends EntityBaseTemp {
  userId: number;
  hash: string;
}
