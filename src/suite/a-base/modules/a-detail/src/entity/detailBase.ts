import {} from '@cabloy/core';

export interface EntityDetailBase extends EntityBase {
  atomIdMain: number;
  atomClassIdMain: number;
  atomStage: number;
  detailId: number;
  detailClassId: number;
  detailStaticKey: string;
}
