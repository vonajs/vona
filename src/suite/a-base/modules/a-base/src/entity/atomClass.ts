import { EntityBase } from '@cabloy/core';

export interface EntityAtomClass extends EntityBase {
  module: string;
  atomClassName: string;
}
