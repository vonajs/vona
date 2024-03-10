import { EntityBase } from '@cabloy/core';

export interface EntityStats extends EntityBase {
  userId: number;
  module: string;
  name: string;
  value: string;
}
