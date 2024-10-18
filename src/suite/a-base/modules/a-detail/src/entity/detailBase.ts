import { EntityBase, TableIdentity } from 'vona';

export interface EntityDetailBase extends EntityBase {
  atomIdMain: TableIdentity;
  atomClassIdMain: number;
  atomStage: number;
  detailId: number;
  detailClassId: number;
  detailStaticKey: string;
}
