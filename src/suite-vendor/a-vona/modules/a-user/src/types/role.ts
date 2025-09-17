import type { TableIdentity } from 'table-identity';

export interface IRoleNameRecord {
  admin: never;
}

export interface IRoleIdRecord {
}

export interface IRoleBase {
  id: TableIdentity;
  name: string;
}

export interface IRoleAdapter {
  findOneByName(name: string): Promise<IRoleBase | undefined>;
  findOne(role: Partial<IRoleBase>): Promise<IRoleBase | undefined>;
  findAllByUserId(userId: TableIdentity): Promise<IRoleBase[] | undefined>;
}
