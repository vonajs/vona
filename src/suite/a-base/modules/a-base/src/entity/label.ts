import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aLabel')
export class EntityLabel extends EntityBaseTemp {
  userId: number;
  labels: string;
}
