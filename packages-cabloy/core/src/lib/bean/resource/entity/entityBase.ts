export type TableIdentity = string | number;
export interface EntityBase {
  id: TableIdentity;
  createdAt: Date;
  updatedAt: Date;
  deleted: number;
  iid: number;
}

export interface EntityItemBase extends EntityBase {
  atomId: TableIdentity;
}
