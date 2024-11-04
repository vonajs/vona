import { EntityItemBase } from 'vona-module-a-base';

export interface EntityLayoutFull extends EntityItemBase {
  description: string;
  layoutTypeCode: number;
  content: string;
}
