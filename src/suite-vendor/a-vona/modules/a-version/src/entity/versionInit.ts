import { OmitClass } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';

@Entity('aVersionInit')
export class EntityVersionInit extends OmitClass(EntityBase, ['iid', 'deleted']) {
  subdomain: string;
  module: string;
  version: number;
}
