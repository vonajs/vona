import type { VonaConfig } from 'vona';
import { BeanBase, deepExtend } from 'vona';
import async from 'async';
import chalk from 'chalk';
import * as Boxen from 'boxen';
import type { IInstanceStartupQueueInfo } from '../entity/instance.js';
import { Service } from 'vona-module-a-web';
import type { IInstanceStartupOptions } from 'vona-module-a-startup';
import { isNil, sleep } from '@cabloy/utils';

const boxenOptions: Boxen.Options = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as Boxen.Options;

const __queueInstanceStartup: any = {};
const __cacheIntancesConfig: Record<string, VonaConfig> = {};

@Service()
export class ServiceInstance extends BeanBase {
  getConfigInstanceBase(instanceName: string) {
    const instances = this.app.config.instances || [{ instanceName: '', password: '' }];
    return instances.find(item => item.instanceName === instanceName);
  }

  getConfig(instanceName?: string | undefined | null): VonaConfig | undefined {
    if (isNil(instanceName) && this.ctx?.instance) {
      instanceName = this.ctx?.instanceName;
    }
    if (isNil(instanceName)) return undefined;
    return __cacheIntancesConfig[instanceName];
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

  async resetCache(instanceName: string) {
    await this._cacheInstanceConfig(instanceName, true);
  }

  private async _cacheInstanceConfig(instanceName: string, force: boolean) {
    if (__cacheIntancesConfig[instanceName] && !force) return;
    let instance = await this.bean.instance.get(instanceName);
    if (!instance) this.app.throw(403);
    instance = instance!;
    // config
    const instanceConfig = JSON.parse(instance.config);
    // cache configs
    __cacheIntancesConfig[instanceName] = deepExtend({}, this.ctx.app.config, instanceConfig, {
      instances: undefined,
    });
  }

  // options: force/instanceBase
  async instanceStartup(instanceName: string, options?: IInstanceStartupOptions) {
    if (!options) options = {};
    if (!options.configInstanceBase) {
      options.configInstanceBase = this.scope.service.instance.getConfigInstanceBase(instanceName);
    }
    // cache instance config
    await this._cacheInstanceConfig(instanceName, false);
    // queue within the same worker
    if (!__queueInstanceStartup[instanceName]) {
      __queueInstanceStartup[instanceName] = async.queue((info: IInstanceStartupQueueInfo, cb: Function) => {
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
      __queueInstanceStartup[instanceName].push(info);
    });
  }

  async initInstance() {
    // instance
    const instance = await this.bean.instance.get(this.ctx.instanceName!);
    if (!instance) {
      // prompt: should for local/prod
      // if (this.ctx.app.meta.isLocal) {
      const urlInfo =
        this.ctx.locale === 'zh-cn'
          ? 'https://cabloy.com/zh-cn/articles/multi-instance.html'
          : 'https://cabloy.com/articles/multi-instance.html';
      let message = `Please add instance in ${chalk.cyan('src/backend/config/config.[env].js')}`;
      message += '\n' + chalk.hex('#FF8800')(`{ instanceName: '${this.ctx.instanceName}', password: '', title: '' }`);
      message += `\nMore info: ${chalk.cyan(urlInfo)}`;
      console.log('\n' + Boxen.default(message, boxenOptions));
      // }
      return this.app.throw(423); // not this.app.fail(423)
    }
    // check if disabled
    if (instance.disabled) {
      // locked
      console.log('instance disabled: ', this.ctx.instanceName);
      return this.app.throw(423); // not this.app.fail(423)
    }

    // check instance startup ready
    await this.checkAppReadyInstance(true);

    // ok
    this.ctx.instance = instance;
  }
}
