import { Entity, EntityBase } from 'vona-module-a-database';
import { OmitType } from 'vona-module-a-swagger';

@Entity('aVersionInit')
export class EntityVersionInit extends OmitType(EntityBase, ['iid', 'deleted']) {
  subdomain: string;
  module: string;
  version: number;
}
