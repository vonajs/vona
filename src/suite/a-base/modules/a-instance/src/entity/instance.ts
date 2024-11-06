import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';
import { OmitType } from 'vona-module-a-swagger';

@Entity('aInstance')
export class EntityInstance extends OmitType(EntityBaseTemp, ['iid']) {
  disabled: number;
  name: string;
  title: string;
  config: string;
}
