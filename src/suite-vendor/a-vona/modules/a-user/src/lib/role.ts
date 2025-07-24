import type { TableIdentity } from 'vona-module-a-orm';
import type { IRoleAdapter, IRoleBase } from '../types/role.ts';

let __roleAdapter: IRoleAdapter;

export function setRoleAdapter(roleAdapter: IRoleAdapter): void {
  __roleAdapter = roleAdapter;
}

export function $getRoleId(role: IRoleBase): TableIdentity {
  return __roleAdapter.getRoleId(role);
}

export function $getRoleName(role: IRoleBase): string {
  return __roleAdapter.getRoleName(role);
}
