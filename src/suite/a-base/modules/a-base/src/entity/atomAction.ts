import { EntityBase } from '@cabloy/core';

export interface EntityAtomAction extends EntityBase {
  atomClassId: number;
  code: number;
  name: string;
  bulk: number;
  actionMode: number;
  flowKey: string;
  nodeDefId: string;
}
