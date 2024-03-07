import { EntityBase } from '@cabloy/core';

export interface EntityViewRecord extends Omit<EntityBase, 'iid'> {
  subdomain: string;
  module: string;
  version: number;
}
