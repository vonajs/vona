import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aAtomClass')
export class EntityAtomClass extends EntityBaseTemp {
  module: string;
  atomClassName: string;
}
