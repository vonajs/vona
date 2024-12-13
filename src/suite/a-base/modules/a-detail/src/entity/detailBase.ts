import { TableIdentity } from 'vona-module-a-database';
import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aDetailBase')
export class EntityDetailBase extends EntityBaseTemp {
  atomIdMain: TableIdentity;
  atomClassIdMain: number;
  atomStage: number;
  detailId: number;
  detailClassId: number;
  detailStaticKey: string;
}
