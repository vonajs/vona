import { EntityBase } from 'vona';

export interface EntityVersionInit extends Omit<EntityBase, 'iid' | 'deleted'> {
  subdomain: string;
  module: string;
  version: number;
}
