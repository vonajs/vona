import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityVersionInit extends Omit<EntityBaseTemp, 'iid' | 'deleted'> {
  subdomain: string;
  module: string;
  version: number;
}
