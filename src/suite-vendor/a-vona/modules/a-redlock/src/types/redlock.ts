import type { Redlock } from '@sesamecare-oss/redlock';
import type { IInstanceRecord } from 'vona';
import type { IDbInfo } from 'vona-module-a-database';

export interface IRedlockLockOptions {
  instanceName?: keyof IInstanceRecord | undefined | null;
  redlock?: Redlock;
  lockTTL?: number;
}

export interface IRedlockLockIsolateOptions extends IRedlockLockOptions, Partial<IDbInfo> {}
