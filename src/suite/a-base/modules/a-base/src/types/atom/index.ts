import { TableIdentity } from 'vona';

export * from './read.js';
export * from './select.js';

export interface EntityBaseTemp {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: number;
  iid: number;
}

export interface EntityItemBase extends EntityBaseTemp {
  atomId: TableIdentity;
}
