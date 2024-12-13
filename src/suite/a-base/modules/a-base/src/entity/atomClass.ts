import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aAtomClass')
export class EntityAtomClass extends EntityBaseTemp {
  module: string;
  atomClassName: string;
}
