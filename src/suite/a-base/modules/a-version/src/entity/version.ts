import {} from '@cabloy/core';

export interface EntityVersion extends Omit<EntityBase, 'iid' | 'deleted'> {
  module: string;
  version: number;
}
