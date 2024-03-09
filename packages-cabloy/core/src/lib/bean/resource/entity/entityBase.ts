export interface EntityBase {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
  deleted: number;
  iid: number;
}

export interface EntityItemBase extends EntityBase {
  atomId: string | number;
}
