import {
  BeanBase,
  cast,
  IDecoratorStartupOptions,
  IInstanceStartupOptions,
  IMiddlewareItem,
  IStartupExecute,
  Service,
} from 'vona';
import path from 'path';
import fse from 'fs-extra';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceStartup extends BeanBase<ScopeModule> {
  async versionReady() {
    // clear keys
    await this._clearResources();

    // run startups: not after
    for (const startup of this._startups) {
      const startupOptions = startup.beanOptions.options;
      if (!startupOptions?.instance && startupOptions?.after !== true) {
        console.log(`---- startup: ${startup.name}, pid: ${process.pid}`);
        await this.runStartup(startup.name);
      }
    }

    // appReady
    this.app.meta.appReady = true;
    this.app.meta.appReadyInstances = {};

    // run startups: after
    for (const startup of this._startups) {
      const startupOptions = startup.beanOptions.options;
      if (!startupOptions?.instance && startupOptions?.after === true) {
        console.log(`---- startup: ${startup.name}, pid: ${process.pid}`);
        await this.runStartup(startup.name);
      }
    }

    // version init
    if (this.app.meta.isTest || this.app.meta.isLocal) {
      // subdomain
      const subdomain = '';
      // init
      await this.bean.executor.newCtx(
        async () => {
          await this.$scope.instance.service.instance.instanceStartup(subdomain, { force: false });
        },
        {
          subdomain,
        },
      );
    }

    // version test
    if (this.app.meta.isTest) {
      // subdomain
      const subdomain = '';
      // test
      await this.bean.executor.newCtx(
        async () => {
          await this.$scope.version.service.version.__instanceTest(subdomain);
        },
        {
          subdomain,
        },
      );
    }
  }

  async runStartup(startupName: string, subdomain?: string, options?: IInstanceStartupOptions) {
    const startup = this.app.meta.onionStartup.middlewaresNormal[startupName];
    const startupOptions = startup.beanOptions.options as IDecoratorStartupOptions;
    // normal
    if (!startupOptions.debounce) {
      return await this._runStartupInner(startup, subdomain, options);
    }
    // debounce: lock
    return await this.bean.redlock.lockIsolate(
      `startup.${startupName}`,
      async () => {
        return await this._runStartupLock(startup, subdomain, options);
      },
      {
        subdomain,
      },
    );
  }

  async _runStartupLock(startup: IMiddlewareItem, subdomain?: string, options?: IInstanceStartupOptions) {
    // ignore debounce for test
    if (!options?.force && !this.app.meta.isTest) {
      const startupOptions = startup.beanOptions.options as IDecoratorStartupOptions;
      const cacheKey = `startupDebounce:${startup.name}${subdomain !== undefined ? `:${this.ctx.instance.id}` : ''}`;
      const debounce =
        typeof startupOptions.debounce === 'number'
          ? startupOptions.debounce
          : this.$scope.queue.config.startup.debounce;
      const cache = this.bean.cacheRedis.module('a-instance');
      const flag = await cache.getset(cacheKey, true, debounce);
      if (flag) return;
    }
    // perform
    await this._runStartupInner(startup, subdomain, options);
  }

  async _runStartupInner(startup: IMiddlewareItem, subdomain?: string, options?: IInstanceStartupOptions) {
    const startupOptions = startup.beanOptions.options as IDecoratorStartupOptions;
    // execute
    return await this.bean.executor.newCtx(
      async () => {
        const bean = cast<IStartupExecute>(this.bean._getBean(startup.beanOptions.beanFullName as any));
        await bean.execute(options);
      },
      {
        subdomain,
        transaction: startupOptions.transaction,
      },
    );
  }

  async runStartupInstance(subdomain: string, options?: IInstanceStartupOptions) {
    // run startups: not after
    for (const startup of this._startups) {
      const startupOptions = startup.beanOptions.options;
      if (startupOptions?.instance && startupOptions?.after !== true) {
        console.log(`---- instance startup: ${startup.name}, pid: ${process.pid}`);
        await this.runStartup(startup.name, subdomain, options);
      }
    }
    // set flag
    this.app.meta.appReadyInstances[subdomain] = true;
    // run startups: after
    for (const startup of this._startups) {
      const startupOptions = startup.beanOptions.options;
      if (startupOptions?.instance && startupOptions?.after === true) {
        console.log(`---- instance startup: ${startup.name}, pid: ${process.pid}`);
        await this.runStartup(startup.name, subdomain, options);
      }
    }
    // load queue workers
    if (!this.app.meta.isTest) {
      this.$scope.queue.service.queue.loadQueueWorkers(subdomain);
    }
  }

  private get _startups() {
    return this.app.meta.onionStartup.middlewaresEnabled;
  }

  private async _clearResources() {
    const app = this.app;
    if (!app.meta.isTest) return;
    // clear keys
    await this._clearRedisKeys(app.redis.get('limiter'), `b_${app.name}:*`);
    await this._clearRedisKeys(app.redis.get('queue'), `bull_${app.name}:*`);
    // broadcast channel has subscribed
    // await _clearRedisKeys(app.redis.get('broadcast'), `broadcast_${app.name}:*`);
    // redlock
    for (const clientName of this.$scope.queue.config.redlock.clients) {
      await this._clearRedisKeys(app.redis.get(clientName), `redlock_${app.name}:*`);
    }
    for (const clientName in app.config.redis.clients) {
      if (['redlock', 'limiter', 'queue', 'broadcast'].includes(clientName)) continue;
      if (clientName.includes('redlock')) continue;
      const client = app.config.redis.clients[clientName];
      await this._clearRedisKeys(app.redis.get(clientName), `${client.keyPrefix}*`);
    }
    // src/backend/app/public
    await fse.remove(path.join(app.options.baseDir, 'app/public/1'));
  }

  private async _clearRedisKeys(redis, pattern) {
    if (!redis) return;
    const keyPrefix = redis.options.keyPrefix;
    const keys = await redis.keys(pattern);
    const keysDel: string[] = [];
    for (const fullKey of keys) {
      const key = keyPrefix ? fullKey.substr(keyPrefix.length) : fullKey;
      keysDel.push(key);
    }
    if (keysDel.length > 0) {
      await redis.del(keysDel);
    }
  }
}
