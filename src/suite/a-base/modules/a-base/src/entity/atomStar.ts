import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aAtomStar')
export class EntityAtomStar extends EntityItemBase {
  userId: number;
  star: number;
}
