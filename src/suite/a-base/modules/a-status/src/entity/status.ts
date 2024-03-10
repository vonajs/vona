import {} from '@cabloy/core';

export interface EntityStatus extends EntityBase {
  module: string;
  name: string;
  value: string;
}
