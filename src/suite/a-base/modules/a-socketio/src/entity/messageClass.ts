import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityMessageClass extends EntityBaseTemp {
  module: string;
  messageClassName: string;
  uniform: number;
}
