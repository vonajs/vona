import type { TableIdentity } from 'vona-module-a-database';
import type { IAuthBase } from 'vona-module-a-user';
import type { IAuth } from '../types/auth.ts';
import { cast } from 'vona';
import { setAuthAdapter } from 'vona-module-a-user';

setAuthAdapter({ getAuthId });

function getAuthId(auth: IAuthBase): TableIdentity {
  return cast<IAuth>(auth).id;
}
