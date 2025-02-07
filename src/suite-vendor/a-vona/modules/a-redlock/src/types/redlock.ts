import Redlock from 'redlock';
import { INewCtxOptions } from 'vona-module-a-executor';

export interface IRedlockLockOptions {
  instanceName?: string | undefined | null;
  redlock?: Redlock;
  lockTTL?: number;
}

export interface IRedlockLockIsolateOptions extends IRedlockLockOptions, INewCtxOptions {}
