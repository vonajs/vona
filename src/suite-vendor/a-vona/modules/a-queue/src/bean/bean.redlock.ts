import Redlock from 'redlock';
import { Bean, BeanBase, FunctionAsync, subdomainDesp } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { IRedlockLockOptions } from '../types/redlock.js';

@Bean()
export class BeanRedlock extends BeanBase<ScopeModule> {
  private _redlock: Redlock;

  public async lock<RESULT>(
    resource: string,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockOptions,
  ): Promise<RESULT> {
    const subdomain = options?.subdomain === undefined ? this.ctx?.subdomain : options?.subdomain;
    // resource
    const _lockResource = `redlock_${this.app.name}:${subdomainDesp(subdomain)}:${resource}`;
    // lock
    const lockTTL = this.scope.config.redlock.lockTTL;
    let _lock = await this.redlock.lock(_lockResource, lockTTL);
    // timer
    let _lockTimer = null as any;
    const _lockDone = () => {
      if (_lockTimer) {
        clearInterval(_lockTimer);
        _lockTimer = null;
      }
    };
    _lockTimer = setInterval(() => {
      _lock
        .extend(lockTTL)
        .then(lock => {
          _lock = lock;
        })
        .catch(err => {
          this.app.logger.error(err);
          _lockDone();
        });
    }, lockTTL / 2);
    try {
      const res = await fn();
      _lockDone();
      await _lock.unlock();
      return res;
    } catch (err) {
      _lockDone();
      await _lock.unlock();
      throw err;
    }
  }

  private get redlock() {
    if (!this._redlock) {
      this._redlock = this._createRedlock();
    }
    return this._redlock;
  }

  private get redlockOptions() {
    return this.scope.config.redlock.options;
  }

  private _createRedlock() {
    // clients
    const clients = [] as any;
    for (const clientName of this.scope.config.redlock.clients) {
      const client = this.app.redis.get(clientName);
      clients.push(client);
    }
    // create
    return new Redlock(clients, this.redlockOptions);
  }
}
