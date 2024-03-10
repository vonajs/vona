import { EntityItemBase } from '@cabloy/core';

export interface EntityAtomLabel extends EntityItemBase {
  userId: number;
  labels: string;
}
