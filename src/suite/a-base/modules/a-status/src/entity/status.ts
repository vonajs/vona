import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aStatus')
export class EntityStatus extends EntityBaseTemp {
  module: string;
  name: string;
  value: string;
}
