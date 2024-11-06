import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aShareRecordPV')
export class EntityShareRecordPV extends EntityBaseTemp {
  shareId: number;
  userId: number;
}
