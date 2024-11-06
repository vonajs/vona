import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aCmsContent')
export class EntityContent extends EntityItemBase {
  content: string;
  html: string;
}
