import { EntityBase } from 'vona';

export interface EntityAuthProvider extends EntityBase {
  disabled: number;
  module: string;
  providerName: string;
  config: string;
  scenes: string;
}
