import { EntityBase } from 'vona';

export interface EntityLabel extends EntityBase {
  userId: number;
  labels: string;
}
