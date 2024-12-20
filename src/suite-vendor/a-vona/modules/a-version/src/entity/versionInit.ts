import { Entity } from 'vona-module-a-database';
import { EntityBaseTemp } from 'vona-module-a-base';
import { OmitType } from 'vona-module-a-swagger';

@Entity('aVersionInit')
export class EntityVersionInit extends OmitType(EntityBaseTemp, ['iid', 'deleted']) {
  subdomain: string;
  module: string;
  version: number;
}
