import { EntityBase } from 'vona';

export interface EntityStats extends EntityBase {
  userId: number;
  module: string;
  name: string;
  value: string;
}
