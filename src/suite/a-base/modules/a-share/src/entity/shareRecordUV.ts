import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aShareRecordUV')
export class EntityShareRecordUV extends EntityItemBase {
  userIdSource: number;
  userIdTarget: number;
}
