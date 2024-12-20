import { Entity, EntityBase } from 'vona-module-a-database';
import { OmitType } from 'vona-module-a-swagger';

@Entity('aVersion')
export class EntityVersion extends OmitType(EntityBase, ['iid', 'deleted']) {
  module: string;
  version: number;
}
