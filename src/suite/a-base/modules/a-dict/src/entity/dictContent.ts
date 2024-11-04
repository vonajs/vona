import { EntityItemBase } from 'vona-module-a-base';

export interface EntityDictContent extends EntityItemBase {
  itemId: number;
  dictItems: string;
  dictLocales: string;
}
