import { EntityBase, TableIdentity } from 'vona';

export * from './read.js';
export * from './select.js';

export interface EntityItemBase extends EntityBase {
  atomId: TableIdentity;
}
