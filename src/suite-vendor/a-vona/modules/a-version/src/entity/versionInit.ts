import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

@Entity('aVersionInit')
export class EntityVersionInit extends ClassMapped.omit(EntityBaseSimple, ['iid', 'deleted']) {
  instanceName: string;
  module: string;
  version: number;
}
