import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aAppContent')
export class EntityAppContent extends EntityItemBase {
  itemId: number;
  content: string;
}
