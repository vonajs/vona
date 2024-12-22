import { OmitClass } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';

@Entity('aVersion')
export class EntityVersion extends OmitClass(EntityBase, ['iid', 'deleted']) {
  module: string;
  version: number;
}
