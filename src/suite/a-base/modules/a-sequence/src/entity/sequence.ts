import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntitySequence extends EntityBaseTemp {
  module: string;
  name: string;
  value: string;
}
