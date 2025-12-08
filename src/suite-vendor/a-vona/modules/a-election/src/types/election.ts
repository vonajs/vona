import type { IRedlockLockOptions } from 'vona-module-a-redlock';

export interface IElectionElectOptions extends IRedlockLockOptions {
  tickets: number;
}

export type TypeFunctionObtain = () => void;
export type TypeFunctionRelease = () => Promise<void>;

export interface IElectionElectInfo {
  intervalId: any;
  isLeader: boolean;
  fnRelease?: TypeFunctionRelease;
  options?: IElectionElectOptions;
}
