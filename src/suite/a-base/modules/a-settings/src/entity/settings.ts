import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntitySettings extends EntityBaseTemp {
  module: string;
  scene: number;
  userId: number;
  value: string;
}
