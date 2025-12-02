import type { TableIdentity } from 'table-identity';

export interface IRoleNameRecord {
  admin: never;
}

export interface IRoleIdRecord {
}

export interface IRole {
  id: TableIdentity;
  name: string;
}

export interface IRoleAdapter {
  findOneByName(name: string): Promise<IRole | null>;
  findOne(role: Partial<IRole>): Promise<IRole | null>;
  findAllByUserId(userId: TableIdentity): Promise<IRole[] | undefined>;
}
