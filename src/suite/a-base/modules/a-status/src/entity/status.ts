import { EntityBase } from 'vona';

export interface EntityStatus extends EntityBase {
  module: string;
  name: string;
  value: string;
}
