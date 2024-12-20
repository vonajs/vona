import { omitClass } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';

@Entity('aVersion')
export class EntityVersion extends omitClass(EntityBase, ['iid', 'deleted']) {
  module: string;
  version: number;
}
