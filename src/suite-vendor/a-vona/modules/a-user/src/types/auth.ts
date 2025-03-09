export interface IAuthIdRecord {
  '-10000': 'mock';
}

export function getAuthIdSystem<K extends keyof IAuthIdRecord>(_authName: IAuthIdRecord[K], authId: K): number {
  return Number.parseInt(authId);
}
