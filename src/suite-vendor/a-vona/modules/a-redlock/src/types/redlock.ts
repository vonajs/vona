import Redlock from 'redlock';
import { INewCtxOptions } from 'vona-module-a-executor';

export interface IRedlockLockOptions {
  instanceName?: string | undefined;
  redlock?: Redlock;
  lockTTL?: number;
}

export interface IRedlockLockIsolateOptions extends IRedlockLockOptions, INewCtxOptions {}
