import { EntityBase } from 'vona';

export interface EntitySettingsRef extends EntityBase {
  module: string;
  scene: number;
  userId: number;
  name: string;
  value: string;
}
