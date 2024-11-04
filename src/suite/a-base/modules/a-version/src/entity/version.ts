import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityVersion extends Omit<EntityBaseTemp, 'iid' | 'deleted'> {
  module: string;
  version: number;
}
