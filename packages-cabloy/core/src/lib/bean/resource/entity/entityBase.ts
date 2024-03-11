export type TableIdentity = string | number;
export interface EntityBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: number;
  iid: number;
}

export interface EntityItemBase extends EntityBase {
  atomId: TableIdentity;
}

export const TableIdentity = {
  isZero(id: TableIdentity) {
    return id === 0 || id === '0';
  },
  isEmpty(id: TableIdentity) {
    return id === undefined || id === null || id === '';
  },
  isValid(id: TableIdentity) {
    return !this.isZero(id) && !this.isEmpty(id);
  },
  isEqual(id1: TableIdentity, id2: TableIdentity) {
    if (this.isEmpty(id1) && this.isEmpty(id2)) return true;
    return String(id1) === String(id2);
  },
};
