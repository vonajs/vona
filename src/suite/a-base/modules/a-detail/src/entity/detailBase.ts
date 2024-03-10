import { EntityBase, TableIdentity } from '@cabloy/core';

export interface EntityDetailBase extends EntityBase {
  atomIdMain: TableIdentity;
  atomClassIdMain: number;
  atomStage: number;
  detailId: number;
  detailClassId: number;
  detailStaticKey: string;
}
