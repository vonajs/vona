import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aResource')
export class EntityResource extends EntityItemBase {
  description: string;
  resourceSorting: number;
  resourceType: string;
  resourceConfig: string;
  resourceIcon: string;
  appKey: string;
}
