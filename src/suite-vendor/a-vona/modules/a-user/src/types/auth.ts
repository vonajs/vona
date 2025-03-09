export interface IAuthIdRecord {
  '-1': 'mock';
}

export function getAuthIdSystem<K extends keyof IAuthIdRecord>(authId: K, _authName: IAuthIdRecord[K]): number {
  return Number.parseInt(authId);
}
