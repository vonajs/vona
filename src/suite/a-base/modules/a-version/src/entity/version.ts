import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityVersion extends Omit<EntityBase, 'iid' | 'deleted'> {
  module: string;
  version: number;
}
