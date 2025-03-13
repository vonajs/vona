import { OmitClass } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

@Entity('aVersionInit')
export class EntityVersionInit extends OmitClass(EntityBaseSimple, ['iid', 'deleted']) {
  instanceName: string;
  module: string;
  version: number;
}
