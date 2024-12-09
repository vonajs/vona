import {
  BeanBase,
  cast,
  IDecoratorStartupOptions,
  IInstanceStartupOptions,
  IMiddlewareItem,
  IStartupExecute,
  Service,
} from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { clearResources } from '../common/clearResources.js';

@Service()
export class ServiceStartup extends BeanBase<ScopeModule> {
  async versionReady() {
    // clear keys
    await clearResources(this.app);

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
      await this.app.meta.util.executeBean({
        subdomain,
        fn: async () => {
          await this.$scope.instance.service.instance.instanceStartup(subdomain, { force: false });
        },
      });
    }

    // version test
    if (this.app.meta.isTest) {
      // subdomain
      const subdomain = '';
      // test
      await this.app.meta.util.executeBean({
        subdomain,
        fn: async () => {
          await this.$scope.version.service.version.__instanceTest(subdomain);
        },
      });
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
    return await this.app.meta.util.lock({
      subdomain,
      resource: `startup.${startupName}`,
      fn: async () => {
        return await this.app.meta.util.executeBean({
          subdomain,
          fn: async () => {
            await this._runStartupLock(startup, subdomain, options);
          },
        });
      },
    });
  }

  async _runStartupLock(startup: IMiddlewareItem, subdomain?: string, options?: IInstanceStartupOptions) {
    // ignore debounce for test
    if (!options?.force && !this.app.meta.isTest) {
      const startupOptions = startup.beanOptions.options as IDecoratorStartupOptions;
      const cacheKey = `startupDebounce:${startup.name}${subdomain !== undefined ? `:${this.ctx.instance.id}` : ''}`;
      const debounce =
        typeof startupOptions.debounce === 'number' ? startupOptions.debounce : this.app.config.queue.startup.debounce;
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
    return await this.app.meta.util.executeBean({
      subdomain,
      transaction: startupOptions.transaction,
      fn: async () => {
        const bean = cast<IStartupExecute>(this.bean._getBean(startup.beanOptions.beanFullName as any));
        await bean.execute(options);
      },
    });
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
}
