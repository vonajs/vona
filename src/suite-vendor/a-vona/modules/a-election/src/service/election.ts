import { BeanBase, FunctionAsync } from 'vona';
import { Service } from 'vona-module-a-web';
import { IElectionElectOptions } from '../types/election.js';

@Service()
export class ServiceElection extends BeanBase {
  public async elect<RESULT>(
    resource: string,
    fn: FunctionAsync<RESULT>,
    options?: IElectionElectOptions,
  ): Promise<RESULT> {
    const intervalId = setInterval(() => {
      const lockResource = `election.${resource}`;
      this.$scope.redlock.service.redlock.lock(lockResource, async () => {}, options);
    }, this.$scope.version.config.worker.alive.timeout);
  }
}
