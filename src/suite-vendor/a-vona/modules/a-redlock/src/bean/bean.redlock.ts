import Redlock from 'redlock';
import { Bean, BeanBase, FunctionAsync, subdomainDesp } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { IRedlockLockOptions } from '../types/redlock.js';
import { INewCtxOptions } from 'vona-module-a-executor';

@Bean()
export class BeanRedlock extends BeanBase<ScopeModule> {
  private _redlockDefault: Redlock;

  public async lock<RESULT>(
    resource: string,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockOptions,
  ): Promise<RESULT> {
    const subdomain = options?.subdomain === undefined ? this.ctx?.subdomain : options?.subdomain;
    const redlock = options?.redlock ?? this.redlockDefault;
    const lockTTL = options?.lockTTL ?? this.scope.config.redlock.lockTTL;
    // resource
    const _lockResource = `redlock_${this.app.name}:${subdomainDesp(subdomain)}:${resource}`;
    // lock
    let _lock = await redlock.lock(_lockResource, lockTTL);
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

  public async lockIsolate<RESULT>(
    resource: string,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockOptions & INewCtxOptions,
  ): Promise<RESULT> {
    return await this.lock(
      resource,
      async () => {
        return await this.bean.executor.newCtxIsolate(fn, options);
      },
      options,
    );
  }

  private get redlockDefault() {
    if (!this._redlockDefault) {
      this._redlockDefault = this.create(this.scope.config.redlock.options);
    }
    return this._redlockDefault;
  }

  public create(options: Redlock.Options) {
    // clients
    const clients = [] as any;
    for (const clientName of this.scope.config.redlock.clients) {
      const client = this.app.redis.get(clientName);
      clients.push(client);
    }
    // create
    return new Redlock(clients, options);
  }
}
