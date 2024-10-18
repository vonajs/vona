import { EntityBase } from 'vona';

export interface EntityCache extends EntityBase {
  module: string;
  name: string;
  value: string;
  timeout: number;
}
