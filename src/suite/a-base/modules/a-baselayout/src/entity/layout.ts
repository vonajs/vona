import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aLayout')
export class EntityLayout extends EntityItemBase {
  description: string;
  layoutTypeCode: number;
}
