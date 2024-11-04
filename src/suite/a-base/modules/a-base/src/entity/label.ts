import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityLabel extends EntityBaseTemp {
  userId: number;
  labels: string;
}
