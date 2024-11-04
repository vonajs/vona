import { EntityItemBase } from 'vona-module-a-base';

export interface EntityAtomLabel extends EntityItemBase {
  userId: number;
  labels: string;
}
