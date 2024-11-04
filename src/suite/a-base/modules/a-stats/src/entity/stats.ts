import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityStats extends EntityBaseTemp {
  userId: number;
  module: string;
  name: string;
  value: string;
}
