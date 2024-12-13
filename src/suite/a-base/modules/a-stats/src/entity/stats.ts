import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aStats')
export class EntityStats extends EntityBaseTemp {
  userId: number;
  module: string;
  name: string;
  value: string;
}
