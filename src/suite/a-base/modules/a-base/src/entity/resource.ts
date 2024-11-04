import { EntityItemBase } from 'vona-module-a-base';

export interface EntityResource extends EntityItemBase {
  description: string;
  resourceSorting: number;
  resourceType: string;
  resourceConfig: string;
  resourceIcon: string;
  appKey: string;
}
