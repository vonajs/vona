import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aDict')
export class EntityDict extends EntityItemBase {
  description: string;
  dictMode: number;
}
