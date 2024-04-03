import { EntityBase } from '@cabloy/core';

export interface EntityVersionInit extends Omit<EntityBase, 'iid' | 'deleted'> {
  subdomain: string;
  module: string;
  version: number;
}
