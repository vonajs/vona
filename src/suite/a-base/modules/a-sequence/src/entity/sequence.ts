import { EntityBase } from 'vona';

export interface EntitySequence extends EntityBase {
  module: string;
  name: string;
  value: string;
}
