import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aDict')
export class EntityDict extends EntityItemBase {
  description: string;
  dictMode: number;
}
