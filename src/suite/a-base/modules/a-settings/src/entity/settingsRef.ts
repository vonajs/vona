import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntitySettingsRef extends EntityBaseTemp {
  module: string;
  scene: number;
  userId: number;
  name: string;
  value: string;
}
