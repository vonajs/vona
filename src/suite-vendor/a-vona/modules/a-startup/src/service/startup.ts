import { BeanBase, cast } from 'vona';
import path from 'path';
import fse from 'fs-extra';
import { Service } from 'vona-module-a-web';
import { IDecoratorStartupOptions, IInstanceStartupOptions, IStartupExecute } from '../types/startup.js';
import { IOnionSlice } from 'vona-module-a-onion';

@Service()
export class ServiceStartup extends BeanBase {
  async versionReady() {
    // clear keys
    await this._clearResources();

    // run startups: not after
    for (const startup of this._startups) {
      const startupOptions = startup.beanOptions.options;
      if (!startupOptions?.instance && startupOptions?.after !== true) {
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
        await this.runStartup(startup.name);
      }
    }

    // version init : force: should be false
    if (this.app.meta.isTest || this.app.meta.isLocal) {
      const subdomain = '';
      await this.bean.executor.newCtx(
        async () => {
          await this.$scope.instance.service.instance.instanceStartup(subdomain, { force: false });
        },
        {
          subdomain,
        },
      );
    } else {
      // all instances
      const instances = await this.bean.instance.list();
      for (const instance of instances) {
        const subdomain = instance.name;
        // need not await
        this.bean.executor.newCtx(
          async () => {
            await this.$scope.instance.service.instance.instanceStartup(subdomain, { force: false });
          },
          {
            subdomain,
          },
        );
      }
    }

    // version test
    if (this.app.meta.isTest) {
      const subdomain = '';
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
    const startup = this.bean.onion.startup.onionsNormal[startupName];
    const startupOptions = startup.beanOptions.options as IDecoratorStartupOptions;
    // normal
    if (!startupOptions.debounce) {
      return await this._runStartupInner(startup, subdomain, options);
    }
    // debounce: lock
    return await this.scope.redlock.lockIsolate(
      `startup.${startupName}`,
      async () => {
        return await this._runStartupLock(startup, subdomain, options);
      },
      {
        subdomain,
      },
    );
  }

  async _runStartupLock(
    startup: IOnionSlice<IDecoratorStartupOptions>,
    subdomain?: string,
    options?: IInstanceStartupOptions,
  ) {
    // ignore debounce for test
    if (!options?.force && !this.app.meta.isTest) {
      const startupOptions = startup.beanOptions.options as IDecoratorStartupOptions;
      const cacheKey = `startupDebounce:${startup.name}${subdomain !== undefined ? `:${this.ctx.instance.id}` : ''}`;
      const debounce =
        typeof startupOptions.debounce === 'number' ? startupOptions.debounce : this.scope.config.startup.debounce;
      const cache = this.bean.cacheRedis.module('a-instance');
      const flag = await cache.getset(cacheKey, true, debounce);
      if (flag) return;
    }
    // perform
    await this._runStartupInner(startup, subdomain, options);
  }

  async _runStartupInner(
    startup: IOnionSlice<IDecoratorStartupOptions>,
    subdomain?: string,
    options?: IInstanceStartupOptions,
  ) {
    console.log(
      `----${startup.beanOptions?.options?.instance ? ' instance' : ''} startup: ${startup.name}, pid: ${process.pid}`,
    );
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
        await this.runStartup(startup.name, subdomain, options);
      }
    }
    // set flag
    this.app.meta.appReadyInstances[subdomain] = true;
    // run startups: after
    for (const startup of this._startups) {
      const startupOptions = startup.beanOptions.options;
      if (startupOptions?.instance && startupOptions?.after === true) {
        await this.runStartup(startup.name, subdomain, options);
      }
    }
    // load queue workers
    if (!this.app.meta.isTest) {
      this.$scope.queue.service.queue.loadQueueWorkers(subdomain);
    }
  }

  private get _startups() {
    return this.bean.onion.startup.getOnionsEnabled();
  }

  private async _clearResources() {
    if (!this.app.meta.isTest) return;
    // redis
    await this.$scope.redis.service.redisClient.clearAllData();
    // src/backend/app/public
    await fse.remove(path.join(this.app.options.baseDir, 'app/public/1'));
    await fse.remove(path.join(this.app.options.baseDir.replace('dist/backend', 'src/backend'), 'app/public/1'));
  }
}
