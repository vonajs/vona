import { EntityItemBase } from 'vona';

export interface EntityLayoutFull extends EntityItemBase {
  description: string;
  layoutTypeCode: number;
  content: string;
}
