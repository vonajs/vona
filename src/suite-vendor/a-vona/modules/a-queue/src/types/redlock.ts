import Redlock from 'redlock';

export interface IRedlockLockOptions {
  subdomain?: string | null | undefined;
  redlock?: Redlock;
  lockTTL?: number;
}
