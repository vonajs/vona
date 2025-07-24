import type { TableIdentity } from 'vona-module-a-orm';
import type { IRoleBase } from 'vona-module-a-user';
import type { IRole } from '../types/role.ts';
import { cast } from 'vona';
import { setRoleAdapter } from 'vona-module-a-user';

setRoleAdapter({ getRoleId, getRoleName });

function getRoleId(role: IRoleBase): TableIdentity {
  return cast<IRole>(role).id;
}

function getRoleName(role: IRoleBase): string {
  return cast<IRole>(role).name;
}
