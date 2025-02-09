import { BeanBase, FunctionAsync } from 'vona';
import { Service } from 'vona-module-a-web';
import { IElectionElectOptions } from '../types/election.js';

@Service()
export class ServiceElection extends BeanBase {
  public async elect<RESULT>(
    resource: string,
    fn: FunctionAsync<RESULT>,
    options?: IElectionElectOptions,
  ): Promise<RESULT> {}
}
