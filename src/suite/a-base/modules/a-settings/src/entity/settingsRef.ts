import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aSettingsRef')
export class EntitySettingsRef extends EntityBaseTemp {
  module: string;
  scene: number;
  userId: number;
  name: string;
  value: string;
}
