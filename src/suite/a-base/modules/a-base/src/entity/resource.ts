import { EntityItemBase } from 'vona';

export interface EntityResource extends EntityItemBase {
  description: string;
  resourceSorting: number;
  resourceType: string;
  resourceConfig: string;
  resourceIcon: string;
  appKey: string;
}
