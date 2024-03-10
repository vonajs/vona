import { EntityBase } from '@cabloy/core';

export interface EntitySettings extends EntityBase {
  module: string;
  scene: number;
  userId: number;
  value: string;
}
