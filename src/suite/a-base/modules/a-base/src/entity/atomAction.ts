import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aAtomAction')
export class EntityAtomAction extends EntityBaseTemp {
  atomClassId: number;
  code: number;
  name: string;
  bulk: number;
  actionMode: number;
  flowKey: string;
  nodeDefId: string;
}
