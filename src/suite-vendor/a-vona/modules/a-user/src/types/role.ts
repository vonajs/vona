import type { TableIdentity } from 'vona-module-a-database';

export interface IRoleNameRecord {
  admin: never;
}

export interface IRoleIdRecord {
}

export interface IRoleBase {
  id: TableIdentity;
}

export interface IRoleAdapter {
  getRoleId(role: IRoleBase): TableIdentity;
  getRoleName(role: IRoleBase): string;
}

export interface IRoleInnerAdapter {
  findOneByName(name: string): Promise<IRoleBase | undefined>;
  findOne(role: Partial<IRoleBase>): Promise<IRoleBase | undefined>;
  findAllByUserId(userId: TableIdentity): Promise<IRoleBase[]>;
}
