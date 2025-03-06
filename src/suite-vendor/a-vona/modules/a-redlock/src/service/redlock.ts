import type { Settings } from '@sesamecare-oss/redlock';
import type { FunctionAsync } from 'vona';
import type { IRedlockLockIsolateOptions, IRedlockLockOptions } from '../types/redlock.ts';
import { Redlock } from '@sesamecare-oss/redlock';
import { BeanBase, instanceDesp } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceRedlock extends BeanBase {
  private _redlockDefault: Redlock;

  public async lock<RESULT>(
    resource: string,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockOptions,
  ): Promise<RESULT> {
    const instanceName = options?.instanceName === undefined ? this.ctx?.instanceName : options?.instanceName;
    const redlock = options?.redlock ?? this.redlockDefault;
    const lockTTL = options?.lockTTL ?? this.scope.config.redlock.lockTTL;
    // resource
    const _lockResource = `redlock_${this.app.name}:${instanceDesp(instanceName)}:${resource}`;
    // lock
    let _lock = await redlock.acquire([_lockResource], lockTTL);
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
          this.$logger.error(err);
          _lockDone();
        });
    }, lockTTL / 2);
    try {
      return await fn();
    } finally {
      _lockDone();
      // not await, and throw error
      _lock.release().catch(_err => {
        // do nothing
      });
    }
  }

  public async lockIsolate<RESULT>(
    resource: string,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
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

  public create(options: Settings) {
    // clients
    const clients = [] as any;
    for (const clientName of this.scope.config.redlock.clients) {
      const client = this.app.bean.redis.get(clientName);
      clients.push(client);
    }
    // create
    return new Redlock(clients, options);
  }
}
