import type { TableIdentity } from 'table-identity';
import type { IAuthAdapter, IAuthBase, IAuthIdRecord } from '../types/auth.ts';

let __authAdapter: IAuthAdapter;

export function setAuthAdapter(authAdapter: IAuthAdapter): void {
  __authAdapter = authAdapter;
}

export function $getAuthId(user: IAuthBase): TableIdentity {
  return __authAdapter.getAuthId(user);
}

export function $getAuthIdSystem<K extends keyof IAuthIdRecord>(_authName: IAuthIdRecord[K], authId: K): TableIdentity {
  return authId;
}
