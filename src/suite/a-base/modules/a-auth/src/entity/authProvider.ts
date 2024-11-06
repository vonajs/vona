import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aAuthProvider')
export class EntityAuthProvider extends EntityBaseTemp {
  disabled: number;
  module: string;
  providerName: string;
  config: string;
  scenes: string;
}
