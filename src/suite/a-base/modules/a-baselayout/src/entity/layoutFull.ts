import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aLayoutViewFull')
export class EntityLayoutFull extends EntityItemBase {
  description: string;
  layoutTypeCode: number;
  content: string;
}
