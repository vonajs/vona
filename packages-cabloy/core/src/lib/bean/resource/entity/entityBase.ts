export interface EntityBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: number;
  iid: number;
}

export interface EntityItemBase extends EntityBase {
  atomId: string;
}
