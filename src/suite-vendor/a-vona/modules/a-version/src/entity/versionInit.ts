import { omitClass } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';

@Entity('aVersionInit')
export class EntityVersionInit extends omitClass(EntityBase, ['iid', 'deleted']) {
  subdomain: string;
  module: string;
  version: number;
}
