import { TableIdentity } from 'vona';
import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityDetailBase extends EntityBaseTemp {
  atomIdMain: TableIdentity;
  atomClassIdMain: number;
  atomStage: number;
  detailId: number;
  detailClassId: number;
  detailStaticKey: string;
}
