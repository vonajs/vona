import { Meta } from 'vona-module-a-meta';
import { BeanElectionBase, IElectionElectOptions } from 'vona-module-a-election';

export interface MetaElection {
  elect(resource: 'development', fn: Function, options?: IElectionElectOptions): void;
}

@Meta()
export class MetaElection extends BeanElectionBase {}
