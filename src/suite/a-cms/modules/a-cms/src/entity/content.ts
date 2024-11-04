import { EntityItemBase } from 'vona-module-a-base';

export interface EntityContent extends EntityItemBase {
  content: string;
  html: string;
}
