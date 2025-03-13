import { OmitClass } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';

@Entity('aVersion')
export class EntityVersion extends OmitClass(EntityBaseSimple, ['iid', 'deleted']) {
  module: string;
  version: number;
}
