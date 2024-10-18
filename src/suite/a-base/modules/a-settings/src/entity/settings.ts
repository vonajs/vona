import { EntityBase } from 'vona';

export interface EntitySettings extends EntityBase {
  module: string;
  scene: number;
  userId: number;
  value: string;
}
