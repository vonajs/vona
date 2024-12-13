import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aCmsContent')
export class EntityContent extends EntityItemBase {
  content: string;
  html: string;
}
