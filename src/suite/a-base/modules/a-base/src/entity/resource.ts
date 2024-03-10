import {} from '@cabloy/core';

export interface EntityResource extends EntityItemBase {
  description: string;
  resourceSorting: number;
  resourceType: string;
  resourceConfig: string;
  resourceIcon: string;
  appKey: string;
}
