import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aLayoutContent')
export class EntityLayoutContent extends EntityItemBase {
  itemId: number;
  content: string;
}
