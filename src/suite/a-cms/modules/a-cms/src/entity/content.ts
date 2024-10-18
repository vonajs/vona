import { EntityItemBase } from 'vona';

export interface EntityContent extends EntityItemBase {
  content: string;
  html: string;
}
