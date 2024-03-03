import { EntityBase } from '@cabloy/core';

export interface EntityCache extends EntityBase {
  module: string;
  name: string;
  value: string;
  timeout: number;
}
