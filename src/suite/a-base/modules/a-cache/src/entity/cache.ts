import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityCache extends EntityBaseTemp {
  module: string;
  name: string;
  value: string;
  timeout: number;
}
