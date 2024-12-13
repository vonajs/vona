import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aShareRecordPV')
export class EntityShareRecordPV extends EntityBaseTemp {
  shareId: number;
  userId: number;
}
