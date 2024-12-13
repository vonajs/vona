import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aDictContent')
export class EntityDictContent extends EntityItemBase {
  itemId: number;
  dictItems: string;
  dictLocales: string;
}
