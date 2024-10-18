import { EntityBase } from 'vona';

export interface EntityVersion extends Omit<EntityBase, 'iid' | 'deleted'> {
  module: string;
  version: number;
}
