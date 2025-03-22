import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

@Entity('aVersion')
export class EntityVersion extends ClassMapped.omit(EntityBaseSimple, ['iid', 'deleted']) {
  module: string;
  version: number;
}
