import { Meta } from 'vona-module-a-meta';
import type { IElectionElectOptions } from 'vona-module-a-election';
import { BeanElectionBase } from 'vona-module-a-election';

export interface MetaElection {
  elect(resource: 'development', fn: Function, options?: IElectionElectOptions): void;
}

@Meta()
export class MetaElection extends BeanElectionBase {}
