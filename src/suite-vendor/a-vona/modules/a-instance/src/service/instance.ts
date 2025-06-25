import type { IInstanceRecord, VonaConfig } from 'vona';
import type { IInstanceStartupOptions } from 'vona-module-a-startup';
import type { IInstanceStartupQueueInfo } from '../entity/instance.ts';
import { isNil, sleep } from '@cabloy/utils';
import async from 'async';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';

const SymbolQueueInstanceStartup = Symbol('SymbolQueueInstanceStartup');
const SymbolCacheIntancesConfig = Symbol('SymbolCacheIntancesConfig');

@Service()
export class ServiceInstance extends BeanBase {
  get __queueInstanceStartup(): any {
    if (!this.app.meta[SymbolQueueInstanceStartup]) this.app.meta[SymbolQueueInstanceStartup] = {};
    return this.app.meta[SymbolQueueInstanceStartup];
  }

  get __cacheIntancesConfig(): Record<string, VonaConfig> {
    if (!this.app.meta[SymbolCacheIntancesConfig]) this.app.meta[SymbolCacheIntancesConfig] = {};
    return this.app.meta[SymbolCacheIntancesConfig];
  }

  getConfigInstanceBase(instanceName: keyof IInstanceRecord) {
    const instances = this.app.config.instances || [{ instanceName: '', password: '' }];
    return instances.find(item => item.instanceName === instanceName);
  }

  getConfig(instanceName?: keyof IInstanceRecord | undefined | null): VonaConfig | undefined {
    if (isNil(instanceName) && this.ctx?.instance) {
      instanceName = this.ctx?.instanceName;
    }
    if (isNil(instanceName)) return undefined;
    return this.__cacheIntancesConfig[instanceName];
  }

  async instanceChanged(reload: boolean = true) {
    if (reload) {
      // force to reload instance
      await this.bean.instance.reload();
    } else {
      // broadcast
      this.scope.broadcast.resetCache.emit();
    }
  }

  async checkAppReady(wait: boolean = true) {
    if (!this.ctx.app.meta.appReady && wait === false) return false;
    while (!this.ctx.app.meta.appReady) {
      await sleep(300);
    }
    return true;
  }

  async checkAppReadyInstance(startup: boolean) {
    // chech appReady first
    const appReady = await this.checkAppReady(startup !== false);
    if (!appReady) return false;
    // check appReady instance
    const instanceName = this.ctx.instanceName;
    if (isNil(instanceName)) throw new Error(`instanceName not valid: ${instanceName}`);
    if (this.ctx.app.meta.appReadyInstances[instanceName]) return true;
    // instance startup
    if (startup === false) return false;
    await this.instanceStartup(instanceName, { force: false });
    return true;
  }

  async resetCache(instanceName: keyof IInstanceRecord) {
    await this._cacheInstanceConfig(instanceName, true);
  }

  private async _cacheInstanceConfig(instanceName: keyof IInstanceRecord, force: boolean) {
    if (this.__cacheIntancesConfig[instanceName] && !force) return;
    let instance = await this.bean.instance.get(instanceName);
    if (!instance) this.app.throw(403);
    instance = instance!;
    // config
    const instanceConfig = JSON.parse(instance.config);
    // cache configs
    this.__cacheIntancesConfig[instanceName] = deepExtend({}, this.ctx.app.config, instanceConfig, {
      instances: undefined,
    });
  }

  // options: force/instanceBase
  async instanceStartup(instanceName: keyof IInstanceRecord, options?: IInstanceStartupOptions) {
    if (!options) options = {};
    if (!options.configInstanceBase) {
      options.configInstanceBase = this.scope.service.instance.getConfigInstanceBase(instanceName);
    }
    // cache instance config
    await this._cacheInstanceConfig(instanceName, false);
    // queue within the same worker
    if (!this.__queueInstanceStartup[instanceName]) {
      this.__queueInstanceStartup[instanceName] = async.queue((info: IInstanceStartupQueueInfo, cb: Function) => {
        // check again
        const force = info.options?.force;
        if (this.ctx.app.meta.appReadyInstances[info.instanceName] && !force) {
          info.resolve();
          cb();
          return;
        }
        // startup
        this.$scope.startup.service.startup
          .runStartupInstance(info.instanceName, info.options)
          .then(() => {
            info.resolve();
            cb();
          })
          .catch(err => {
            info.reject(err);
            cb();
          });
      });
    }
    // promise
    return new Promise((resolve, reject) => {
      // options
      if (!options) options = { force: false, configInstanceBase: undefined };
      // queue push
      const info: IInstanceStartupQueueInfo = { resolve, reject, instanceName, options };
      this.__queueInstanceStartup[instanceName].push(info);
    });
  }

  async initInstance() {
    // instance
    const instance = this.ctx.instance ?? await this.bean.instance.get(this.ctx.instanceName);
    if (!instance) {
      this.$logger.warn(`instance not found: ${this.ctx.instanceName}`);
      return this.app.throw(423); // not this.app.fail(423)
    }
    // check if disabled/locked
    if (instance.disabled) {
      this.$logger.silly(`instance disabled: ${this.ctx.instanceName}`);
      return this.app.throw(423); // not this.app.fail(423)
    }
    // check instance startup ready
    await this.checkAppReadyInstance(true);
    // ok
    this.ctx.instance = instance;
  }
}
