import type { IElectionElectInfo, IElectionElectOptions, TypeFunctionObtain, TypeFunctionRelease } from '../types/election.ts';
import { BeanBase, cast } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceElection extends BeanBase {
  private _electionElectInfos: Record<string, IElectionElectInfo | undefined> = {};
  private _watchDogInterval: any;

  private get clientRedis() {
    return this.bean.redis.get('worker');
  }

  protected __init__() {
    this._watchDogInterval = setInterval(async () => {
      await this._watchDogCheck();
    }, this.scope.config.obtain.timeout);
  }

  public async dispose() {
    if (this._watchDogInterval) {
      clearInterval(this._watchDogInterval);
      this._watchDogInterval = undefined;
    }
    for (const resource of Object.keys(this._electionElectInfos)) {
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
      if (!this.app.meta.appClose) {
        fnObtain();
      }
      return;
    }
    electionElectInfo.intervalId = setInterval(async () => {
      const lockResource = `election.${resource}`;
      const keyResource = `${resource}:${this.bean.worker.id}`;
      // const workerAlivePrefix = this.$scope.worker.cacheRedis.workerAlive.getRedisKey('');
      await this.$scope.redlock.service.redlock.lock(
        lockResource,
        async () => {
          // leaders
          const leaderKeys = await this.scope.cacheRedis.election.lookupKeys(`${resource}:`, true);
          if (leaderKeys.includes(keyResource)) return;
          for (let index = leaderKeys.length - 1; index >= 0; index--) {
            const checkKey = leaderKeys[index];
            const checkWorkerId = checkKey.split(':')[1];
            const alive = await this.bean.worker.getAlive(checkWorkerId);
            if (!alive) {
              leaderKeys.splice(index, 1);
              await this.scope.cacheRedis.election.del(checkKey);
              // force release
              this.scope.broadcast.release.emit({ workerId: checkWorkerId, resource });
            }
          }
          if (!this.app.meta.appClose && leaderKeys.length < tickets) {
            electionElectInfo.isLeader = true;
            await this.scope.cacheRedis.election.set(true, keyResource);
            leaderKeys.push(this.bean.worker.id);
            fnObtain();
          }
        },
        options,
      );
      if (electionElectInfo.isLeader && electionElectInfo.intervalId) {
        clearInterval(electionElectInfo.intervalId);
        electionElectInfo.intervalId = undefined;
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
    // need not redlock
    const keyResource = `${resource}:${this.bean.worker.id}`;
    await this.scope.cacheRedis.election.del(keyResource);
  }

  private async _watchDogCheck() {
    for (const resource of Object.keys(this._electionElectInfos)) {
      await this._check(resource);
    }
  }

  private async _check(resource: string) {
    const electionElectInfo = this._electionElectInfos[resource];
    if (!electionElectInfo) return;
    const { fnObtain, fnRelease, options } = electionElectInfo;
    const tickets = options?.tickets ?? 1;
    //
    const leaderKeys = await this.scope.cacheRedis.election.lookupKeys(`${resource}:`, true);
    // need not check if exists, so as has chance to remove not alive app
    const needRelease = leaderKeys.length > tickets;
    // const index = leaderKeys.indexOf(keyResource);
    // return index > -1 && leaderKeys.length > tickets;
    if (needRelease) {
      await this.release(resource);
      this.obtain(resource, fnObtain, fnRelease, options);
    }
  }
}
