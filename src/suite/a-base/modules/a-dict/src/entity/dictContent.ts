import { EntityItemBase } from 'vona';

export interface EntityDictContent extends EntityItemBase {
  itemId: number;
  dictItems: string;
  dictLocales: string;
}
