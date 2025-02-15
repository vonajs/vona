import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import type { IElectionElectOptions } from '../types/election.js';

@Service()
export class ServiceElection extends BeanBase {
  public elect(resource: string, fn: Function, options?: IElectionElectOptions) {
    const intervalId = setInterval(async () => {
      const tickets = options?.tickets ?? 1;
      const lockResource = `election.${resource}`;
      const isLeader = await this.$scope.redlock.service.redlock.lock(
        lockResource,
        async () => {
          // leaders
          const leaders = (await this.scope.cacheRedis.election.get('leaders')) || [];
          let isLeader;
          let changed;
          if (leaders.includes(this.bean.worker.id)) {
            isLeader = true;
          } else {
            for (let index = leaders.length - 1; index >= 0; index--) {
              const alive = await this.bean.worker.getAlive(leaders[index]);
              if (!alive) {
                leaders.splice(index, 1);
                changed = true;
              }
            }
            if (leaders.length < tickets) {
              isLeader = true;
              leaders.push(this.bean.worker.id);
              changed = true;
            }
          }
          // update
          if (changed) {
            await this.scope.cacheRedis.election.set(leaders, 'leaders');
          }
          return isLeader;
        },
        options,
      );
      if (isLeader) {
        clearInterval(intervalId);
        fn();
      }
    }, this.$scope.worker.config.worker.alive.timeout);
  }
}
