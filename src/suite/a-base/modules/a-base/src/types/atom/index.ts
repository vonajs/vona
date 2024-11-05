import { TableIdentity } from 'vona-module-a-core';

export * from './read.js';
export * from './select.js';

export class EntityBaseTemp {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: number;
  iid: number;
}

export interface EntityItemBase extends EntityBaseTemp {
  atomId: TableIdentity;
}
