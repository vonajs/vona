import { EntityBase } from 'vona';

export interface EntityAtomClass extends EntityBase {
  module: string;
  atomClassName: string;
}
