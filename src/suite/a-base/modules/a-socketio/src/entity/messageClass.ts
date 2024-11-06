import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aSocketIOMessageClass')
export class EntityMessageClass extends EntityBaseTemp {
  module: string;
  messageClassName: string;
  uniform: number;
}
