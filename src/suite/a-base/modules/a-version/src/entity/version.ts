import { Entity } from 'vona-module-a-database';
import { EntityBaseTemp } from 'vona-module-a-base';
import { OmitType } from 'vona-module-a-swagger';

@Entity('aVersion')
export class EntityVersion extends OmitType(EntityBaseTemp, ['iid', 'deleted']) {
  module: string;
  version: number;
}
