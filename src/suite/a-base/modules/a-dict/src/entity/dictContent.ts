import { EntityItemBase } from '@cabloy/core';

export interface EntityDictContent extends EntityItemBase {
  itemId: number;
  dictItems: string;
  dictLocales: string;
}
