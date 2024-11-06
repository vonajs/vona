import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aDictContent')
export class EntityDictContent extends EntityItemBase {
  itemId: number;
  dictItems: string;
  dictLocales: string;
}
