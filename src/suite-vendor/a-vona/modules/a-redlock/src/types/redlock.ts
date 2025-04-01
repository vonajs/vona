import type { Redlock } from '@sesamecare-oss/redlock';
import type { IDbInfo } from 'vona-module-a-database';

export interface IRedlockLockOptions {
  instanceName?: string | undefined | null;
  redlock?: Redlock;
  lockTTL?: number;
}

export interface IRedlockLockIsolateOptions extends IRedlockLockOptions, IDbInfo {}
