import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aInstance')
export class EntityInstance extends Omit<EntityBaseTemp, 'iid'> {
  disabled: number;
  name: string;
  title: string;
  config: string;
}
