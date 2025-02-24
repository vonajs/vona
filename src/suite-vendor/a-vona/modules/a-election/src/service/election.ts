import type { IElectionElectOptions } from '../types/election.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceElection extends BeanBase {
  _intervalId: any = null;
  _isLeader: boolean = false;

  protected __dispose__() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  public obtain(resource: string, fn: Function, options?: IElectionElectOptions) {
    this._intervalId = setInterval(async () => {
      const tickets = options?.tickets ?? 1;
      const lockResource = `election.${resource}`;
      this._isLeader = await this.$scope.redlock.service.redlock.lock(
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
      if (this._isLeader) {
        if (this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = null;
        }
        const self = this;
        async function release() {
          await self.$scope.redlock.service.redlock.lock(
            lockResource,
            async () => {
              const leaders = (await self.scope.cacheRedis.election.get('leaders')) || [];
              const index = leaders.indexOf(self.bean.worker.id);
              if (index > -1) {
                leaders.splice(index, 1);
                await self.scope.cacheRedis.election.set(leaders, 'leaders');
              }
            },
            options,
          );
        }
        fn(release);
      }
    }, this.$scope.worker.config.worker.alive.timeout);
  }
}
