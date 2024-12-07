import { BeanBase, Service, sleep } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceInstance extends BeanBase<ScopeModule> {
  getConfigInstanceBase(subdomain: string) {
    const instances = this.app.config.instances || [{ subdomain: '', password: '' }];
    return instances.find(item => item.subdomain === subdomain);
  }

  async instanceChanged(reload: boolean = true) {
    if (reload) {
      // force to reload instance
      await this.bean.instance.reload();
    } else {
      // broadcast
      this.ctx.meta.util.broadcastEmit({
        module: 'a-instance',
        broadcastName: 'resetCache',
        data: null,
      });
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
    const subdomain = this.ctx.subdomain;
    if (subdomain === undefined) throw new Error(`subdomain not valid: ${subdomain}`);
    if (this.ctx.app.meta.appReadyInstances[subdomain]) return true;
    // instance startup
    if (startup === false) return false;
    await this.instanceStartup(subdomain, { force: false });
    return true;
  }

  async resetCache(subdomain: string) {
    await this._cacheInstanceConfig(subdomain, true);
  }

  async _cacheInstanceConfig(subdomain: string, force: boolean) {
    if (__cacheIntancesConfig[subdomain] && !force) return;
    let instance = await this.get(subdomain);
    if (!instance) this.app.throw(403);
    instance = instance!;
    // config
    const instanceConfig = JSON.parse(instance.config);
    // cache configs
    __cacheIntancesConfig[subdomain] = deepExtend({}, this.ctx.app.config, instanceConfig, {
      instances: undefined,
    });
  }

  // options: force/instanceBase
  async instanceStartup(subdomain: string, options?: IInstanceStartupOptions) {
    if (!options) options = {};
    if (!options.configInstanceBase) {
      options.configInstanceBase = this.scope.service.instance.getConfigInstanceBase(subdomain);
    }
    // cache instance config
    await this._cacheInstanceConfig(subdomain, false);
    // queue within the same worker
    if (!__queueInstanceStartup[subdomain]) {
      __queueInstanceStartup[subdomain] = async.queue((info: IInstanceStartupQueueInfo, cb: Function) => {
        // check again
        const force = info.options?.force;
        if (this.ctx.app.meta.appReadyInstances[info.subdomain] && !force) {
          info.resolve();
          cb();
          return;
        }
        // startup
        this.$scope.core.service.startup
          .runStartupInstance(info.subdomain, info.options)
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
      const info: IInstanceStartupQueueInfo = { resolve, reject, subdomain, options };
      __queueInstanceStartup[subdomain].push(info);
    });
  }

  async initInstance() {
    // instance
    const instance = await this.get(this.ctx.subdomain);
    if (!instance) {
      // prompt: should for local/prod
      // if (this.ctx.app.meta.isLocal) {
      const urlInfo =
        this.ctx.locale === 'zh-cn'
          ? 'https://cabloy.com/zh-cn/articles/multi-instance.html'
          : 'https://cabloy.com/articles/multi-instance.html';
      let message = `Please add instance in ${chalk.keyword('cyan')('src/backend/config/config.[env].js')}`;
      message += '\n' + chalk.keyword('orange')(`{ subdomain: '${this.ctx.subdomain}', password: '', title: '' }`);
      message += `\nMore info: ${chalk.keyword('cyan')(urlInfo)}`;
      console.log('\n' + boxen(message, boxenOptions));
      // }
      return this.app.throw(423); // not this.app.fail(423)
    }
    // check if disabled
    if (instance.disabled) {
      // locked
      console.log('instance disabled: ', this.ctx.subdomain);
      return this.app.throw(423); // not this.app.fail(423)
    }

    // check instance startup ready
    await this.checkAppReadyInstance(true);

    // ok
    this.ctx.instance = instance;
  }
}
