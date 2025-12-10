import type { IElectionElectInfo, IElectionElectOptions, TypeFunctionObtain, TypeFunctionRelease } from '../types/election.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceElection extends BeanBase {
  private _electionElectInfos: Record<string, IElectionElectInfo | undefined> = {};

  public async dispose() {
    const electionElectInfos = this._electionElectInfos;
    this._electionElectInfos = {};
    for (const resource in electionElectInfos) {
      await this.release(resource);
    }
  }

  public obtain(resource: string, fnObtain: TypeFunctionObtain, fnRelease: TypeFunctionRelease, options?: IElectionElectOptions) {
    const electionElectInfo: IElectionElectInfo = { intervalId: undefined, isLeader: false, fnObtain, fnRelease, options };
    this._electionElectInfos[resource] = electionElectInfo;
    //
    const tickets = options?.tickets ?? 1;
    if (tickets === -1 || tickets === Infinity) {
      electionElectInfo.isLeader = true;
      !this.app.meta.appClose && fnObtain();
      return;
    }
    electionElectInfo.intervalId = setInterval(async () => {
      const lockResource = `election.${resource}`;
      electionElectInfo.isLeader = await this.$scope.redlock.service.redlock.lock(
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
                // force release
                this.scope.broadcast.release.emit({ workerId: leaders[index], resource });
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
      if (electionElectInfo.isLeader) {
        if (electionElectInfo.intervalId) {
          //
          clearInterval(electionElectInfo.intervalId);
          electionElectInfo.intervalId = undefined;
          //
          if (!this.app.meta.appClose) {
            fnObtain();
            setTimeout(async () => {
              await this._check(resource);
            }, this.scope.config.obtain.timeout);
          }
        }
      }
    }, this.scope.config.obtain.timeout);
  }

  async release(resource: string) {
    const electionElectInfo = this._electionElectInfos[resource];
    if (!electionElectInfo) return;
    delete this._electionElectInfos[resource];
    const { intervalId, isLeader, fnRelease, options } = electionElectInfo;
    //
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (fnRelease) {
      await fnRelease();
    }
    //
    if (!isLeader) return;
    const tickets = options?.tickets ?? 1;
    if (tickets === -1 || tickets === Infinity) return;
    //
    const lockResource = `election.${resource}`;
    await this.$scope.redlock.service.redlock.lock(
      lockResource,
      async () => {
        const leaders = (await this.scope.cacheRedis.election.get('leaders')) || [];
        const index = leaders.indexOf(this.bean.worker.id);
        if (index > -1) {
          leaders.splice(index, 1);
          await this.scope.cacheRedis.election.set(leaders, 'leaders');
        }
      },
      options,
    );
  }

  private async _check(resource: string) {
    const electionElectInfo = this._electionElectInfos[resource];
    if (!electionElectInfo) return;
    const { fnObtain, fnRelease, options } = electionElectInfo;
    const tickets = options?.tickets ?? 1;
    //
    const lockResource = `election.${resource}`;
    const needRelease = await this.$scope.redlock.service.redlock.lock(
      lockResource,
      async () => {
        const leaders = (await this.scope.cacheRedis.election.get('leaders')) || [];
        const index = leaders.indexOf(this.bean.worker.id);
        return index > -1 && leaders.length > tickets;
      },
      options,
    );
    if (needRelease) {
      await this.release(resource);
      this.obtain(resource, fnObtain, fnRelease, options);
    }
  }
}
