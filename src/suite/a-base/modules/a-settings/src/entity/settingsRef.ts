import { EntityBase } from '@cabloy/core';

export interface EntitySettingsRef extends EntityBase {
  module: string;
  scene: number;
  userId: number;
  name: string;
  value: string;
}
