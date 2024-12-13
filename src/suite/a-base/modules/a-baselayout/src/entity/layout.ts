import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aLayout')
export class EntityLayout extends EntityItemBase {
  description: string;
  layoutTypeCode: number;
}
