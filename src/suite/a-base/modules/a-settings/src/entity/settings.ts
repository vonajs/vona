import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aSettings')
export class EntitySettings extends EntityBaseTemp {
  module: string;
  scene: number;
  userId: number;
  value: string;
}
