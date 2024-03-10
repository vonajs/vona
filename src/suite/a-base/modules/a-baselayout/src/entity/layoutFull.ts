import { EntityItemBase } from '@cabloy/core';

export interface EntityLayoutFull extends EntityItemBase {
  description: string;
  layoutTypeCode: number;
  content: string;
}
