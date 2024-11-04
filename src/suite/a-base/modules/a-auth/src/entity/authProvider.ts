import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityAuthProvider extends EntityBaseTemp {
  disabled: number;
  module: string;
  providerName: string;
  config: string;
  scenes: string;
}
