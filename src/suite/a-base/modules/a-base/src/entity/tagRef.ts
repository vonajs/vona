import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aTagRef')
export class EntityTagRef extends EntityItemBase {
  tagId: number;
}
