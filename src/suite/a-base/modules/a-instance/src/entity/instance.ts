import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityInstance extends Omit<EntityBase, 'iid'> {
  disabled: number;
  name: string;
  title: string;
  config: string;
}
