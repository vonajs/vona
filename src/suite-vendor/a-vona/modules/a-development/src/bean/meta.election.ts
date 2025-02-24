import type { IElectionElectOptions } from 'vona-module-a-election';
import { BeanElectionBase } from 'vona-module-a-election';
import { Meta } from 'vona-module-a-meta';

export interface MetaElection {
  obtain: (resource: 'development', fn: Function, options?: IElectionElectOptions) => void;
}

@Meta()
export class MetaElection extends BeanElectionBase {}
