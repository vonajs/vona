import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityAtomAction extends EntityBaseTemp {
  atomClassId: number;
  code: number;
  name: string;
  bulk: number;
  actionMode: number;
  flowKey: string;
  nodeDefId: string;
}
