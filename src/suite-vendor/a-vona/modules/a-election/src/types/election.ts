import type { IRedlockLockOptions } from 'vona-module-a-redlock';

export interface IElectionElectOptions extends IRedlockLockOptions {
  tickets: number;
}

export type TypeFunctionRelease = (fnRelease: Function) => void;
