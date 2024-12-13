import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aLayoutContent')
export class EntityLayoutContent extends EntityItemBase {
  itemId: number;
  content: string;
}
