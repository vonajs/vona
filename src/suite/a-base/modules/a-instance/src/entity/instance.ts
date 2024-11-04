import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityInstance extends Omit<EntityBaseTemp, 'iid'> {
  disabled: number;
  name: string;
  title: string;
  config: string;
}
