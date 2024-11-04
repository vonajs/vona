import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityStatus extends EntityBaseTemp {
  module: string;
  name: string;
  value: string;
}
