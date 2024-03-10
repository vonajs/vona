import { EntityBase } from '@cabloy/core';

export interface EntityMessageClass extends EntityBase {
  module: string;
  messageClassName: string;
  uniform: number;
}
