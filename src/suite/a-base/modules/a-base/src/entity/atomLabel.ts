import { EntityItemBase } from 'vona';

export interface EntityAtomLabel extends EntityItemBase {
  userId: number;
  labels: string;
}
